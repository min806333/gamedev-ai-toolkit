"use client";

import { RecentGenerations } from "@/components/dashboard/RecentGenerations";
import { UsageCard } from "@/components/dashboard/UsageCard";
import type { Plan } from "@/lib/types";

export function ToolActivityPanel({
  usage,
  generations
}: {
  usage: { plan: Plan; todayCount: number; remaining: number; limit: string | number };
  generations: Array<{ id: string; tool: string; created_at: string; prompt: string }> | null;
}) {
  return (
    <div className="mt-8 space-y-6">
      <UsageCard usage={usage} />
      <RecentGenerations generations={generations} />
    </div>
  );
}
