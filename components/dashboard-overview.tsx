"use client";

import Link from "next/link";
import { useLanguage } from "@/components/language-provider";
import { StatsCard } from "@/components/stats-card";
import { ToolCards } from "@/components/tool-cards";
import { Card } from "@/components/ui/card";
import { getPlanLabel } from "@/lib/plan-label";
import { getToolDisplayName } from "@/lib/tools/tool-content";
import { getToolConfig } from "@/lib/tools/tool-config";
import type { Plan, ToolType } from "@/lib/types";

export function DashboardOverview({
  usage,
  generations
}: {
  usage: { plan: Plan; todayCount: number; remaining: number; limit: string | number };
  generations: Array<{ id: string; tool: string; created_at: string; prompt: string }> | null;
}) {
  const { t, language } = useLanguage();
  const gddTool = getToolConfig("gdd");
  const planLabel = getPlanLabel(usage.plan, t);

  return (
    <div className="space-y-8">
      <div className="grid gap-6 xl:grid-cols-[1.5fr_minmax(0,0.9fr)]">
        <Card className="border-[color:var(--border)] bg-[color:var(--card)] p-6 sm:p-8">
          <p className="text-sm uppercase tracking-[0.24em] text-[color:var(--foreground)]/45">{t.dashboard.label}</p>
          <h1 className="mt-3 font-display text-3xl font-semibold break-keep leading-tight text-[color:var(--foreground)] sm:text-4xl">
            {t.dashboard.title}
          </h1>
          <p className="mt-3 max-w-2xl break-keep text-[color:var(--foreground)]/60 leading-relaxed whitespace-normal">
            {t.dashboard.description} {planLabel}.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <StatsCard label={t.dashboard.today} value={String(usage.todayCount)} hint={t.dashboard.todayHint} />
            <StatsCard
              label={t.dashboard.remaining}
              value={usage.remaining === Number.POSITIVE_INFINITY ? t.common.unlimited : String(usage.remaining)}
              hint={t.dashboard.remainingHint}
            />
            <StatsCard
              label={t.dashboard.plan}
              value={planLabel}
              hint={usage.limit === "Unlimited" ? t.dashboard.unlimitedUsage : t.dashboard.dailyHint}
            />
          </div>
        </Card>

        <Card className="border-[color:var(--border)] bg-[color:var(--card)] p-6">
          <p className="text-sm uppercase tracking-[0.24em] text-[color:var(--foreground)]/45">{t.dashboard.workspace}</p>
          <h2 className="mt-3 text-2xl font-semibold break-keep text-[color:var(--foreground)]">{t.dashboard.fastAccess}</h2>
          <div className="mt-6 space-y-3">
            <Link
              href="/dashboard/history"
              className="block rounded-2xl border border-[color:var(--border)] bg-[color:var(--background)]/40 p-4 text-sm break-keep leading-relaxed text-[color:var(--foreground)]/75 transition hover:bg-[color:var(--card-strong)]"
            >
              {t.dashboard.browseHistory}
            </Link>
            <Link
              href={gddTool.route}
              className="block rounded-2xl border border-[color:var(--border)] bg-[color:var(--background)]/40 p-4 text-sm break-keep leading-relaxed text-[color:var(--foreground)]/75 transition hover:bg-[color:var(--card-strong)]"
            >
              {t.dashboard.gdd}
            </Link>
            <Link
              href="/pricing"
              className="block rounded-2xl border border-[color:var(--border)] bg-[color:var(--background)]/40 p-4 text-sm break-keep leading-relaxed text-[color:var(--foreground)]/75 transition hover:bg-[color:var(--card-strong)]"
            >
              {t.pricing.upgradeToPro}
            </Link>
          </div>
        </Card>
      </div>

      <div>
        <p className="text-sm uppercase tracking-[0.24em] text-[color:var(--foreground)]/45">{t.dashboard.generators}</p>
        <h2 className="mt-3 font-display text-3xl font-semibold break-keep text-[color:var(--foreground)]">{t.dashboard.toolSelection}</h2>
        <div className="mt-6">
          <ToolCards plan={usage.plan} />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
        <Card className="border-[color:var(--border)] bg-[color:var(--card)] p-6">
          <h2 className="text-xl font-semibold break-keep text-[color:var(--foreground)]">{t.dashboard.recent}</h2>
          <p className="mt-1 text-sm break-keep text-[color:var(--foreground)]/55">{t.dashboard.recentHint}</p>
          <div className="mt-6 space-y-3">
            {generations?.length ? (
              generations.map((item) => (
                <div key={item.id} className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--background)]/35 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
                    <span className="font-medium break-keep text-[color:var(--foreground)]">
                      {getToolDisplayName(item.tool as ToolType, t, language)}
                    </span>
                    <span className="text-[color:var(--foreground)]/45">{new Date(item.created_at).toLocaleDateString(language === "ko" ? "ko-KR" : "en-US")}</span>
                  </div>
                  <p className="mt-2 line-clamp-2 break-keep text-sm leading-relaxed text-[color:var(--foreground)]/60">{item.prompt}</p>
                </div>
              ))
            ) : (
              <p className="text-sm break-keep text-[color:var(--foreground)]/55">{t.dashboard.noGenerations}</p>
            )}
          </div>
        </Card>

        <Card className="border-[color:var(--border)] bg-[color:var(--card)] p-6">
          <h2 className="text-xl font-semibold break-keep text-[color:var(--foreground)]">{t.dashboard.workflowNotes}</h2>
          <div className="mt-6 space-y-4 text-sm break-keep leading-relaxed text-[color:var(--foreground)]/65">
            <p>{t.dashboard.note1}</p>
            <p>{t.dashboard.note2}</p>
            <p>{t.dashboard.note3}</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
