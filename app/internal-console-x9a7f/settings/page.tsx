import { getSettingsSummary } from "@/lib/admin-console";

export const dynamic = "force-dynamic";

export default async function InternalConsoleSettingsPage() {
  const settings = getSettingsSummary();

  return (
    <section className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-5">
      <h2 className="text-lg font-semibold break-keep text-white">설정</h2>
      <p className="mt-2 text-sm break-keep text-zinc-500">운영 환경과 인프라 준비 상태를 빠르게 확인하는 영역입니다.</p>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {settings.map((setting) => (
          <div key={setting.label} className="rounded-xl border border-zinc-800 bg-zinc-900/70 px-4 py-3">
            <div className="text-sm font-medium break-keep text-white">{setting.label}</div>
            <div className="mt-1 text-xs uppercase tracking-[0.2em] text-zinc-500">{setting.value}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
