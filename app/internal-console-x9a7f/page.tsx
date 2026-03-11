import type { ReactNode } from "react";
import { getAdminOverview } from "@/lib/admin-console";

export const dynamic = "force-dynamic";

export default async function InternalConsoleOverviewPage() {
  const overview = await getAdminOverview();

  return (
    <div className="space-y-8">
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Total users" value={String(overview.totalUsers)} />
        <MetricCard label="Active subscriptions" value={String(overview.activeSubscriptions)} />
        <MetricCard label="AI generations today" value={String(overview.aiGenerationsToday)} />
        <MetricCard label="Monthly revenue" value={`$${overview.monthlyRevenue}`} />
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <Panel title="Latest users">
          <div className="space-y-3">
            {overview.latestUsers.map((user) => (
              <div key={user.id} className="rounded-xl border border-zinc-800 bg-zinc-900/70 px-4 py-3">
                <div className="text-sm font-medium text-white">{user.email}</div>
                <div className="mt-1 text-xs text-zinc-400">
                  {user.plan} | {user.subscription_status ?? "inactive"} | {new Date(user.created_at).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Latest usage">
          <div className="space-y-3">
            {overview.latestUsage.map((entry) => (
              <div key={entry.id} className="rounded-xl border border-zinc-800 bg-zinc-900/70 px-4 py-3">
                <div className="flex items-center justify-between gap-3 text-sm text-white">
                  <span>{entry.tool}</span>
                  <span className="text-xs uppercase tracking-[0.2em] text-zinc-500">{entry.status}</span>
                </div>
                <div className="mt-1 text-xs text-zinc-400">
                  {entry.user_id} | {entry.provider ?? "unknown"} | {(entry.total_tokens ?? 0).toLocaleString()} tokens
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </section>
    </div>
  );
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-5">
      <div className="text-xs uppercase tracking-[0.22em] text-zinc-500">{label}</div>
      <div className="mt-3 text-3xl font-semibold text-white">{value}</div>
    </div>
  );
}

function Panel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-5">
      <h2 className="text-lg font-semibold text-white">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

