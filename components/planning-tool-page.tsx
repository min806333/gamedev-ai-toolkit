"use client";

import { ToolRenderer } from "@/components/generator/ToolRenderer";

type PlanningTool = "gdd" | "ui-ux-planning" | "system-design" | "mvp-roadmap";

function getToolId(tool: PlanningTool) {
  switch (tool) {
    case "gdd":
      return "gdd" as const;
    case "ui-ux-planning":
      return "ui-ux-plan" as const;
    case "system-design":
      return "system-design" as const;
    case "mvp-roadmap":
      return "mvp-roadmap" as const;
  }
}

export function PlanningToolPage({ tool }: { tool: PlanningTool }) {
  return <ToolRenderer toolId={getToolId(tool)} />;
}
