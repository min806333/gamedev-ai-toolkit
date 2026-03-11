import Link from "next/link";
import { ArrowRight, FileText, LayoutTemplate, Lightbulb, Network, ScrollText, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { LANDING_TOOL_IDS, getToolConfig } from "@/lib/tools/tool-config";

const TOOL_ICONS = {
  idea: Lightbulb,
  "unity-script": ScrollText,
  ui: LayoutTemplate,
  gdd: FileText,
  "system-design": Network,
  "mvp-roadmap": Sparkles
} as const;

const TOOL_BODIES = {
  idea: "Turn a genre, platform, and theme into a polished gameplay concept.",
  "unity-script": "Create gameplay systems and C# scripts with comments and integration notes.",
  ui: "Generate HUD structures, menu hierarchies, and visual UX direction.",
  gdd: "Draft full game design documents with scope, loops, and production risks.",
  "system-design": "Map progression, economy, ranking, rewards, and live systems.",
  "mvp-roadmap": "Break features into an execution plan your team can actually ship."
} as const;

export function ToolsGrid() {
  const tools = LANDING_TOOL_IDS.map((toolId) => {
    const tool = getToolConfig(toolId);

    return {
      href: tool.route,
      icon: TOOL_ICONS[toolId],
      title: tool.label,
      body: TOOL_BODIES[toolId]
    };
  });

  return (
    <section id="tools" className="mx-auto max-w-7xl px-6 py-20">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <p className="text-sm uppercase tracking-[0.24em] text-[color:var(--foreground)]/45">Tools</p>
          <h2 className="mt-3 font-display text-4xl font-semibold text-[color:var(--foreground)]">
            Every workflow from concept to roadmap
          </h2>
        </div>
        <Link href="/dashboard" className="text-sm text-[color:var(--foreground)]/60 transition hover:text-[color:var(--foreground)]">
          Open the full toolkit
        </Link>
      </div>
      <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {tools.map((tool) => (
          <Link key={tool.href} href={tool.href}>
            <Card className="group h-full rounded-[28px] border-[color:var(--border)] bg-[color:var(--card)] p-6 transition hover:-translate-y-1 hover:bg-[color:var(--card-strong)]">
              <tool.icon className="h-5 w-5 text-[color:var(--foreground)]/82" />
              <h3 className="mt-5 text-xl font-semibold text-[color:var(--foreground)]">{tool.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[color:var(--foreground)]/62">{tool.body}</p>
              <div className="mt-6 flex items-center text-sm text-[color:var(--foreground)]/72">
                Open tool
                <ArrowRight className="ml-2 h-4 w-4 transition group-hover:translate-x-1" />
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
