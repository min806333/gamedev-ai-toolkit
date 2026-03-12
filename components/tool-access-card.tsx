"use client";

import Link from "next/link";
import { ArrowRight, Lock } from "lucide-react";
import { useState } from "react";
import type { LucideIcon } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { ToolUpgradeModal } from "@/components/tool-upgrade-modal";
import { Card } from "@/components/ui/card";
import { hasRequiredPlan } from "@/lib/billing";
import type { Plan } from "@/lib/types";
import { cn } from "@/lib/utils";

type ToolAccessCardProps = {
  href: string;
  title: string;
  description: string;
  icon: LucideIcon;
  plan?: Plan;
  requiredPlan?: Plan;
  badge?: string;
  openLabel: string;
};

export function ToolAccessCard({
  href,
  title,
  description,
  icon: Icon,
  plan = "free",
  requiredPlan,
  badge,
  openLabel
}: ToolAccessCardProps) {
  const { t } = useLanguage();
  const [upgradeOpen, setUpgradeOpen] = useState(false);
  const locked = !hasRequiredPlan(plan, requiredPlan);
  const ctaLabel = locked
    ? requiredPlan === "studio"
      ? t.pricing.upgradeToStudio
      : t.pricing.upgradeToPro
    : openLabel;

  const content = (
    <Card
      className={cn(
        "group relative flex h-full min-w-0 flex-col overflow-hidden border-[color:var(--border)] p-6 text-left transition duration-200",
        locked
          ? "border-[color:var(--border-strong)] bg-[linear-gradient(160deg,color-mix(in_srgb,var(--card)_92%,white_8%),color-mix(in_srgb,var(--background)_88%,black_12%))] hover:-translate-y-1 hover:bg-[linear-gradient(160deg,color-mix(in_srgb,var(--card-strong)_92%,white_8%),color-mix(in_srgb,var(--background)_84%,black_16%))]"
          : "bg-[color:var(--card)] hover:-translate-y-1 hover:border-[color:var(--border-strong)] hover:bg-[color:var(--card-strong)]"
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,color-mix(in_srgb,var(--foreground)_10%,transparent),transparent_34%)] opacity-80" />
      <div className="relative flex items-start justify-between gap-3">
        <div className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--background)]/38 p-2.5">
          <Icon className="h-5 w-5 shrink-0 text-[color:var(--foreground)]/82" />
        </div>
        <div className="flex items-center gap-2">
          {locked ? (
            <span className="inline-flex items-center gap-1 rounded-full border border-[color:var(--border)] bg-[color:var(--background)]/55 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.16em] text-[color:var(--foreground)]/72 whitespace-nowrap">
              <Lock className="h-3 w-3" />
              {badge}
            </span>
          ) : badge ? (
            <span className="rounded-full border border-[color:var(--border)] bg-[color:var(--background)]/45 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-[color:var(--foreground)]/70 whitespace-nowrap">
              {badge}
            </span>
          ) : null}
        </div>
      </div>

      <h3 className="relative mt-5 text-lg font-semibold break-keep leading-snug text-[color:var(--foreground)]">{title}</h3>
      <p className="relative mt-3 min-w-0 text-sm break-keep whitespace-normal leading-relaxed text-[color:var(--foreground)]/68">{description}</p>

      <div className="relative mt-auto flex items-center pt-6 text-sm break-keep text-[color:var(--foreground)]/78">
        {locked ? <Lock className="mr-2 h-4 w-4 shrink-0" /> : null}
        {ctaLabel}
        <ArrowRight className="ml-2 h-4 w-4 shrink-0 transition group-hover:translate-x-1" />
      </div>
    </Card>
  );

  if (!locked) {
    return (
      <Link href={href} className="h-full min-w-0">
        {content}
      </Link>
    );
  }

  return (
    <>
      <button type="button" onClick={() => setUpgradeOpen(true)} className="h-full min-w-0 text-left">
        {content}
      </button>
      {requiredPlan ? (
        <ToolUpgradeModal
          open={upgradeOpen}
          onClose={() => setUpgradeOpen(false)}
          toolName={title}
          toolDescription={description}
          requiredPlan={requiredPlan}
        />
      ) : null}
    </>
  );
}
