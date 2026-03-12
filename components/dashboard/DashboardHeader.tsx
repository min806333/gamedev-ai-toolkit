"use client";

import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getPlanLabel } from "@/lib/plan-label";
import { getToolConfig } from "@/lib/tools/tool-config";
import type { Plan } from "@/lib/types";

export function DashboardHeader({
  plan,
  userEmail
}: {
  plan: Plan;
  userEmail?: string;
}) {
  const { t } = useLanguage();
  const ideaTool = getToolConfig("idea");
  const planLabel = getPlanLabel(plan, t);

  return (
    <Card className="overflow-hidden border-[color:var(--border)] bg-[linear-gradient(145deg,color-mix(in_srgb,var(--card)_88%,white_12%),var(--card))] p-8">
      <div className="flex flex-wrap items-start justify-between gap-6">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border)] bg-[color:var(--background)]/45 px-3 py-1 text-xs uppercase tracking-[0.22em] text-[color:var(--foreground)]/45">
            <Sparkles className="h-3.5 w-3.5" />
            {t.dashboard.label}
          </div>
          <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-[color:var(--foreground)]">
            {t.dashboard.title}
          </h1>
          <p className="mt-3 text-base leading-8 text-[color:var(--foreground)]/60">
            {t.dashboard.description} {planLabel}.
          </p>
          {userEmail ? <p className="mt-4 text-sm text-[color:var(--foreground)]/45">{userEmail}</p> : null}
        </div>

        <div className="flex flex-wrap gap-3">
          <Link href={ideaTool.route}>
            <Button className="h-11 rounded-full px-5">{t.dashboard.idea}</Button>
          </Link>
          <Link href="/pricing">
            <Button variant="secondary" className="h-11 rounded-full px-5">
              {t.pricing.upgradeToPro}
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
}
