"use client";

import { Activity, Layers3, Zap } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { Card } from "@/components/ui/card";
import { getPlanLabel } from "@/lib/plan-label";
import type { Plan } from "@/lib/types";

export function UsageCard({
  usage
}: {
  usage: { plan: Plan; todayCount: number; remaining: number; limit: string | number };
}) {
  const { t } = useLanguage();
  const planLabel = getPlanLabel(usage.plan, t);

  const cards = [
    {
      label: t.dashboard.today,
      value: String(usage.todayCount),
      hint: t.dashboard.todayHint,
      icon: Activity
    },
    {
      label: t.dashboard.remaining,
      value: usage.remaining === Number.POSITIVE_INFINITY ? t.common.unlimited : String(usage.remaining),
      hint: t.dashboard.remainingHint,
      icon: Zap
    },
    {
      label: t.dashboard.plan,
      value: planLabel,
      hint: usage.limit === "Unlimited" ? t.dashboard.unlimitedUsage : t.dashboard.dailyHint,
      icon: Layers3
    }
  ];

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {cards.map((card) => (
        <Card key={card.label} className="min-w-0 border-[color:var(--border)] bg-[color:var(--card)] p-6">
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm break-keep text-[color:var(--foreground)]/45">{card.label}</p>
            <div className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--background)]/45 p-2">
              <card.icon className="h-4 w-4 text-[color:var(--foreground)]/70" />
            </div>
          </div>
          <h2 className="mt-5 text-3xl font-semibold text-[color:var(--foreground)] sm:text-4xl">{card.value}</h2>
          <p className="mt-2 text-sm break-keep leading-relaxed text-[color:var(--foreground)]/55">{card.hint}</p>
        </Card>
      ))}
    </div>
  );
}
