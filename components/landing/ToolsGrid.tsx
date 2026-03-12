"use client";

import Link from "next/link";
import { FileText, LayoutTemplate, Lightbulb, Network, PanelsTopLeft, ScrollText, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { ToolAccessCard } from "@/components/tool-access-card";
import { useLanguage } from "@/components/language-provider";
import { getLandingMessages } from "@/lib/landing-messages";
import { LANDING_TOOL_IDS, getToolConfig } from "@/lib/tools/tool-config";
import type { Plan } from "@/lib/types";

const TOOL_ICONS = {
  idea: Lightbulb,
  "unity-script": ScrollText,
  ui: LayoutTemplate,
  gdd: FileText,
  "ui-ux-plan": PanelsTopLeft,
  "system-design": Network,
  "mvp-roadmap": Sparkles
} as const;

export function ToolsGrid() {
  const { language, t } = useLanguage();
  const [plan, setPlan] = useState<Plan>("free");
  const copy = getLandingMessages(language);
  const tools = LANDING_TOOL_IDS.map((toolId) => {
    const tool = getToolConfig(toolId);
    const toolCopy = copy.tools.items.find((item) => item.id === toolId);

    return {
      href: tool.route,
      icon: TOOL_ICONS[toolId],
      title: toolCopy?.title ?? tool.label,
      description: toolCopy?.description ?? "",
      requiredPlan: tool.requiredPlan,
      badge: tool.requiredPlan === "studio" ? t.common.studioBadge : tool.requiredPlan === "pro" ? t.common.proBadge : undefined
    };
  });

  useEffect(() => {
    let active = true;

    void fetch("/api/account/plan")
      .then((response) => response.json())
      .then((data: { plan?: Plan }) => {
        if (active && data.plan) {
          setPlan(data.plan);
        }
      })
      .catch(() => {});

    return () => {
      active = false;
    };
  }, []);

  return (
    <section id="tools" className="mx-auto max-w-7xl px-6 py-20">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <p className="text-sm uppercase tracking-[0.24em] text-[color:var(--foreground)]/45">{copy.tools.label}</p>
          <h2 className="mt-3 font-display text-4xl font-semibold break-keep text-[color:var(--foreground)]">{copy.tools.title}</h2>
        </div>
        <Link href="/dashboard" className="text-sm break-keep text-[color:var(--foreground)]/60 transition hover:text-[color:var(--foreground)]">
          {copy.tools.dashboardCta}
        </Link>
      </div>
      <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
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
            openLabel={copy.tools.openTool}
          />
        ))}
      </div>
    </section>
  );
}
