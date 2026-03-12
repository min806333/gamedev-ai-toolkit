"use client";

import { CalendarRange, Code2, FileText, LayoutTemplate, Lightbulb, Network, PanelsTopLeft, ScrollText } from "lucide-react";
import { ToolAccessCard } from "@/components/tool-access-card";
import { useLanguage } from "@/components/language-provider";
import { getToolCardCopy } from "@/lib/tools/tool-content";
import { DASHBOARD_TOOL_IDS, getToolConfig } from "@/lib/tools/tool-config";
import type { Plan } from "@/lib/types";

const TOOL_ICONS = {
  idea: Lightbulb,
  ui: LayoutTemplate,
  "unity-script": ScrollText,
  code: Code2,
  gdd: FileText,
  "ui-ux-plan": PanelsTopLeft,
  "system-design": Network,
  "mvp-roadmap": CalendarRange
} as const;

export function ToolCards({ plan }: { plan?: Plan }) {
  const { t } = useLanguage();
  const tools = DASHBOARD_TOOL_IDS.map((toolId) => {
    const tool = getToolConfig(toolId);
    const copy = getToolCardCopy(toolId, t);

    return {
      href: tool.route,
      icon: TOOL_ICONS[toolId],
      requiredPlan: tool.requiredPlan,
      badge: tool.requiredPlan === "studio" ? t.common.studioBadge : tool.requiredPlan === "pro" ? t.common.proBadge : undefined,
      ...copy
    };
  });

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      {tools.map((tool) => (
        <ToolAccessCard
          key={tool.href}
          href={tool.href}
          title={tool.title}
          description={tool.description}
          icon={tool.icon}
          plan={plan}
          requiredPlan={tool.requiredPlan}
          badge={tool.badge}
          openLabel={t.toolCards.openTool}
        />
      ))}
    </div>
  );
}
