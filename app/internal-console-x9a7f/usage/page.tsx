import { formatAdminPlan, getAdminUsageByUser } from "@/lib/admin-console";

export const dynamic = "force-dynamic";

export default async function InternalConsoleUsagePage() {
  const usage = await getAdminUsageByUser();

  return (
    <section className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-5">
      <h2 className="text-lg font-semibold break-keep text-white">AI 사용량</h2>
      <div className="mt-4 overflow-x-auto">
        <table className="min-w-full text-left text-sm text-zinc-300">
          <thead className="text-xs uppercase tracking-[0.18em] text-zinc-500">
            <tr>
              <th className="pb-3">사용자</th>
              <th className="pb-3">플랜</th>
              <th className="pb-3">요청 수</th>
              <th className="pb-3">성공</th>
              <th className="pb-3">차단</th>
              <th className="pb-3">실패</th>
              <th className="pb-3">제한됨</th>
              <th className="pb-3">토큰</th>
            </tr>
          </thead>
          <tbody>
            {usage.map((entry) => (
              <tr key={entry.id} className="border-t border-zinc-900">
                <td className="py-3">{entry.email}</td>
                <td className="py-3 break-keep">{formatAdminPlan(entry.plan)}</td>
                <td className="py-3">{entry.requests.toLocaleString()}</td>
                <td className="py-3">{entry.success.toLocaleString()}</td>
                <td className="py-3">{entry.blocked.toLocaleString()}</td>
                <td className="py-3">{entry.failed.toLocaleString()}</td>
                <td className="py-3">{entry.rateLimited.toLocaleString()}</td>
                <td className="py-3">{entry.tokens.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
