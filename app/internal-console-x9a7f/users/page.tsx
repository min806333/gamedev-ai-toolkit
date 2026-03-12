import { formatAdminDate, formatAdminPlan, formatAdminRole, getAdminUsers } from "@/lib/admin-console";

export const dynamic = "force-dynamic";

export default async function InternalConsoleUsersPage() {
  const users = await getAdminUsers();

  return (
    <section className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-5">
      <h2 className="text-lg font-semibold break-keep text-white">사용자</h2>
      <div className="mt-4 overflow-x-auto">
        <table className="min-w-full text-left text-sm text-zinc-300">
          <thead className="text-xs uppercase tracking-[0.18em] text-zinc-500">
            <tr>
              <th className="pb-3">이메일</th>
              <th className="pb-3">플랜</th>
              <th className="pb-3">권한</th>
              <th className="pb-3">가입일</th>
              <th className="pb-3">AI 요청 수</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t border-zinc-900">
                <td className="py-3">{user.email}</td>
                <td className="py-3 break-keep">{formatAdminPlan(user.plan)}</td>
                <td className="py-3 break-keep">{formatAdminRole(user.role)}</td>
                <td className="py-3">{formatAdminDate(user.created_at)}</td>
                <td className="py-3">{user.aiUsage.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
