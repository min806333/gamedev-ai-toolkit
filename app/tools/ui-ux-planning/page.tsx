import { PlanningToolPage } from "@/components/planning-tool-page";
import { PremiumToolGate } from "@/components/premium-tool-gate";
import { createClient } from "@/lib/supabase/server";
import { getUsageSummary } from "@/lib/usage";

export default async function UiUxPlanningToolPage() {
  const supabase = createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();
  const usage = user ? await getUsageSummary(user.id) : { plan: "free" as const };

  return (
    <PremiumToolGate
      plan={usage.plan}
      requiredPlan="pro"
      message="Upgrade to Pro to generate full UI/UX planning documents."
    >
      <PlanningToolPage tool="ui-ux-planning" />
    </PremiumToolGate>
  );
}
