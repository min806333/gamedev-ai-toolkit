"use client";

import Link from "next/link";
import { ArrowRight, CalendarRange, Code2, FileText, LayoutTemplate, Lightbulb, Network, PanelsTopLeft, ScrollText } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { Card } from "@/components/ui/card";
import type { Plan } from "@/lib/types";

function hasRequiredPlan(plan: Plan | undefined, requiredPlan?: Plan) {
  if (!requiredPlan) {
    return true;
  }

  if (requiredPlan === "pro") {
    return plan === "pro" || plan === "studio";
  }

  return plan === "studio";
}

export function ToolCards({ plan }: { plan?: Plan }) {
  const { t } = useLanguage();
  const tools = [
    { href: "/tools/idea", icon: Lightbulb, requiredPlan: undefined, badge: undefined, ...t.toolCards.items[0] },
    { href: "/tools/ui", icon: LayoutTemplate, requiredPlan: undefined, badge: undefined, ...t.toolCards.items[1] },
    { href: "/tools/unity-script", icon: ScrollText, requiredPlan: undefined, badge: undefined, ...t.toolCards.items[2] },
    { href: "/tools/code", icon: Code2, requiredPlan: undefined, badge: undefined, ...t.toolCards.items[3] },
    { href: "/tools/gdd", icon: FileText, requiredPlan: "pro" as const, badge: t.common.proBadge, ...t.toolCards.items[4] },
    {
      href: "/tools/ui-ux-planning",
      icon: PanelsTopLeft,
      requiredPlan: "pro" as const,
      badge: t.common.proBadge,
      ...t.toolCards.items[5]
    },
    {
      href: "/tools/system-design",
      icon: Network,
      requiredPlan: "pro" as const,
      badge: t.common.proBadge,
      ...t.toolCards.items[6]
    },
    {
      href: "/tools/mvp-roadmap",
      icon: CalendarRange,
      requiredPlan: "studio" as const,
      badge: t.common.studioBadge,
      ...t.toolCards.items[7]
    }
  ];

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      {tools.map((tool) => {
        const locked = !hasRequiredPlan(plan, tool.requiredPlan);

        return (
          <Link key={tool.href} href={tool.href} className="h-full">
            <Card className="group flex h-full flex-col border-[color:var(--border)] bg-[color:var(--card)] p-6 transition duration-200 hover:-translate-y-1 hover:border-[color:var(--border-strong)] hover:bg-[color:var(--card-strong)]">
              <div className="flex items-start justify-between gap-3">
                <tool.icon className="h-5 w-5 text-[color:var(--foreground)]/80" />
                {tool.badge ? (
                  <span className="rounded-full border border-[color:var(--border)] bg-[color:var(--background)]/45 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-[color:var(--foreground)]/70">
                    {tool.badge}
                  </span>
                ) : null}
              </div>
              <h3 className="mt-5 text-lg font-semibold text-[color:var(--foreground)]">{tool.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[color:var(--foreground)]/65">{tool.description}</p>
              <div className="mt-auto flex items-center pt-6 text-sm text-[color:var(--foreground)]/75">
                {locked
                  ? tool.requiredPlan === "studio"
                    ? t.pricing.upgradeToStudio
                    : t.pricing.upgradeToPro
                  : t.toolCards.openTool}
                <ArrowRight className="ml-2 h-4 w-4 transition group-hover:translate-x-1" />
              </div>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}
