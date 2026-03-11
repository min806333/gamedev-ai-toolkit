import { getRevenueSummary } from "@/lib/admin-console";

export const dynamic = "force-dynamic";

export default async function InternalConsoleRevenuePage() {
  const revenue = await getRevenueSummary();

  return (
    <div className="space-y-6">
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Active subscriptions" value={String(revenue.activeSubscriptions)} />
        <MetricCard label="Estimated MRR" value={`$${revenue.monthlyRevenue}`} />
        {revenue.byPlan.map((plan) => (
          <MetricCard key={plan.plan} label={`${plan.plan.toUpperCase()} subscribers`} value={String(plan.count)} />
        ))}
      </section>

      <section className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-5">
        <h2 className="text-lg font-semibold text-white">Subscription revenue</h2>
        <div className="mt-4 space-y-3">
          {revenue.byPlan.map((plan) => (
            <div key={plan.plan} className="rounded-xl border border-zinc-800 bg-zinc-900/70 px-4 py-3">
              <div className="text-sm font-medium text-white">{plan.plan.toUpperCase()}</div>
              <div className="mt-1 text-xs text-zinc-400">
                {plan.count} subscribers | ${plan.monthlyRevenue}/month
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

