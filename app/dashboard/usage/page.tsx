import { UsagePageContent } from "@/components/dashboard/UsagePageContent";
import { requireAuthenticatedUser } from "@/lib/auth/session";
import { ensureUserProfile, getUsageSummary } from "@/lib/usage";

export default async function DashboardUsagePage() {
  const user = await requireAuthenticatedUser("/login");

  await ensureUserProfile(user);
  const usage = await getUsageSummary(user.id);

  return <UsagePageContent usage={usage} />;
}
