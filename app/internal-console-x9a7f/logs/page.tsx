import { getAdminLogs } from "@/lib/admin-console";

export const dynamic = "force-dynamic";

export default async function InternalConsoleLogsPage() {
  const logs = await getAdminLogs();

  return (
    <div className="grid gap-6 xl:grid-cols-2">
      <section className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-5">
        <h2 className="text-lg font-semibold text-white">Usage logs</h2>
        <div className="mt-4 space-y-3">
          {logs.usageLogs.length ? (
            logs.usageLogs.map((entry) => (
              <div key={entry.id} className="rounded-xl border border-zinc-800 bg-zinc-900/70 px-4 py-3">
                <div className="flex items-center justify-between gap-3 text-sm text-white">
                  <span>{entry.tool}</span>
                  <span className="text-xs uppercase tracking-[0.2em] text-zinc-500">{entry.status}</span>
                </div>
                <div className="mt-1 text-xs text-zinc-400">{entry.user_id}</div>
                <div className="mt-1 text-xs text-zinc-500">{entry.error_message ?? "No error message"}</div>
              </div>
            ))
          ) : (
            <p className="text-sm text-zinc-500">No usage logs available.</p>
          )}
        </div>
      </section>

      <section className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-5">
        <h2 className="text-lg font-semibold text-white">Stripe events</h2>
        <div className="mt-4 space-y-3">
          {logs.stripeEvents.length ? (
            logs.stripeEvents.map((entry) => (
              <div key={entry.id} className="rounded-xl border border-zinc-800 bg-zinc-900/70 px-4 py-3">
                <div className="text-sm font-medium text-white">{entry.id}</div>
                <div className="mt-1 text-xs text-zinc-500">{new Date(entry.created_at).toLocaleString()}</div>
              </div>
            ))
          ) : (
            <p className="text-sm text-zinc-500">No Stripe events recorded.</p>
          )}
        </div>
      </section>
    </div>
  );
}

