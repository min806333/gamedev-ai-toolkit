import type { Plan } from "@/lib/types";
import { getPlanConfig, hasRequiredPlan } from "./plans";

export function checkPlanAccess(currentPlan: Plan, requiredPlan?: Plan) {
  return hasRequiredPlan(currentPlan, requiredPlan);
}

export function getDailyGenerationLimit(plan: Plan) {
  return getPlanConfig(plan).dailyGenerationLimit;
}

export function isUnlimitedPlan(plan: Plan) {
  return getDailyGenerationLimit(plan) === null;
}

export function hasPaidAccess(plan: Plan) {
  return plan !== "free";
}
