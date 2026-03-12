import { formatAdminDate, formatAdminTool, getAdminGenerations } from "@/lib/admin-console";

export const dynamic = "force-dynamic";

export default async function InternalConsoleGenerationsPage() {
  const generations = await getAdminGenerations();

  return (
    <section className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-5">
      <h2 className="text-lg font-semibold break-keep text-white">최근 생성 기록</h2>
      <div className="mt-4 overflow-x-auto">
        <table className="min-w-full text-left text-sm text-zinc-300">
          <thead className="text-xs uppercase tracking-[0.18em] text-zinc-500">
            <tr>
              <th className="pb-3">사용자 ID</th>
              <th className="pb-3">도구</th>
              <th className="pb-3">프롬프트</th>
              <th className="pb-3">모델</th>
              <th className="pb-3">생성일</th>
            </tr>
          </thead>
          <tbody>
            {generations.map((entry) => (
              <tr key={entry.id} className="border-t border-zinc-900 align-top">
                <td className="py-3 pr-4">{entry.user_id}</td>
                <td className="py-3 pr-4 break-keep">{formatAdminTool(entry.tool)}</td>
                <td className="py-3 pr-4">
                  <div className="max-w-xl whitespace-pre-wrap break-words text-zinc-300">{entry.prompt}</div>
                </td>
                <td className="py-3 pr-4">{entry.model ?? "기본값"}</td>
                <td className="py-3">{formatAdminDate(entry.created_at)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
