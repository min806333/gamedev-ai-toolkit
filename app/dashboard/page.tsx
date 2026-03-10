import { redirect } from "next/navigation";
import { DashboardOverview } from "@/components/dashboard-overview";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { ensureUserProfile, getUsageSummary } from "@/lib/usage";

export default async function DashboardPage() {
  const supabase = createClient();
  const admin = createAdminClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

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
