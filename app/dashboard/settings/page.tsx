import { SettingsPageContent } from "@/components/dashboard/SettingsPageContent";
import { requireAuthenticatedUser } from "@/lib/auth/session";
import { ensureUserProfile, getUsageSummary } from "@/lib/usage";

export default async function DashboardSettingsPage() {
  const user = await requireAuthenticatedUser("/login");

  await ensureUserProfile(user);
  const usage = await getUsageSummary(user.id);

  return <SettingsPageContent email={usage.email} plan={usage.plan} />;
}
