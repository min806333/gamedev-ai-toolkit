import { PricingPageContent } from "@/components/pricing-page-content";
import { SiteHeader } from "@/components/site-header";
import { getAllPlanConfigs } from "@/lib/billing";
import { getCurrentUser } from "@/lib/auth/session";
import { ensureUserProfile, getUsageSummary } from "@/lib/usage";

export default async function PricingPage({
  searchParams
}: {
  searchParams?: { checkout?: string };
}) {
  const user = await getCurrentUser();
  const plans = getAllPlanConfigs().map((plan) => ({
    id: plan.id,
    label: plan.label,
    monthlyPrice: plan.monthlyPrice,
    dailyGenerationLimit: plan.dailyGenerationLimit
  }));

  let currentPlan = undefined;

  if (user) {
    await ensureUserProfile(user);
    const usage = await getUsageSummary(user.id);
    currentPlan = usage.plan;
  }

  return (
    <div className="min-h-screen bg-[color:var(--background)]">
      <SiteHeader />
      <PricingPageContent
        currentPlan={currentPlan}
        authenticated={!!user}
        plans={plans}
        checkoutStatus={searchParams?.checkout}
      />
    </div>
  );
}
