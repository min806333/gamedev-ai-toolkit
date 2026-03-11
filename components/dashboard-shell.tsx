import { DashboardShellClient } from "@/components/dashboard-shell-client";
import { getCurrentUser } from "@/lib/auth/session";

export async function DashboardShell({
  children
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  return <DashboardShellClient userEmail={user?.email}>{children}</DashboardShellClient>;
}
