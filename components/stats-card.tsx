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
    <Card className="border-[color:var(--border)] bg-[color:var(--background)]/35 p-6">
      <p className="text-sm text-[color:var(--foreground)]/45">{label}</p>
      <h3 className="mt-4 text-4xl font-semibold text-[color:var(--foreground)]">{value}</h3>
      <p className="mt-2 text-sm text-[color:var(--foreground)]/55">{hint}</p>
    </Card>
  );
}
