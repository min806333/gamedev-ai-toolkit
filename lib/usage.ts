import { startOfDay } from "@/lib/usageDate";
import { createAdminClient } from "@/lib/supabase/admin";
import type { Plan, ToolType } from "@/lib/types";

const FREE_PLAN_LIMIT = 5;
const PLAN_ORDER: Record<Plan, number> = {
  free: 0,
  pro: 1,
  studio: 2
};

export async function ensureUserProfile(user: { id: string; email?: string | null }) {
  const supabase = createAdminClient();
  const { data: existing } = await supabase
    .from("users")
    .select("id")
    .eq("id", user.id)
    .maybeSingle();

  if (!existing) {
    await supabase.from("users").insert({
      id: user.id,
      email: user.email,
      plan: "free"
    });
  }
}

export async function getUsageSummary(userId: string) {
  const supabase = createAdminClient();
  const today = startOfDay();

  const [{ data: profile }, { count }] = await Promise.all([
    supabase.from("users").select("plan, email, created_at").eq("id", userId).single(),
    supabase
      .from("generations")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId)
      .gte("created_at", today)
  ]);

  const plan = (profile?.plan ?? "free") as Plan;

  return {
    plan,
    email: profile?.email ?? "",
    createdAt: profile?.created_at ?? "",
    todayCount: count ?? 0,
    remaining:
      plan === "free" ? Math.max(FREE_PLAN_LIMIT - (count ?? 0), 0) : Number.POSITIVE_INFINITY,
    limit: plan === "free" ? FREE_PLAN_LIMIT : "Unlimited"
  };
}

export async function getUserPlan(userId: string) {
  const usage = await getUsageSummary(userId);
  return usage.plan;
}

export async function enforceUsageLimit(userId: string) {
  const usage = await getUsageSummary(userId);

  if (usage.plan === "free" && usage.todayCount >= FREE_PLAN_LIMIT) {
    throw new Error("Daily limit reached. Upgrade to Pro for unlimited generations.");
  }

  return usage;
}

export function hasRequiredPlan(plan: Plan, requiredPlan: Plan) {
  return PLAN_ORDER[plan] >= PLAN_ORDER[requiredPlan];
}

export async function enforceRequiredPlan(userId: string, requiredPlan: Plan) {
  const plan = await getUserPlan(userId);

  if (!hasRequiredPlan(plan, requiredPlan)) {
    throw new Error(`${requiredPlan.toUpperCase()} plan required.`);
  }

  return plan;
}

export async function saveGeneration(params: {
  userId: string;
  tool: ToolType;
  prompt: string;
  result: string;
}) {
  const supabase = createAdminClient();

  await supabase.from("generations").insert({
    user_id: params.userId,
    tool: params.tool,
    prompt: params.prompt,
    result: params.result
  });
}

export async function getCachedGeneration(prompt: string, tool?: ToolType) {
  const supabase = createAdminClient();
  let query = supabase
    .from("generations")
    .select("result, tool")
    .eq("prompt", prompt)
    .order("created_at", { ascending: false })
    .limit(1);

  if (tool) {
    query = query.eq("tool", tool);
  }

  const { data } = await query.maybeSingle();
  return data?.result ?? null;
}
