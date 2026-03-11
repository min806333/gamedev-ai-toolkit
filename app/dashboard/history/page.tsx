import { GenerationsHistory } from "@/components/generations-history";
import { requireAuthenticatedUser } from "@/lib/auth/session";
import { createAdminClient } from "@/lib/supabase/admin";

export default async function DashboardHistoryPage({
  searchParams
}: {
  searchParams?: { tool?: string };
}) {
  const admin = createAdminClient();
  const user = await requireAuthenticatedUser("/login");

  const activeFilter = searchParams?.tool ?? "all";
  let query = admin
    .from("generations")
    .select("id, tool, prompt, result, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (activeFilter !== "all") {
    query = query.eq("tool", activeFilter);
  }

  const { data: generations } = await query;

  return <GenerationsHistory activeFilter={activeFilter} generations={generations ?? null} />;
}

