"use client";

import { Footer } from "@/components/footer";
import { PricingCards } from "@/components/pricing-cards";
import { useLanguage } from "@/components/language-provider";
import type { PlanConfig } from "@/lib/billing/plans";
import type { Plan } from "@/lib/types";

export function PricingPageContent({
  currentPlan,
  authenticated,
  plans,
  checkoutStatus
}: {
  currentPlan?: Plan;
  authenticated: boolean;
  plans: Array<Pick<PlanConfig, "id" | "label" | "monthlyPrice" | "dailyGenerationLimit">>;
  checkoutStatus?: string;
}) {
  const { t, language } = useLanguage();
  const checkoutMessage =
    checkoutStatus === "success"
      ? language === "ko"
        ? "결제가 완료되었습니다. 구독 상태가 반영되기까지 잠시 걸릴 수 있습니다."
        : "Checkout completed. Your subscription status may take a moment to update."
      : checkoutStatus === "cancelled"
        ? language === "ko"
          ? "결제가 취소되었습니다. 원할 때 다시 업그레이드할 수 있습니다."
          : "Checkout was cancelled. You can upgrade again whenever you are ready."
        : null;

  return (
    <>
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-12 max-w-3xl">
          <p className="text-sm uppercase tracking-[0.24em] text-[color:var(--foreground)]/45">{t.landing.pricingLabel}</p>
          <h1 className="mt-3 font-display text-5xl font-semibold break-keep text-[color:var(--foreground)]">{t.pricing.pageTitle}</h1>
          <p className="mt-4 break-keep text-lg leading-8 text-[color:var(--foreground)]/60">{t.pricing.pageDescription}</p>
          <p className="mt-4 text-sm break-keep text-[color:var(--foreground)]/50">{t.pricing.saveExportNotice}</p>
          {checkoutMessage ? (
            <p className="mt-4 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm break-keep text-emerald-200">
              {checkoutMessage}
            </p>
          ) : null}
        </div>
        <PricingCards currentPlan={currentPlan} authenticated={authenticated} plans={plans} />
      </section>
      <Footer />
    </>
  );
}
