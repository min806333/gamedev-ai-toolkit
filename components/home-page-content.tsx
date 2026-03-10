"use client";

import { FeatureGrid } from "@/components/feature-grid";
import { Hero } from "@/components/hero";
import { PricingCards } from "@/components/pricing-cards";
import { ToolCards } from "@/components/tool-cards";
import { useLanguage } from "@/components/language-provider";

export function HomePageContent() {
  const { t } = useLanguage();

  return (
    <>
      <Hero />
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-10 max-w-2xl">
          <p className="text-sm uppercase tracking-[0.24em] text-[color:var(--foreground)]/45">{t.landing.toolsLabel}</p>
          <h2 className="mt-3 text-3xl font-semibold text-[color:var(--foreground)] md:text-4xl">
            {t.landing.toolsTitle}
          </h2>
        </div>
        <ToolCards />
      </section>
      <FeatureGrid />
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-10 max-w-2xl">
          <p className="text-sm uppercase tracking-[0.24em] text-[color:var(--foreground)]/45">{t.landing.pricingLabel}</p>
          <h2 className="mt-3 text-3xl font-semibold text-[color:var(--foreground)] md:text-4xl">
            {t.landing.pricingTitle}
          </h2>
        </div>
        <PricingCards />
      </section>
    </>
  );
}
