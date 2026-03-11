"use client";

import Link from "next/link";
import { useLanguage } from "@/components/language-provider";
import { StatsCard } from "@/components/stats-card";
import { ToolCards } from "@/components/tool-cards";
import { Card } from "@/components/ui/card";
import { getToolConfig } from "@/lib/tools/tool-config";
import type { Plan } from "@/lib/types";

export function DashboardOverview({
  usage,
  generations
}: {
  usage: { plan: Plan; todayCount: number; remaining: number; limit: string | number };
  generations: Array<{ id: string; tool: string; created_at: string; prompt: string }> | null;
}) {
  const { t } = useLanguage();
  const gddTool = getToolConfig("gdd");

  return (
    <div className="space-y-8">
      <div className="grid gap-6 xl:grid-cols-[1.5fr_0.9fr]">
        <Card className="border-[color:var(--border)] bg-[color:var(--card)] p-8">
          <p className="text-sm uppercase tracking-[0.24em] text-[color:var(--foreground)]/45">{t.dashboard.label}</p>
          <h1 className="mt-3 font-display text-4xl font-semibold text-[color:var(--foreground)]">{t.dashboard.title}</h1>
          <p className="mt-3 max-w-2xl text-[color:var(--foreground)]/60">
            {t.dashboard.description} {usage.plan.toUpperCase()}.
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <StatsCard label={t.dashboard.today} value={String(usage.todayCount)} hint={t.dashboard.todayHint} />
            <StatsCard
              label={t.dashboard.remaining}
              value={usage.remaining === Number.POSITIVE_INFINITY ? t.common.unlimited : String(usage.remaining)}
              hint={t.dashboard.remainingHint}
            />
            <StatsCard
              label={t.dashboard.plan}
              value={usage.plan.toUpperCase()}
              hint={usage.limit === "Unlimited" ? t.dashboard.unlimitedUsage : t.dashboard.dailyHint}
            />
          </div>
        </Card>

        <Card className="border-[color:var(--border)] bg-[color:var(--card)] p-6">
          <p className="text-sm uppercase tracking-[0.24em] text-[color:var(--foreground)]/45">{t.dashboard.workspace}</p>
          <h2 className="mt-3 text-2xl font-semibold text-[color:var(--foreground)]">{t.dashboard.fastAccess}</h2>
          <div className="mt-6 space-y-3">
            <Link
              href="/dashboard/generations"
              className="block rounded-2xl border border-[color:var(--border)] bg-[color:var(--background)]/40 p-4 text-sm text-[color:var(--foreground)]/75"
            >
              {t.dashboard.browseHistory}
            </Link>
            <Link
              href={gddTool.route}
              className="block rounded-2xl border border-[color:var(--border)] bg-[color:var(--background)]/40 p-4 text-sm text-[color:var(--foreground)]/75"
            >
              {t.dashboard.gdd}
            </Link>
            <Link
              href="/pricing"
              className="block rounded-2xl border border-[color:var(--border)] bg-[color:var(--background)]/40 p-4 text-sm text-[color:var(--foreground)]/75"
            >
              {t.pricing.upgradeToPro}
            </Link>
          </div>
        </Card>
      </div>

      <div>
        <p className="text-sm uppercase tracking-[0.24em] text-[color:var(--foreground)]/45">{t.dashboard.generators}</p>
        <h2 className="mt-3 font-display text-3xl font-semibold text-[color:var(--foreground)]">{t.dashboard.toolSelection}</h2>
        <div className="mt-6">
          <ToolCards plan={usage.plan} />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <Card className="border-[color:var(--border)] bg-[color:var(--card)] p-6">
          <h2 className="text-xl font-semibold text-[color:var(--foreground)]">{t.dashboard.recent}</h2>
          <p className="mt-1 text-sm text-[color:var(--foreground)]/55">{t.dashboard.recentHint}</p>
          <div className="mt-6 space-y-3">
            {generations?.length ? (
              generations.map((item) => (
                <div key={item.id} className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--background)]/35 p-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium uppercase text-[color:var(--foreground)]">{item.tool}</span>
                    <span className="text-[color:var(--foreground)]/45">{new Date(item.created_at).toLocaleDateString()}</span>
                  </div>
                  <p className="mt-2 line-clamp-2 text-sm text-[color:var(--foreground)]/60">{item.prompt}</p>
                </div>
              ))
            ) : (
              <p className="text-sm text-[color:var(--foreground)]/55">{t.dashboard.noGenerations}</p>
            )}
          </div>
        </Card>

        <Card className="border-[color:var(--border)] bg-[color:var(--card)] p-6">
          <h2 className="text-xl font-semibold text-[color:var(--foreground)]">{t.dashboard.workflowNotes}</h2>
          <div className="mt-6 space-y-4 text-sm leading-7 text-[color:var(--foreground)]/65">
            <p>{t.dashboard.note1}</p>
            <p>{t.dashboard.note2}</p>
            <p>{t.dashboard.note3}</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
