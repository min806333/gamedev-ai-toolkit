import { formatAdminDate, formatAdminLogStatus, formatAdminTool, getAdminLogs } from "@/lib/admin-console";

export const dynamic = "force-dynamic";

export default async function InternalConsoleLogsPage() {
  const logs = await getAdminLogs();

  return (
    <div className="grid gap-6 xl:grid-cols-2">
      <section className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-5">
        <h2 className="text-lg font-semibold break-keep text-white">사용 로그</h2>
        <div className="mt-4 space-y-3">
          {logs.usageLogs.length ? (
            logs.usageLogs.map((entry) => (
              <div key={entry.id} className="rounded-xl border border-zinc-800 bg-zinc-900/70 px-4 py-3">
                <div className="flex items-center justify-between gap-3 text-sm text-white">
                  <span className="break-keep">{formatAdminTool(entry.tool)}</span>
                  <span className="text-xs uppercase tracking-[0.2em] text-zinc-500">{formatAdminLogStatus(entry.status)}</span>
                </div>
                <div className="mt-1 text-xs text-zinc-400">{entry.user_id}</div>
                <div className="mt-1 text-xs break-keep text-zinc-500">{entry.error_message ?? "오류 메시지 없음"}</div>
              </div>
            ))
          ) : (
            <p className="text-sm break-keep text-zinc-500">표시할 사용 로그가 없습니다.</p>
          )}
        </div>
      </section>

      <section className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-5">
        <h2 className="text-lg font-semibold break-keep text-white">Stripe 이벤트</h2>
        <div className="mt-4 space-y-3">
          {logs.stripeEvents.length ? (
            logs.stripeEvents.map((entry) => (
              <div key={entry.id} className="rounded-xl border border-zinc-800 bg-zinc-900/70 px-4 py-3">
                <div className="text-sm font-medium text-white">{entry.id}</div>
                <div className="mt-1 text-xs text-zinc-500">{formatAdminDate(entry.created_at)}</div>
              </div>
            ))
          ) : (
            <p className="text-sm break-keep text-zinc-500">기록된 Stripe 이벤트가 없습니다.</p>
          )}
        </div>
      </section>
    </div>
  );
}
