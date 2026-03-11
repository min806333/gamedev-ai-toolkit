import { getAdminSubscriptions } from "@/lib/admin-console";

export const dynamic = "force-dynamic";

export default async function InternalConsoleSubscriptionsPage() {
  const subscriptions = await getAdminSubscriptions();

  return (
    <section className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-5">
      <h2 className="text-lg font-semibold text-white">Subscriptions</h2>
      <div className="mt-4 space-y-3">
        {subscriptions.length ? (
          subscriptions.map((entry) => (
            <div key={entry.id} className="rounded-xl border border-zinc-800 bg-zinc-900/70 px-4 py-3">
              <div className="text-sm font-medium text-white">{entry.email}</div>
              <div className="mt-1 text-xs text-zinc-400">
                {entry.plan} | {entry.subscription_status ?? "inactive"} | {entry.stripe_customer_id ?? "no customer"}
              </div>
              <div className="mt-1 text-xs text-zinc-500">
                Renews: {entry.current_period_end ? new Date(entry.current_period_end).toLocaleString() : "n/a"}
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-zinc-500">No subscriptions found.</p>
        )}
      </div>
    </section>
  );
}

