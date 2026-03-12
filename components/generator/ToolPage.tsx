import { ToolRenderer } from "@/components/generator/ToolRenderer";
import { PremiumToolGate } from "@/components/premium-tool-gate";
import { getCurrentUser } from "@/lib/auth/session";
import { createAdminClient } from "@/lib/supabase/admin";
import { getToolConfig } from "@/lib/tools/tool-config";
import { ensureUserProfile, getUsageSummary } from "@/lib/usage";
import type { ToolType } from "@/lib/types";

export async function ToolPage({ toolId }: { toolId: ToolType }) {
  const tool = getToolConfig(toolId);
  const user = await getCurrentUser();
  const admin = user ? createAdminClient() : null;
  const usage = user
    ? await (async () => {
        await ensureUserProfile(user);
        return getUsageSummary(user.id);
      })()
    : { plan: "free" as const, todayCount: 0, remaining: 5, limit: 5 };

  const generations = user && admin
    ? await admin
        .from("generations")
        .select("id, tool, created_at, prompt")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(5)
        .then((result) => result.data ?? null)
    : null;

  const renderer = (
    <ToolRenderer
      toolId={toolId}
      initialUsage={{
        plan: usage.plan,
        todayCount: usage.todayCount,
        remaining: usage.remaining,
        limit: usage.limit
      }}
      initialGenerations={generations}
    />
  );

  if (!tool.requiredPlan) {
    return renderer;
  }

  return (
    <PremiumToolGate plan={usage.plan} requiredPlan={tool.requiredPlan} toolId={toolId}>
      {renderer}
    </PremiumToolGate>
  );
}
