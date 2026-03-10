import { redirect } from "next/navigation";
import { GenerationsHistory } from "@/components/generations-history";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

export default async function GenerationsHistoryPage({
  searchParams
}: {
  searchParams?: { tool?: string };
}) {
  const supabase = createClient();
  const admin = createAdminClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

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
