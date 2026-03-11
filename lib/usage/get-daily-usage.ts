import { startOfDay } from "@/lib/usageDate";
import { createAdminClient } from "@/lib/supabase/admin";

export async function getDailyUsage(userId: string) {
  const supabase = createAdminClient();
  const today = startOfDay();
  const { count } = await supabase
    .from("generations")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId)
    .gte("created_at", today);

  return count ?? 0;
}
