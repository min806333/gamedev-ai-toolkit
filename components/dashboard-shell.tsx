import { createClient } from "@/lib/supabase/server";
import { DashboardShellClient } from "@/components/dashboard-shell-client";

export async function DashboardShell({
  children
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  return <DashboardShellClient userEmail={user?.email}>{children}</DashboardShellClient>;
}
