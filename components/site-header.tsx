import { createClient } from "@/lib/supabase/server";
import { SiteHeaderClient } from "@/components/site-header-client";

export async function SiteHeader() {
  const supabase = createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  return <SiteHeaderClient isAuthenticated={!!user} />;
}
