import { PlanningToolPage } from "@/components/planning-tool-page";
import { PremiumToolGate } from "@/components/premium-tool-gate";
import { createClient } from "@/lib/supabase/server";
import { getUsageSummary } from "@/lib/usage";

export default async function SystemDesignToolPage() {
  const supabase = createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();
  const usage = user ? await getUsageSummary(user.id) : { plan: "free" as const };

  return (
    <PremiumToolGate
      plan={usage.plan}
      requiredPlan="pro"
      message=""
      messageKey="systemDesignMessage"
    >
      <PlanningToolPage tool="system-design" />
    </PremiumToolGate>
  );
}
