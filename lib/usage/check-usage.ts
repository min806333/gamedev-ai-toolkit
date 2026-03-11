import { getDailyGenerationLimit, hasRequiredPlan } from "@/lib/billing";
import type { Plan } from "@/lib/types";
import { getUsageSummary, getUserPlan } from "./get-usage-summary";

export async function checkUsageLimit(userId: string) {
  const usage = await getUsageSummary(userId);
  const dailyLimit = getDailyGenerationLimit(usage.plan);

  if (dailyLimit !== null && usage.todayCount >= dailyLimit) {
    throw new Error("Daily limit reached. Upgrade to Pro for unlimited generations.");
  }

  return usage;
}

export async function enforceRequiredPlan(userId: string, requiredPlan: Plan) {
  const plan = await getUserPlan(userId);

  if (!hasRequiredPlan(plan, requiredPlan)) {
    throw new Error(`${requiredPlan.toUpperCase()} plan required.`);
  }

  return plan;
}
