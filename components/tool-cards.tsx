"use client";

import Link from "next/link";
import { ArrowRight, CalendarRange, Code2, FileText, LayoutTemplate, Lightbulb, Network, PanelsTopLeft, ScrollText } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { Card } from "@/components/ui/card";
import { hasRequiredPlan } from "@/lib/billing";
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
      {tools.map((tool) => {
        const locked = !hasRequiredPlan(plan ?? "free", tool.requiredPlan);

        return (
          <Link key={tool.href} href={tool.href} className="h-full min-w-0">
            <Card className="group flex h-full min-w-0 flex-col border-[color:var(--border)] bg-[color:var(--card)] p-6 transition duration-200 hover:-translate-y-1 hover:border-[color:var(--border-strong)] hover:bg-[color:var(--card-strong)]">
              <div className="flex items-start justify-between gap-3">
                <tool.icon className="h-5 w-5 shrink-0 text-[color:var(--foreground)]/80" />
                {tool.badge ? (
                  <span className="rounded-full border border-[color:var(--border)] bg-[color:var(--background)]/45 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-[color:var(--foreground)]/70 whitespace-nowrap">
                    {tool.badge}
                  </span>
                ) : null}
              </div>
              <h3 className="mt-5 text-lg font-semibold break-keep leading-snug text-[color:var(--foreground)]">{tool.title}</h3>
              <p className="mt-3 min-w-0 text-sm break-keep whitespace-normal leading-relaxed text-[color:var(--foreground)]/65">{tool.description}</p>
              <div className="mt-auto flex items-center pt-6 text-sm break-keep text-[color:var(--foreground)]/75">
                {locked
                  ? tool.requiredPlan === "studio"
                    ? t.pricing.upgradeToStudio
                    : t.pricing.upgradeToPro
                  : t.toolCards.openTool}
                <ArrowRight className="ml-2 h-4 w-4 shrink-0 transition group-hover:translate-x-1" />
              </div>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}
