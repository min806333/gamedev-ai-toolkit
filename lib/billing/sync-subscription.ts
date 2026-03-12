import type { Plan } from "@/lib/types";
import { createAdminClient } from "@/lib/supabase/admin";
import { resolvePlanFromPriceId, resolvePlanFromSubscription } from "./stripe";

type SubscriptionSyncInput = {
  userId?: string | null;
  customerId?: string | null;
  subscriptionId?: string | null;
  priceId?: string | null;
  subscriptionStatus?: string | null;
  currentPeriodEnd?: number | null;
  plan?: Plan;
};

function toIsoDate(timestamp?: number | null) {
  if (!timestamp) {
    return null;
  }

  return new Date(timestamp * 1000).toISOString();
}

async function updateUserProfile(matchColumn: "id" | "stripe_customer_id", matchValue: string, data: Record<string, any>) {
  const admin = createAdminClient();
  const { data: updated, error } = await admin.from("users").update(data).eq(matchColumn, matchValue).select("id").maybeSingle();

  if (error) {
    throw error;
  }

  if (!updated) {
    console.warn("Stripe profile update skipped: no matching user", { matchColumn, matchValue, data });
  }
}

export async function syncCheckoutSession(input: SubscriptionSyncInput) {
  if (!input.userId) {
    return;
  }

  await updateUserProfile("id", input.userId, {
    stripe_customer_id: input.customerId ?? null,
    stripe_subscription_id: input.subscriptionId ?? null,
    subscription_status: input.subscriptionStatus ?? "complete",
    plan: input.plan ?? "free"
  });
}

export async function syncSubscription(input: SubscriptionSyncInput) {
  if (!input.customerId) {
    return;
  }

  await updateUserProfile("stripe_customer_id", input.customerId, {
    plan: input.plan ?? resolvePlanFromSubscription(input.subscriptionStatus, input.priceId),
    stripe_subscription_id: input.subscriptionId ?? null,
    subscription_status: input.subscriptionStatus ?? null,
    current_period_end: toIsoDate(input.currentPeriodEnd)
  });
}

export async function syncFailedInvoice(input: SubscriptionSyncInput) {
  if (!input.customerId) {
    return;
  }

  await updateUserProfile("stripe_customer_id", input.customerId, {
    plan: resolvePlanFromPriceId(input.priceId),
    subscription_status: input.subscriptionStatus ?? "past_due"
  });
}
