import type { Plan } from "@/lib/types";
import { createAdminClient } from "@/lib/supabase/admin";
import { getDailyGenerationLimit } from "@/lib/billing";
import { getDailyUsage } from "./get-daily-usage";

export async function getUsageSummary(userId: string) {
  const supabase = createAdminClient();

  const [{ data: profile }, todayCount] = await Promise.all([
    supabase
      .from("users")
      .select("plan, email, created_at, stripe_customer_id, subscription_status")
      .eq("id", userId)
      .single(),
    getDailyUsage(userId)
  ]);

  const plan = (profile?.plan ?? "free") as Plan;
  const dailyLimit = getDailyGenerationLimit(plan);

  return {
    plan,
    email: profile?.email ?? "",
    createdAt: profile?.created_at ?? "",
    stripeCustomerId: profile?.stripe_customer_id ?? null,
    subscriptionStatus: profile?.subscription_status ?? "inactive",
    todayCount,
    remaining: dailyLimit === null ? Number.POSITIVE_INFINITY : Math.max(dailyLimit - todayCount, 0),
    limit: dailyLimit === null ? "Unlimited" : dailyLimit
  };
}

export async function getUserPlan(userId: string) {
  const usage = await getUsageSummary(userId);
  return usage.plan;
}
