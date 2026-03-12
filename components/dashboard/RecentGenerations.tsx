"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { Card } from "@/components/ui/card";
import { getToolDisplayName } from "@/lib/tools/tool-content";
import type { ToolType } from "@/lib/types";

export function RecentGenerations({
  generations
}: {
  generations: Array<{ id: string; tool: string; created_at: string; prompt: string }> | null;
}) {
  const { t, language } = useLanguage();

  return (
    <Card className="border-[color:var(--border)] bg-[color:var(--card)] p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm uppercase tracking-[0.24em] text-[color:var(--foreground)]/45">{t.dashboard.recent}</p>
          <h2 className="mt-3 text-2xl font-semibold break-keep text-[color:var(--foreground)]">{t.history.title}</h2>
          <p className="mt-2 text-sm break-keep text-[color:var(--foreground)]/55">{t.dashboard.recentHint}</p>
        </div>
        <Link href="/dashboard/history" className="inline-flex items-center gap-2 text-sm break-keep text-[color:var(--foreground)]/65 transition hover:text-[color:var(--foreground)]">
          {t.dashboard.browseHistory}
          <ArrowUpRight className="h-4 w-4 shrink-0" />
        </Link>
      </div>

      <div className="mt-6 space-y-3">
        {generations?.length ? (
          generations.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--background)]/35 p-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
                <span className="font-medium break-keep text-[color:var(--foreground)]">
                  {getToolDisplayName(item.tool as ToolType, t, language)}
                </span>
                <span className="text-[color:var(--foreground)]/45">{new Date(item.created_at).toLocaleDateString()}</span>
              </div>
              <p className="mt-3 line-clamp-2 break-keep text-sm leading-relaxed text-[color:var(--foreground)]/62">{item.prompt}</p>
            </div>
          ))
        ) : (
          <div className="rounded-2xl border border-dashed border-[color:var(--border)] bg-[color:var(--background)]/25 p-5 text-sm break-keep text-[color:var(--foreground)]/55">
            {t.dashboard.noGenerations}
          </div>
        )}
      </div>
    </Card>
  );
}
