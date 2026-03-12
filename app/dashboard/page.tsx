import { DashboardOverview } from "@/components/dashboard-overview";
import { requireAuthenticatedUser } from "@/lib/auth/session";
import { createAdminClient } from "@/lib/supabase/admin";
import { ensureUserProfile, getUsageSummary } from "@/lib/usage";

export default async function DashboardPage() {
  const admin = createAdminClient();
  const user = await requireAuthenticatedUser("/login");

  await ensureUserProfile(user);
  const usage = await getUsageSummary(user.id);
  const { data: generations } = await admin
    .from("generations")
    .select("id, tool, created_at, prompt")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(5);

  return <DashboardOverview usage={usage} generations={generations ?? null} />;
}
