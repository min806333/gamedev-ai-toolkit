import { getSettingsSummary } from "@/lib/admin-console";

export const dynamic = "force-dynamic";

export default async function InternalConsoleSettingsPage() {
  const settings = getSettingsSummary();

  return (
    <section className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-5">
      <h2 className="text-lg font-semibold text-white">Settings</h2>
      <p className="mt-2 text-sm text-zinc-500">Environment and infrastructure readiness checks for production.</p>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {settings.map((setting) => (
          <div key={setting.label} className="rounded-xl border border-zinc-800 bg-zinc-900/70 px-4 py-3">
            <div className="text-sm font-medium text-white">{setting.label}</div>
            <div className="mt-1 text-xs uppercase tracking-[0.2em] text-zinc-500">{setting.value}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

