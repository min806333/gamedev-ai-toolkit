"use client";

import { Footer } from "@/components/footer";
import { PricingCards } from "@/components/pricing-cards";
import { useLanguage } from "@/components/language-provider";
import type { PlanConfig } from "@/lib/billing/plans";
import type { Plan } from "@/lib/types";

export function PricingPageContent({
  currentPlan,
  authenticated,
  plans
}: {
  currentPlan?: Plan;
  authenticated: boolean;
  plans: Array<Pick<PlanConfig, "id" | "label" | "monthlyPrice" | "dailyGenerationLimit">>;
}) {
  const { t } = useLanguage();

  return (
    <>
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-12 max-w-3xl">
          <p className="text-sm uppercase tracking-[0.24em] text-[color:var(--foreground)]/45">{t.landing.pricingLabel}</p>
          <h1 className="mt-3 font-display text-5xl font-semibold text-[color:var(--foreground)]">{t.pricing.pageTitle}</h1>
          <p className="mt-4 text-lg leading-8 text-[color:var(--foreground)]/60">{t.pricing.pageDescription}</p>
          <p className="mt-4 text-sm text-[color:var(--foreground)]/50">{t.pricing.saveExportNotice}</p>
        </div>
        <PricingCards currentPlan={currentPlan} authenticated={authenticated} plans={plans} />
      </section>
      <Footer />
    </>
  );
}
