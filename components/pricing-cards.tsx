"use client";

import { Check } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { PlanUpgradeButton } from "@/components/plan-upgrade-button";
import { Card } from "@/components/ui/card";
import type { Plan } from "@/lib/types";

export function PricingCards({
  currentPlan,
  authenticated
}: {
  currentPlan?: Plan;
  authenticated?: boolean;
}) {
  const { t } = useLanguage();
  const tiers = [
    {
      plan: "free" as const,
      name: t.pricing.free,
      price: "$0",
      details: t.pricing.freeDetails,
      features: t.pricing.freeFeatures
    },
    {
      plan: "pro" as const,
      name: t.pricing.pro,
      price: "$12/mo",
      details: t.pricing.proDetails,
      features: t.pricing.proFeatures,
      featured: true
    },
    {
      plan: "studio" as const,
      name: t.pricing.studio,
      price: "$29/mo",
      details: t.pricing.studioDetails,
      features: t.pricing.studioFeatures
    }
  ];

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {tiers.map((tier) => (
        <Card
          key={tier.name}
          className={`border-[color:var(--border)] p-8 ${
            tier.featured
              ? "bg-[linear-gradient(180deg,rgba(255,255,255,0.12),rgba(255,255,255,0.04))]"
              : "bg-[color:var(--card)]"
          }`}
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
