import { redirect } from "next/navigation";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { RecentGenerations } from "@/components/dashboard/RecentGenerations";
import { UsageCard } from "@/components/dashboard/UsageCard";
import { Card } from "@/components/ui/card";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { ensureUserProfile, getUsageSummary } from "@/lib/usage";

export default async function DashboardPage() {
  const supabase = createClient();
  const admin = createAdminClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  await ensureUserProfile(user);
  const usage = await getUsageSummary(user.id);
  const { data: generations } = await admin
    .from("generations")
    .select("id, tool, created_at, prompt")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(5);

  return (
    <div className="grid gap-8">
      <DashboardHeader plan={usage.plan} userEmail={usage.email} />
      <UsageCard usage={usage} />
      <div className="grid gap-8 xl:grid-cols-[1.35fr_0.85fr]">
        <RecentGenerations generations={generations ?? null} />
        <Card className="border-[color:var(--border)] bg-[color:var(--card)] p-6">
          <p className="text-sm uppercase tracking-[0.24em] text-[color:var(--foreground)]/45">Workspace</p>
          <h2 className="mt-3 text-2xl font-semibold text-[color:var(--foreground)]">Quick access</h2>
          <div className="mt-6 grid gap-3">
            <a
              href="/tools/idea"
              className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--background)]/35 p-4 text-sm text-[color:var(--foreground)]/72 transition hover:bg-[color:var(--card-strong)]"
            >
              Game Idea Generator
            </a>
            <a
              href="/tools/unity-script"
              className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--background)]/35 p-4 text-sm text-[color:var(--foreground)]/72 transition hover:bg-[color:var(--card-strong)]"
            >
              Unity Script Generator
            </a>
            <a
              href="/pixel-art-generator"
              className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--background)]/35 p-4 text-sm text-[color:var(--foreground)]/72 transition hover:bg-[color:var(--card-strong)]"
            >
              Pixel Prompt Generator
            </a>
          </div>
        </Card>
      </div>
    </div>
  );
}
