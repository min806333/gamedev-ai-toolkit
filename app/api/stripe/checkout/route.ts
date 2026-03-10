import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { createCheckoutSession, createStripeCustomer } from "@/lib/stripe";
import { ensureUserProfile } from "@/lib/usage";
import type { Plan } from "@/lib/types";

type CheckoutPlan = Exclude<Plan, "free">;

function isPaidPlan(plan: string): plan is CheckoutPlan {
  return plan === "pro" || plan === "studio";
}

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const supabase = createClient();
    const {
      data: { user }
    } = await supabase.auth.getUser();

    if (!user || !user.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = (await request.json()) as { plan?: string };

    if (!body.plan || !isPaidPlan(body.plan)) {
      return NextResponse.json({ error: "Invalid plan." }, { status: 400 });
    }

    await ensureUserProfile(user);

    const admin = createAdminClient();
    const { data: profile } = await admin
      .from("users")
      .select("stripe_customer_id")
      .eq("id", user.id)
      .maybeSingle();

    let customerId = profile?.stripe_customer_id ?? null;

    if (!customerId) {
      const customer = await createStripeCustomer(user.email, user.id);
      customerId = customer.id;

      await admin
        .from("users")
        .update({ stripe_customer_id: customerId })
        .eq("id", user.id);
    }

    const session = await createCheckoutSession({
      customerId,
      userId: user.id,
      plan: body.plan,
      requestUrl: request.url
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout failed:", error);

    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Checkout failed" },
      { status: 500 }
    );
  }
}
