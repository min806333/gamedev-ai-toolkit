"use client";

import { Check } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { PlanUpgradeButton } from "@/components/plan-upgrade-button";
import { Card } from "@/components/ui/card";
import type { PlanConfig } from "@/lib/billing/plans";
import type { Plan } from "@/lib/types";

export function PricingCards({
  currentPlan,
  authenticated,
  plans
}: {
  currentPlan?: Plan;
  authenticated?: boolean;
  plans?: Array<Pick<PlanConfig, "id" | "label" | "monthlyPrice" | "dailyGenerationLimit">>;
}) {
  const { t } = useLanguage();
  const planList = plans ?? [
    { id: "free" as const, label: "Free", monthlyPrice: 0, dailyGenerationLimit: 5 },
    { id: "pro" as const, label: "Pro", monthlyPrice: 12, dailyGenerationLimit: null },
    { id: "studio" as const, label: "Studio", monthlyPrice: 29, dailyGenerationLimit: null }
  ];
  const tiers = planList.map((plan) => ({
    plan: plan.id,
    name: plan.id === "free" ? t.pricing.free : plan.id === "pro" ? t.pricing.pro : t.pricing.studio,
    price: plan.monthlyPrice === 0 ? "$0" : `$${plan.monthlyPrice}/mo`,
    details:
      plan.id === "free"
        ? t.pricing.freeDetails
        : plan.id === "pro"
          ? t.pricing.proDetails
          : t.pricing.studioDetails,
    features:
      plan.id === "free"
        ? t.pricing.freeFeatures
        : plan.id === "pro"
          ? t.pricing.proFeatures
          : t.pricing.studioFeatures,
    featured: plan.id === "pro"
  }));

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {tiers.map((tier) => (
        <Card
          key={tier.name}
          className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8 transition hover:border-zinc-600 hover:scale-[1.02]"
        >
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm uppercase tracking-[0.24em] text-[color:var(--foreground)]/45">{tier.name}</p>
            {tier.featured ? (
              <span className="rounded-full border border-[color:var(--border)] bg-[color:var(--background)]/45 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-[color:var(--foreground)]/70">
                {t.common.proBadge}
              </span>
            ) : null}
          </div>
          <h3 className="mt-4 text-4xl font-semibold text-[color:var(--foreground)]">{tier.price}</h3>
          <p className="mt-3 text-sm text-[color:var(--foreground)]/60">{tier.details}</p>
          <div className="mt-8 space-y-3 text-sm text-[color:var(--foreground)]/74">
            {tier.features.map((feature) => (
              <div key={feature} className="flex items-start gap-3">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--foreground)]/70" />
                <p>{feature}</p>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <PlanUpgradeButton
              targetPlan={tier.plan}
              currentPlan={currentPlan}
              authenticated={!!authenticated}
            />
          </div>
        </Card>
      ))}
    </div>
  );
}
