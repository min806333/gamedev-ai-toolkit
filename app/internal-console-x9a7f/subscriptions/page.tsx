import { formatAdminDate, formatAdminPlan, formatAdminSubscriptionStatus, getAdminSubscriptions } from "@/lib/admin-console";

export const dynamic = "force-dynamic";

export default async function InternalConsoleSubscriptionsPage() {
  const subscriptions = await getAdminSubscriptions();

  return (
    <section className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-5">
      <h2 className="text-lg font-semibold break-keep text-white">구독</h2>
      <div className="mt-4 space-y-3">
        {subscriptions.length ? (
          subscriptions.map((entry) => (
            <div key={entry.id} className="rounded-xl border border-zinc-800 bg-zinc-900/70 px-4 py-3">
              <div className="text-sm font-medium text-white">{entry.email}</div>
              <div className="mt-1 text-xs break-keep text-zinc-400">
                {formatAdminPlan(entry.plan)} | {formatAdminSubscriptionStatus(entry.subscription_status)} | {entry.stripe_customer_id ?? "고객 ID 없음"}
              </div>
              <div className="mt-1 text-xs text-zinc-500">
                갱신일: {entry.current_period_end ? formatAdminDate(entry.current_period_end) : "없음"}
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm break-keep text-zinc-500">표시할 구독 정보가 없습니다.</p>
        )}
      </div>
    </section>
  );
}
