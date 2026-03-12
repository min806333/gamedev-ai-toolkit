"use client";

import { useEffect, useState } from "react";
import { ToolActivityPanel } from "@/components/generator/ToolActivityPanel";
import { ToolForm } from "@/components/tool-form";
import { useLanguage } from "@/components/language-provider";
import { getToolFormCopy } from "@/lib/tools/tool-content";
import { getToolConfig } from "@/lib/tools/tool-config";
import type { Plan, ToolType } from "@/lib/types";

type ActivityData = {
  usage: { plan: Plan; todayCount: number; remaining: number; limit: string | number };
  generations: Array<{ id: string; tool: string; created_at: string; prompt: string }> | null;
};

export function ToolRenderer({
  toolId,
  initialUsage,
  initialGenerations
}: {
  toolId: ToolType;
  initialUsage?: ActivityData["usage"];
  initialGenerations?: ActivityData["generations"];
}) {
  const { t, language } = useLanguage();
  const copy = getToolFormCopy(toolId, t, language);
  const [activity, setActivity] = useState<ActivityData | null>(
    initialUsage
      ? {
          usage: initialUsage,
          generations: initialGenerations ?? null
        }
      : null
  );

  async function refreshActivity() {
    try {
      const response = await fetch("/api/account/activity?limit=5", {
        method: "GET",
        cache: "no-store"
      });

      if (!response.ok) {
        return;
      }

      const data = (await response.json()) as ActivityData;
      setActivity({
        usage: data.usage,
        generations: data.generations ?? []
      });
    } catch (error) {
      console.error("Tool activity refresh failed:", error);
    }
  }

  useEffect(() => {
    if (activity) {
      return;
    }

    void refreshActivity();
  }, [activity]);

  return (
    <div className="space-y-8">
      <ToolForm
        title={copy.title}
        description={copy.description}
        endpoint={getToolConfig(toolId).apiRoute}
        fields={copy.fields}
        templates={copy.templates}
        onGenerationComplete={refreshActivity}
      />
      {activity ? <ToolActivityPanel usage={activity.usage} generations={activity.generations} /> : null}
    </div>
  );
}
