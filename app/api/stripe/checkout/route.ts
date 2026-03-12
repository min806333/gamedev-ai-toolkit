import { NextResponse } from "next/server";
import { createInternalServerErrorResponse } from "@/lib/api/errors";
import { getCurrentUser } from "@/lib/auth/session";
import { createCheckoutSession, createStripeCustomer } from "@/lib/billing/stripe";
import { isPaidPlan, type PaidPlan } from "@/lib/billing/plans";
import { createAdminClient } from "@/lib/supabase/admin";
import { ensureUserProfile } from "@/lib/usage";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await ensureUserProfile(user);

    const body = (await req.json()) as { plan?: string };
    const requestedPlan = body.plan;

    if (!requestedPlan || !isPaidPlan(requestedPlan)) {
      return NextResponse.json({ error: "Invalid plan." }, { status: 400 });
    }

    const admin = createAdminClient();
    const [{ data: profile, error: profileError }, { data: planRecord, error: planError }] = await Promise.all([
      admin.from("users").select("id, email, stripe_customer_id, plan").eq("id", user.id).maybeSingle(),
      admin.from("plans").select("id, stripe_price_id").eq("id", requestedPlan).single()
    ]);

    if (profileError) {
      console.error("Stripe checkout profile lookup failed:", profileError);
      return NextResponse.json({ error: "Unable to load billing profile." }, { status: 500 });
    }

    if (planError || !planRecord?.stripe_price_id || !isPaidPlan(planRecord.id)) {
      console.error("Stripe checkout plan lookup failed:", planError);
      return NextResponse.json({ error: "Invalid plan." }, { status: 400 });
    }

    let customerId = profile?.stripe_customer_id ?? null;

    if (!customerId) {
      if (!user.email) {
        return NextResponse.json({ error: "A verified email is required for billing." }, { status: 400 });
      }

      const customer = await createStripeCustomer(user.email, user.id);
      customerId = customer.id;

      const { error: customerUpdateError } = await admin
        .from("users")
        .update({ stripe_customer_id: customerId })
        .eq("id", user.id);

      if (customerUpdateError) {
        console.error("Stripe customer ID save failed:", customerUpdateError);
        return NextResponse.json({ error: "Unable to prepare billing profile." }, { status: 500 });
      }
    }

    const session = await createCheckoutSession({
      customerId,
      userId: user.id,
      plan: planRecord.id as PaidPlan,
      priceId: planRecord.stripe_price_id,
      requestUrl: req.url
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout failed:", error);
    return createInternalServerErrorResponse(error);
  }
}
