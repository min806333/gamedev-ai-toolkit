import { PremiumToolGate } from "@/components/premium-tool-gate";
import { ToolRenderer } from "@/components/generator/ToolRenderer";
import { getCurrentUser } from "@/lib/auth/session";
import { getToolConfig } from "@/lib/tools/tool-config";
import { ensureUserProfile, getUsageSummary } from "@/lib/usage";
import type { ToolType } from "@/lib/types";

export async function ToolPage({ toolId }: { toolId: ToolType }) {
  const tool = getToolConfig(toolId);
  const user = await getCurrentUser();
  const usage = user
    ? await (async () => {
        await ensureUserProfile(user);
        return getUsageSummary(user.id);
      })()
    : { plan: "free" as const };

  if (!tool.requiredPlan) {
    return <ToolRenderer toolId={toolId} />;
  }

  return (
    <PremiumToolGate
      plan={usage.plan}
      requiredPlan={tool.requiredPlan}
      message=""
      messageKey={tool.premiumMessageKey}
    >
      <ToolRenderer toolId={toolId} />
    </PremiumToolGate>
  );
}
