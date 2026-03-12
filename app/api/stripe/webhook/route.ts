import { NextResponse } from "next/server";
import { createInternalServerErrorResponse } from "@/lib/api/errors";
import { resolvePlanFromSubscription, verifyStripeWebhookSignature } from "@/lib/billing/stripe";
import { syncCheckoutSession, syncFailedInvoice, syncSubscription } from "@/lib/billing/sync-subscription";
import { createAdminClient } from "@/lib/supabase/admin";

type StripeEvent = {
  id: string;
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
    const admin = createAdminClient();

    const { data: existingEvent, error: existingEventError } = await admin
      .from("stripe_events")
      .select("id")
      .eq("id", event.id)
      .maybeSingle();

    if (existingEventError) {
      throw existingEventError;
    }

    if (existingEvent) {
      return new Response("Event already processed", { status: 200 });
    }

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;

        await syncCheckoutSession({
          userId: session.metadata?.supabase_user_id ?? session.client_reference_id,
          customerId: session.customer ?? null,
          subscriptionId: session.subscription ?? null,
          subscriptionStatus: session.payment_status === "paid" ? "active" : session.status ?? "complete",
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

    const { error: insertError } = await admin.from("stripe_events").insert({ id: event.id });

    if (insertError && (insertError as { code?: string }).code !== "23505") {
      throw insertError;
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Stripe webhook failed:", error);
    return createInternalServerErrorResponse(error, "Internal server error", 400);
  }
}
