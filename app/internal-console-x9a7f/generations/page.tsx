import { getAdminGenerations } from "@/lib/admin-console";

export const dynamic = "force-dynamic";

export default async function InternalConsoleGenerationsPage() {
  const generations = await getAdminGenerations();

  return (
    <section className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-5">
      <h2 className="text-lg font-semibold text-white">Latest Generations</h2>
      <div className="mt-4 overflow-x-auto">
        <table className="min-w-full text-left text-sm text-zinc-300">
          <thead className="text-xs uppercase tracking-[0.18em] text-zinc-500">
            <tr>
              <th className="pb-3">User</th>
              <th className="pb-3">Tool</th>
              <th className="pb-3">Prompt</th>
              <th className="pb-3">Model</th>
              <th className="pb-3">Created</th>
            </tr>
          </thead>
          <tbody>
            {generations.map((entry) => (
              <tr key={entry.id} className="border-t border-zinc-900 align-top">
                <td className="py-3 pr-4">{entry.user_id}</td>
                <td className="py-3 pr-4">{entry.tool}</td>
                <td className="py-3 pr-4">
                  <div className="max-w-xl whitespace-pre-wrap text-zinc-300">{entry.prompt}</div>
                </td>
                <td className="py-3 pr-4">{entry.model ?? "default"}</td>
                <td className="py-3">{new Date(entry.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

