import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createInternalServerErrorResponse } from "@/lib/api/errors";
import { getCurrentUser } from "@/lib/auth/session";
import { isPaidPlan } from "@/lib/billing";
import { createAdminClient } from "@/lib/supabase/admin";
import { getAppUrl } from "@/lib/getBaseUrl";
import { ensureUserProfile } from "@/lib/usage";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-02-25.clover"
});

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await ensureUserProfile(user);

    const body = (await req.json()) as { plan?: string };
    const plan = body.plan;

    if (!plan || !isPaidPlan(plan)) {
      return NextResponse.json({ error: "Invalid plan." }, { status: 400 });
    }

    const admin = createAdminClient();
    const { data: planRecord, error: planError } = await admin
      .from("plans")
      .select("id, stripe_price_id")
      .eq("id", plan)
      .single();

    if (planError) {
      console.error("Stripe checkout plan lookup failed:", planError);
      return NextResponse.json({ error: "Invalid plan." }, { status: 400 });
    }

    const priceId = planRecord?.stripe_price_id ?? null;

    if (!planRecord || !priceId) {
      return NextResponse.json({ error: "Invalid plan." }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1
        }
      ],
      client_reference_id: user.id,
      customer_email: user.email,
      metadata: {
        plan: planRecord.id,
        supabase_user_id: user.id
      },
      success_url: getAppUrl("/dashboard", req.url),
      cancel_url: getAppUrl("/pricing", req.url)
    });

    return NextResponse.json({
      url: session.url
    });
  } catch (error) {
    console.error("Stripe checkout failed:", error);
    return createInternalServerErrorResponse(error);
  }
}
