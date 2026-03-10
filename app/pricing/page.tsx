import { PricingPageContent } from "@/components/pricing-page-content";
import { SiteHeader } from "@/components/site-header";
import { createClient } from "@/lib/supabase/server";
import { ensureUserProfile, getUsageSummary } from "@/lib/usage";

export default async function PricingPage() {
  const supabase = createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  let currentPlan = undefined;

  if (user) {
    await ensureUserProfile(user);
    const usage = await getUsageSummary(user.id);
    currentPlan = usage.plan;
  }

  return (
    <div className="min-h-screen bg-[color:var(--background)]">
      <SiteHeader />
      <PricingPageContent currentPlan={currentPlan} authenticated={!!user} />
    </div>
  );
}
