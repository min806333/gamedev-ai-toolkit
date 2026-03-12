import { formatAdminPlan, getRevenueSummary } from "@/lib/admin-console";

export const dynamic = "force-dynamic";

export default async function InternalConsoleRevenuePage() {
  const revenue = await getRevenueSummary();

  return (
    <div className="space-y-6">
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="활성 구독" value={String(revenue.activeSubscriptions)} />
        <MetricCard label="예상 MRR" value={`$${revenue.monthlyRevenue}`} />
        {revenue.byPlan.map((plan) => (
          <MetricCard key={plan.plan} label={`${formatAdminPlan(plan.plan)} 구독자`} value={String(plan.count)} />
        ))}
      </section>

      <section className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-5">
        <h2 className="text-lg font-semibold break-keep text-white">구독 매출</h2>
        <div className="mt-4 space-y-3">
          {revenue.byPlan.map((plan) => (
            <div key={plan.plan} className="rounded-xl border border-zinc-800 bg-zinc-900/70 px-4 py-3">
              <div className="text-sm font-medium break-keep text-white">{formatAdminPlan(plan.plan)}</div>
              <div className="mt-1 text-xs text-zinc-400">
                {plan.count}명 | 월 ${plan.monthlyRevenue}
              </div>
            </div>
          ))}
        </div>
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
