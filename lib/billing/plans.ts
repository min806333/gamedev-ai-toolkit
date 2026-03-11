import type { AIProviderName } from "@/lib/ai/providers/types";
import type { Plan, ToolType } from "@/lib/types";
import { getEnv } from "@/lib/utils/env";

export type PaidPlan = Exclude<Plan, "free">;

type PlanFeatures = {
  premiumPlanningTools: boolean;
  studioWorkflows: boolean;
  exportResults: boolean;
  generationHistory: boolean;
};

type PlanAIAccess = {
  providers: AIProviderName[];
  priority: "standard" | "high";
};

export type PlanConfig = {
  id: Plan;
  label: string;
  monthlyPrice: number;
  stripePriceId?: string;
  dailyGenerationLimit: number | null;
  features: PlanFeatures;
  aiAccess: PlanAIAccess;
};

const PLAN_CONFIGS: Record<Plan, PlanConfig> = {
  free: {
    id: "free",
    label: "Free",
    monthlyPrice: 0,
    dailyGenerationLimit: 5,
    features: {
      premiumPlanningTools: false,
      studioWorkflows: false,
      exportResults: false,
      generationHistory: false
    },
    aiAccess: {
      providers: ["openai", "anthropic"],
      priority: "standard"
    }
  },
  pro: {
    id: "pro",
    label: "Pro",
    monthlyPrice: 12,
    stripePriceId: getEnv("STRIPE_PRICE_PRO") ?? getEnv("STRIPE_PRO_PRICE_ID") ?? undefined,
    dailyGenerationLimit: null,
    features: {
      premiumPlanningTools: true,
      studioWorkflows: false,
      exportResults: true,
      generationHistory: true
    },
    aiAccess: {
      providers: ["openai", "anthropic"],
      priority: "standard"
    }
  },
  studio: {
    id: "studio",
    label: "Studio",
    monthlyPrice: 29,
    stripePriceId: getEnv("STRIPE_PRICE_STUDIO") ?? getEnv("STRIPE_STUDIO_PRICE_ID") ?? undefined,
    dailyGenerationLimit: null,
    features: {
      premiumPlanningTools: true,
      studioWorkflows: true,
      exportResults: true,
      generationHistory: true
    },
    aiAccess: {
      providers: ["openai", "anthropic"],
      priority: "high"
    }
  }
};

export const PLAN_ORDER: Record<Plan, number> = {
  free: 0,
  pro: 1,
  studio: 2
};

export function getPlanConfig(plan: Plan) {
  return PLAN_CONFIGS[plan];
}

export function getAllPlanConfigs() {
  return Object.values(PLAN_CONFIGS);
}

export function getPaidPlanConfigs() {
  return getAllPlanConfigs().filter((plan): plan is PlanConfig & { id: PaidPlan; stripePriceId?: string } => plan.id !== "free");
}

export function getStripePriceId(plan: PaidPlan) {
  const priceId = getPlanConfig(plan).stripePriceId;

  if (!priceId) {
    throw new Error(`Missing Stripe price ID for ${plan}`);
  }

  return priceId;
}

export function hasRequiredPlan(plan: Plan, requiredPlan?: Plan) {
  if (!requiredPlan) {
    return true;
  }

  return PLAN_ORDER[plan] >= PLAN_ORDER[requiredPlan];
}

export function isPaidPlan(plan: string): plan is PaidPlan {
  return plan === "pro" || plan === "studio";
}

export function getToolRequiredPlan(tool: ToolType) {
  switch (tool) {
    case "gdd":
    case "ui-ux-plan":
    case "system-design":
      return "pro" as const;
    case "mvp-roadmap":
      return "studio" as const;
    default:
      return undefined;
  }
}
