import { createAdminClient } from "@/lib/supabase/admin";

export async function ensureUserProfile(user: { id: string; email?: string | null }) {
  const supabase = createAdminClient();
  const { data: existing } = await supabase
    .from("users")
    .select("id")
    .eq("id", user.id)
    .maybeSingle();

  if (!existing) {
    await supabase.from("users").insert({
      id: user.id,
      email: user.email,
      plan: "free",
      stripe_customer_id: null,
      subscription_status: "inactive"
    });
  }
}
