import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-02-25.clover"
});

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { plan?: string };
    const plan = body.plan;

    const priceId =
      plan === "pro"
        ? process.env.STRIPE_PRICE_PRO
        : plan === "studio"
          ? process.env.STRIPE_PRICE_STUDIO
          : null;

    if (!priceId) {
      return NextResponse.json({ error: "Invalid plan." }, { status: 400 });
    }

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || `https://${process.env.VERCEL_URL}`;

    if (!baseUrl) {
      return NextResponse.json({ error: "Missing app URL configuration." }, { status: 500 });
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
      success_url: `${baseUrl.replace(/\/$/, "")}/dashboard`,
      cancel_url: `${baseUrl.replace(/\/$/, "")}/pricing`
    });

    return NextResponse.json({
      url: session.url
    });
  } catch (error) {
    console.error("Stripe checkout failed:", error);

    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Checkout failed" },
      { status: 500 }
    );
  }
}
