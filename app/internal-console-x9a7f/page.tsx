import type { ReactNode } from "react";
import { formatAdminDate, formatAdminLogStatus, formatAdminPlan, formatAdminSubscriptionStatus, formatAdminTool, getAdminOverview } from "@/lib/admin-console";

export const dynamic = "force-dynamic";

export default async function InternalConsoleOverviewPage() {
  const overview = await getAdminOverview();

  return (
    <div className="space-y-8">
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="전체 사용자" value={String(overview.totalUsers)} />
        <MetricCard label="활성 구독" value={String(overview.activeSubscriptions)} />
        <MetricCard label="오늘 AI 생성" value={String(overview.aiGenerationsToday)} />
        <MetricCard label="예상 월 매출" value={`$${overview.monthlyRevenue}`} />
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <Panel title="최근 가입 사용자">
          <div className="space-y-3">
            {overview.latestUsers.map((user) => (
              <div key={user.id} className="rounded-xl border border-zinc-800 bg-zinc-900/70 px-4 py-3">
                <div className="text-sm font-medium text-white">{user.email}</div>
                <div className="mt-1 text-xs break-keep text-zinc-400">
                  {formatAdminPlan(user.plan)} | {formatAdminSubscriptionStatus(user.subscription_status)} | {formatAdminDate(user.created_at)}
                </div>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="최근 사용 로그">
          <div className="space-y-3">
            {overview.latestUsage.map((entry) => (
              <div key={entry.id} className="rounded-xl border border-zinc-800 bg-zinc-900/70 px-4 py-3">
                <div className="flex items-center justify-between gap-3 text-sm text-white">
                  <span className="break-keep">{formatAdminTool(entry.tool)}</span>
                  <span className="text-xs uppercase tracking-[0.2em] text-zinc-500">{formatAdminLogStatus(entry.status)}</span>
                </div>
                <div className="mt-1 text-xs text-zinc-400">
                  {entry.user_id} | {entry.provider ?? "미상"} | {(entry.total_tokens ?? 0).toLocaleString()} 토큰
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
      <h2 className="text-lg font-semibold break-keep text-white">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

