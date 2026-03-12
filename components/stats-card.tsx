import { Card } from "@/components/ui/card";

export function StatsCard({
  label,
  value,
  hint
}: {
  label: string;
  value: string;
  hint: string;
}) {
  return (
    <Card className="min-w-0 border-[color:var(--border)] bg-[color:var(--background)]/35 p-5 sm:p-6">
      <p className="text-sm break-keep text-[color:var(--foreground)]/45">{label}</p>
      <h3 className="mt-4 text-3xl font-semibold text-[color:var(--foreground)] sm:text-4xl">{value}</h3>
      <p className="mt-2 text-sm break-keep leading-relaxed text-[color:var(--foreground)]/55">{hint}</p>
    </Card>
  );
}
