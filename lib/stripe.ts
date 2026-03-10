import { createHmac, timingSafeEqual } from "node:crypto";
import { getAppUrl } from "@/lib/getBaseUrl";
import type { Plan } from "@/lib/types";

const STRIPE_API_BASE = "https://api.stripe.com/v1";
const ACTIVE_SUBSCRIPTION_STATUSES = new Set(["active", "trialing", "past_due"]);

type StripePlan = Exclude<Plan, "free">;

function getStripeSecretKey() {
  const key = process.env.STRIPE_SECRET_KEY;

  if (!key) {
    throw new Error("Missing STRIPE_SECRET_KEY");
  }

  return key;
}

function getWebhookSecret() {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!secret) {
    throw new Error("Missing STRIPE_WEBHOOK_SECRET");
  }

  return secret;
}

export function getStripePriceId(plan: StripePlan) {
  const priceId = plan === "pro" ? process.env.STRIPE_PRO_PRICE_ID : process.env.STRIPE_STUDIO_PRICE_ID;

  if (!priceId) {
    throw new Error(`Missing Stripe price ID for ${plan}`);
  }

  return priceId;
}

export async function stripeRequest<T>(path: string, body?: URLSearchParams, method = "POST"): Promise<T> {
  const response = await fetch(`${STRIPE_API_BASE}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${getStripeSecretKey()}`,
      ...(body ? { "Content-Type": "application/x-www-form-urlencoded" } : {})
    },
    body
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(`Stripe request failed: ${message}`);
  }

  return (await response.json()) as T;
}

export async function createStripeCustomer(email: string, userId: string) {
  const body = new URLSearchParams();
  body.set("email", email);
  body.set("metadata[supabase_user_id]", userId);

  return stripeRequest<{ id: string }>("/customers", body);
}

export async function createCheckoutSession(params: {
  customerId: string;
  userId: string;
  plan: StripePlan;
  requestUrl?: string;
}) {
  const body = new URLSearchParams();
  body.set("mode", "subscription");
  body.set("customer", params.customerId);
  body.set("client_reference_id", params.userId);
  body.set("success_url", getAppUrl("/pricing?checkout=success", params.requestUrl));
  body.set("cancel_url", getAppUrl("/pricing?checkout=cancelled", params.requestUrl));
  body.set("allow_promotion_codes", "true");
  body.set("line_items[0][price]", getStripePriceId(params.plan));
  body.set("line_items[0][quantity]", "1");
  body.set("metadata[supabase_user_id]", params.userId);
  body.set("metadata[plan]", params.plan);
  body.set("subscription_data[metadata][supabase_user_id]", params.userId);
  body.set("subscription_data[metadata][plan]", params.plan);

  return stripeRequest<{ id: string; url: string }>("/checkout/sessions", body);
}

export function verifyStripeWebhookSignature(payload: string, signatureHeader: string | null) {
  if (!signatureHeader) {
    throw new Error("Missing Stripe signature header");
  }

  const timestampPart = signatureHeader
    .split(",")
    .find((item) => item.startsWith("t="))
    ?.slice(2);
  const signaturePart = signatureHeader
    .split(",")
    .find((item) => item.startsWith("v1="))
    ?.slice(3);

  if (!timestampPart || !signaturePart) {
    throw new Error("Invalid Stripe signature header");
  }

  const signedPayload = `${timestampPart}.${payload}`;
  const expectedSignature = createHmac("sha256", getWebhookSecret()).update(signedPayload).digest("hex");

  const expected = Buffer.from(expectedSignature, "hex");
  const received = Buffer.from(signaturePart, "hex");

  if (expected.length !== received.length || !timingSafeEqual(expected, received)) {
    throw new Error("Invalid Stripe webhook signature");
  }
}

export function resolvePlanFromPriceId(priceId?: string | null): Plan {
  if (!priceId) {
    return "free";
  }

  if (priceId === process.env.STRIPE_PRO_PRICE_ID) {
    return "pro";
  }

  if (priceId === process.env.STRIPE_STUDIO_PRICE_ID) {
    return "studio";
  }

  return "free";
}

export function resolvePlanFromSubscription(status?: string | null, priceId?: string | null): Plan {
  if (!status || !ACTIVE_SUBSCRIPTION_STATUSES.has(status)) {
    return "free";
  }

  return resolvePlanFromPriceId(priceId);
}
