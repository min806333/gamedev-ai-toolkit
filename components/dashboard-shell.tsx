import { DashboardShellClient } from "@/components/dashboard-shell-client";
import { getCurrentUser } from "@/lib/auth/session";
import { ensureUserProfile, getUsageSummary } from "@/lib/usage";

export async function DashboardShell({
  children
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  const plan = user
    ? await (async () => {
        await ensureUserProfile(user);
        const usage = await getUsageSummary(user.id);
        return usage.plan;
      })()
    : "free";

  return <DashboardShellClient userEmail={user?.email} userPlan={plan}>{children}</DashboardShellClient>;
}
