import { NextResponse } from "next/server";
import { resolvePlanFromSubscription, verifyStripeWebhookSignature } from "@/lib/billing/stripe";
import { syncCheckoutSession, syncFailedInvoice, syncSubscription } from "@/lib/billing/sync-subscription";

type StripeEvent = {
  type: string;
  data: {
    object: Record<string, any>;
  };
};

export const runtime = "nodejs";

export async function POST(request: Request) {
  const payload = await request.text();

  try {
    verifyStripeWebhookSignature(payload, request.headers.get("stripe-signature"));
    const event = JSON.parse(payload) as StripeEvent;

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;

        await syncCheckoutSession({
          userId: session.metadata?.supabase_user_id ?? session.client_reference_id,
          customerId: session.customer ?? null,
          subscriptionId: session.subscription ?? null,
          subscriptionStatus: session.status ?? "complete",
          plan: session.metadata?.plan ?? "free"
        });
        break;
      }

      case "customer.subscription.created":
      case "customer.subscription.updated":
      case "customer.subscription.deleted": {
        const subscription = event.data.object;
        const priceId = subscription.items?.data?.[0]?.price?.id ?? null;

        await syncSubscription({
          customerId: subscription.customer ?? null,
          subscriptionId: subscription.id ?? null,
          priceId,
          subscriptionStatus: subscription.status ?? null,
          currentPeriodEnd: subscription.current_period_end ?? null,
          plan:
            event.type === "customer.subscription.deleted"
              ? "free"
              : resolvePlanFromSubscription(subscription.status, priceId)
        });
        break;
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object;

        await syncFailedInvoice({
          customerId: invoice.customer ?? null,
          priceId: invoice.lines?.data?.[0]?.price?.id ?? null,
          subscriptionStatus: invoice.status ?? "past_due"
        });
        break;
      }

      default:
        break;
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Stripe webhook failed:", error);

    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Webhook failed" },
      { status: 400 }
    );
  }
}
