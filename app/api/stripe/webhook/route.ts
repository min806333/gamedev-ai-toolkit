import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import {
  resolvePlanFromPriceId,
  resolvePlanFromSubscription,
  verifyStripeWebhookSignature
} from "@/lib/stripe";

type StripeEvent = {
  type: string;
  data: {
    object: Record<string, any>;
  };
};

export const runtime = "nodejs";

async function updateUserById(userId: string, data: Record<string, any>) {
  const admin = createAdminClient();
  await admin.from("users").update(data).eq("id", userId);
}

async function updateUserByCustomerId(customerId: string, data: Record<string, any>) {
  const admin = createAdminClient();
  await admin.from("users").update(data).eq("stripe_customer_id", customerId);
}

export async function POST(request: Request) {
  const payload = await request.text();

  try {
    verifyStripeWebhookSignature(payload, request.headers.get("stripe-signature"));
    const event = JSON.parse(payload) as StripeEvent;

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;
        const userId = session.metadata?.supabase_user_id ?? session.client_reference_id;

        if (userId) {
          await updateUserById(userId, {
            stripe_customer_id: session.customer ?? null,
            subscription_status: session.status ?? "complete",
            plan: session.metadata?.plan ?? "free"
          });
        }
        break;
      }

      case "customer.subscription.created":
      case "customer.subscription.updated":
      case "customer.subscription.deleted": {
        const subscription = event.data.object;
        const customerId = subscription.customer;
        const priceId = subscription.items?.data?.[0]?.price?.id ?? null;
        const nextPlan = event.type === "customer.subscription.deleted"
          ? "free"
          : resolvePlanFromSubscription(subscription.status, priceId);

        if (customerId) {
          await updateUserByCustomerId(customerId, {
            plan: nextPlan,
            subscription_status: subscription.status ?? null
          });
        }
        break;
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object;
        const customerId = invoice.customer;
        const priceId = invoice.lines?.data?.[0]?.price?.id ?? null;

        if (customerId) {
          await updateUserByCustomerId(customerId, {
            plan: resolvePlanFromPriceId(priceId),
            subscription_status: invoice.status ?? "past_due"
          });
        }
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
