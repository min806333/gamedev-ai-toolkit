import { getPlanConfig } from "@/lib/billing";
import { createAdminClient } from "@/lib/supabase/admin";
import type { Plan } from "@/lib/types";
import { startOfDay } from "@/lib/usageDate";

export const INTERNAL_CONSOLE_LINKS = [
  { href: "/internal-console-x9a7f", label: "Dashboard" },
  { href: "/internal-console-x9a7f/users", label: "Users" },
  { href: "/internal-console-x9a7f/subscriptions", label: "Subscriptions" },
  { href: "/internal-console-x9a7f/usage", label: "AI Usage" },
  { href: "/internal-console-x9a7f/generations", label: "Generations" },
  { href: "/internal-console-x9a7f/revenue", label: "Revenue" },
  { href: "/internal-console-x9a7f/logs", label: "Logs" },
  { href: "/internal-console-x9a7f/settings", label: "Settings" }
] as const;

const ACTIVE_SUBSCRIPTION_STATUSES = new Set(["active", "trialing", "past_due"]);

type UserRow = {
  id: string;
  email: string;
  plan: Plan;
  subscription_status: string | null;
  created_at: string;
  stripe_customer_id?: string | null;
  current_period_end?: string | null;
};

type UsageRow = {
  id: string;
  user_id: string;
  tool: string;
  provider: string | null;
  model: string | null;
  status: string;
  total_tokens: number | null;
  error_message?: string | null;
  created_at: string;
};

export function getDerivedRole(email?: string | null) {
  return email?.toLowerCase() === process.env.ADMIN_EMAIL?.toLowerCase() ? "admin" : "user";
}

export async function getAdminOverview() {
  const admin = createAdminClient();
  const today = startOfDay();

  const [totalUsersResult, usersResult, todayGenerationsResult, latestUsageResult, latestGenerationsResult] = await Promise.all([
    admin.from("users").select("*", { count: "exact", head: true }),
    admin
      .from("users")
      .select("id, email, plan, subscription_status, created_at")
      .order("created_at", { ascending: false })
      .limit(12),
    admin.from("generations").select("*", { count: "exact", head: true }).gte("created_at", today),
    admin
      .from("usage_logs")
      .select("id, user_id, tool, provider, model, status, total_tokens, created_at")
      .order("created_at", { ascending: false })
      .limit(8),
    admin
      .from("generations")
      .select("id, user_id, tool, model, created_at")
      .order("created_at", { ascending: false })
      .limit(8)
  ]);

  const users = (usersResult.data ?? []) as UserRow[];
  const activeSubscriptions = users.filter((user) => ACTIVE_SUBSCRIPTION_STATUSES.has(user.subscription_status ?? "")).length;
  const monthlyRevenue = users.reduce((sum, user) => {
    if (!ACTIVE_SUBSCRIPTION_STATUSES.has(user.subscription_status ?? "")) {
      return sum;
    }

    return sum + getPlanConfig(user.plan).monthlyPrice;
  }, 0);

  return {
    totalUsers: totalUsersResult.count ?? 0,
    activeSubscriptions,
    aiGenerationsToday: todayGenerationsResult.count ?? 0,
    monthlyRevenue,
    latestUsers: users,
    latestUsage: (latestUsageResult.data ?? []) as UsageRow[],
    latestGenerations: latestGenerationsResult.data ?? []
  };
}

export async function getAdminUsers() {
  const admin = createAdminClient();
  const [usersResult, usageResult] = await Promise.all([
    admin
      .from("users")
      .select("id, email, plan, subscription_status, created_at")
      .order("created_at", { ascending: false })
      .limit(100),
    admin.from("usage_logs").select("user_id")
  ]);

  const usageCounts = new Map<string, number>();
  for (const row of usageResult.data ?? []) {
    usageCounts.set(row.user_id, (usageCounts.get(row.user_id) ?? 0) + 1);
  }

  return ((usersResult.data ?? []) as UserRow[]).map((user) => ({
    ...user,
    role: getDerivedRole(user.email),
    aiUsage: usageCounts.get(user.id) ?? 0
  }));
}

export async function getAdminSubscriptions() {
  const admin = createAdminClient();
  const { data } = await admin
    .from("users")
    .select("id, email, plan, subscription_status, stripe_customer_id, current_period_end, created_at")
    .neq("plan", "free")
    .order("current_period_end", { ascending: false, nullsFirst: false })
    .limit(100);

  return (data ?? []) as UserRow[];
}

export async function getAdminGenerations() {
  const admin = createAdminClient();
  const { data } = await admin
    .from("generations")
    .select("id, user_id, tool, prompt, model, created_at")
    .order("created_at", { ascending: false })
    .limit(100);

  return data ?? [];
}

export async function getAdminUsageByUser() {
  const admin = createAdminClient();
  const [usersResult, usageResult] = await Promise.all([
    admin.from("users").select("id, email, plan"),
    admin
      .from("usage_logs")
      .select("user_id, status, total_tokens, created_at")
      .order("created_at", { ascending: false })
  ]);

  const byUser = new Map<
    string,
    { requests: number; success: number; blocked: number; failed: number; rateLimited: number; tokens: number }
  >();

  for (const row of usageResult.data ?? []) {
    const current = byUser.get(row.user_id) ?? {
      requests: 0,
      success: 0,
      blocked: 0,
      failed: 0,
      rateLimited: 0,
      tokens: 0
    };

    current.requests += 1;
    current.tokens += row.total_tokens ?? 0;

    if (row.status === "success") current.success += 1;
    if (row.status === "blocked") current.blocked += 1;
    if (row.status === "failed") current.failed += 1;
    if (row.status === "rate_limited") current.rateLimited += 1;

    byUser.set(row.user_id, current);
  }

  return (usersResult.data ?? []).map((user) => ({
    id: user.id,
    email: user.email,
    plan: user.plan,
    ...byUser.get(user.id),
    requests: byUser.get(user.id)?.requests ?? 0,
    success: byUser.get(user.id)?.success ?? 0,
    blocked: byUser.get(user.id)?.blocked ?? 0,
    failed: byUser.get(user.id)?.failed ?? 0,
    rateLimited: byUser.get(user.id)?.rateLimited ?? 0,
    tokens: byUser.get(user.id)?.tokens ?? 0
  }));
}

export async function getRevenueSummary() {
  const admin = createAdminClient();
  const { data } = await admin
    .from("users")
    .select("id, email, plan, subscription_status, current_period_end")
    .neq("plan", "free");

  const subscriptions = (data ?? []) as UserRow[];
  const activeSubscriptions = subscriptions.filter((user) => ACTIVE_SUBSCRIPTION_STATUSES.has(user.subscription_status ?? ""));

  const plans = ["pro", "studio"] as const;
  const byPlan = plans.map((plan) => {
    const count = activeSubscriptions.filter((user) => user.plan === plan).length;
    const price = getPlanConfig(plan).monthlyPrice;

    return {
      plan,
      count,
      monthlyRevenue: count * price
    };
  });

  return {
    activeSubscriptions: activeSubscriptions.length,
    monthlyRevenue: byPlan.reduce((sum, item) => sum + item.monthlyRevenue, 0),
    byPlan,
    subscriptions
  };
}

export async function getAdminLogs() {
  const admin = createAdminClient();
  const [usageLogs, stripeEvents] = await Promise.all([
    admin
      .from("usage_logs")
      .select("id, user_id, tool, status, error_message, created_at")
      .neq("status", "success")
      .order("created_at", { ascending: false })
      .limit(100),
    admin
      .from("stripe_events")
      .select("id, created_at")
      .order("created_at", { ascending: false })
      .limit(50)
  ]);

  return {
    usageLogs: usageLogs.data ?? [],
    stripeEvents: stripeEvents.data ?? []
  };
}

export function getSettingsSummary() {
  return [
    { label: "Admin Email", value: process.env.ADMIN_EMAIL ? "Configured" : "Missing" },
    { label: "OpenAI", value: process.env.OPENAI_API_KEY ? "Configured" : "Missing" },
    { label: "Anthropic", value: process.env.ANTHROPIC_API_KEY ? "Configured" : "Missing" },
    { label: "Stripe Secret", value: process.env.STRIPE_SECRET_KEY ? "Configured" : "Missing" },
    { label: "Stripe Webhook", value: process.env.STRIPE_WEBHOOK_SECRET ? "Configured" : "Missing" },
    { label: "Upstash Redis", value: process.env.UPSTASH_REDIS_REST_URL ? "Configured" : "Missing" }
  ];
}

