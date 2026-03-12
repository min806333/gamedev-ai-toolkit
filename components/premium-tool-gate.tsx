"use client";

import { useState } from "react";
import { useLanguage } from "@/components/language-provider";
import { ToolUpgradeModal } from "@/components/tool-upgrade-modal";
import { getToolFormCopy } from "@/lib/tools/tool-content";
import type { Plan, ToolType } from "@/lib/types";

export function PremiumToolGate({
  plan,
  requiredPlan,
  toolId,
  children
}: {
  plan: Plan;
  requiredPlan: Plan;
  toolId: ToolType;
  children: React.ReactNode;
}) {
  const { t, language } = useLanguage();
  const [open, setOpen] = useState(true);
  const copy = getToolFormCopy(toolId, t, language);

  if ((requiredPlan === "pro" && (plan === "pro" || plan === "studio")) || (requiredPlan === "studio" && plan === "studio")) {
    return <>{children}</>;
  }

  return (
    <div className="relative min-h-[70vh]">
      <div className="pointer-events-none opacity-15 blur-[3px]">{children}</div>
      <ToolUpgradeModal
        open={open}
        onClose={() => setOpen(false)}
        toolName={copy.title}
        toolDescription={copy.description}
        requiredPlan={requiredPlan}
      />
    </div>
  );
}
