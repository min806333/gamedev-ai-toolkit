import { PlanningToolPage } from "@/components/planning-tool-page";
import { PremiumToolGate } from "@/components/premium-tool-gate";
import { createClient } from "@/lib/supabase/server";
import { getUsageSummary } from "@/lib/usage";

export default async function MvpRoadmapToolPage() {
  const supabase = createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();
  const usage = user ? await getUsageSummary(user.id) : { plan: "free" as const };

  return (
    <PremiumToolGate
      plan={usage.plan}
      requiredPlan="studio"
      message=""
      messageKey="mvpRoadmapMessage"
    >
      <PlanningToolPage tool="mvp-roadmap" />
    </PremiumToolGate>
  );
}
