import { SiteHeaderClient } from "@/components/site-header-client";
import { getCurrentUser } from "@/lib/auth/session";

export async function SiteHeader() {
  const user = await getCurrentUser();

  return <SiteHeaderClient isAuthenticated={!!user} />;
}
