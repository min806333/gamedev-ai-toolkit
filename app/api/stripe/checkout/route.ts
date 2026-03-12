import { NextResponse } from "next/server";
import { createInternalServerErrorResponse } from "@/lib/api/errors";
import { getCurrentUser } from "@/lib/auth/session";
import { createCheckoutSession, createStripeCustomer } from "@/lib/billing/stripe";
import { getPlanConfig, isPaidPlan, type PaidPlan } from "@/lib/billing/plans";
import { createAdminClient } from "@/lib/supabase/admin";
import { ensureUserProfile } from "@/lib/usage";

export const runtime = "nodejs";

type PlanRecord = {
  id: string;
  stripe_price_id: string | null;
};

function normalizePlan(input?: string | null) {
  return input?.trim().toLowerCase() ?? "";
}

function isMissingPlansTableError(error: unknown) {
  if (!error || typeof error !== "object") {
    return false;
  }

  const code = "code" in error ? String((error as { code?: string }).code ?? "") : "";
  const message = "message" in error ? String((error as { message?: string }).message ?? "") : "";

  return code === "42P01" || message.toLowerCase().includes("plans");
}

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await ensureUserProfile(user);

    const body = (await req.json()) as { plan?: string };
    const requestedPlan = normalizePlan(body.plan);

    if (!requestedPlan || !isPaidPlan(requestedPlan)) {
      return NextResponse.json({ error: "Invalid plan." }, { status: 400 });
    }

    const admin = createAdminClient();
    const [{ data: profile, error: profileError }, planLookup] = await Promise.all([
      admin.from("users").select("id, email, stripe_customer_id, plan").eq("id", user.id).maybeSingle(),
      admin.from("plans").select("id, stripe_price_id").eq("id", requestedPlan).maybeSingle<PlanRecord>()
    ]);

    if (profileError) {
      console.error("Stripe checkout profile lookup failed:", profileError);
      return NextResponse.json({ error: "Unable to load billing profile." }, { status: 500 });
    }

    const fallbackPriceId = getPlanConfig(requestedPlan as PaidPlan).stripePriceId ?? null;
    const canUsePlanFallback = !planLookup.error || isMissingPlansTableError(planLookup.error);
    const priceId = planLookup.data?.stripe_price_id?.trim() || fallbackPriceId;

    if (planLookup.error && !canUsePlanFallback) {
      console.error("Stripe checkout plan lookup failed:", planLookup.error);
      return NextResponse.json({ error: "Unable to load plan details." }, { status: 500 });
    }

    if (!priceId) {
      console.error("Stripe checkout price ID missing:", {
        requestedPlan,
        planLookupError: planLookup.error,
        planRecord: planLookup.data
      });
      return NextResponse.json({ error: "Stripe price ID is not configured for this plan." }, { status: 500 });
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
      plan: requestedPlan as PaidPlan,
      priceId,
      requestUrl: req.url
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout failed:", error);
    return createInternalServerErrorResponse(error);
  }
}
