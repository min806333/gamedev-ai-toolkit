"use client";

import Link from "next/link";
import { ArrowRight, FileText, LayoutTemplate, Lightbulb, Network, ScrollText, Sparkles } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { Card } from "@/components/ui/card";
import { getLandingMessages } from "@/lib/landing-messages";
import { LANDING_TOOL_IDS, getToolConfig } from "@/lib/tools/tool-config";

const TOOL_ICONS = {
  idea: Lightbulb,
  "unity-script": ScrollText,
  ui: LayoutTemplate,
  gdd: FileText,
  "system-design": Network,
  "mvp-roadmap": Sparkles
} as const;

export function ToolsGrid() {
  const { language } = useLanguage();
  const copy = getLandingMessages(language);
  const tools = LANDING_TOOL_IDS.map((toolId, index) => {
    const tool = getToolConfig(toolId);
    const toolCopy = copy.tools.items[index];

    return {
      href: tool.route,
      icon: TOOL_ICONS[toolId],
      title: toolCopy.title,
      body: toolCopy.description
    };
  });

  return (
    <section id="tools" className="mx-auto max-w-7xl px-6 py-20">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <p className="text-sm uppercase tracking-[0.24em] text-[color:var(--foreground)]/45">{copy.tools.label}</p>
          <h2 className="mt-3 font-display text-4xl font-semibold break-keep text-[color:var(--foreground)]">{copy.tools.title}</h2>
        </div>
        <Link href="/dashboard" className="text-sm break-keep text-[color:var(--foreground)]/60 transition hover:text-[color:var(--foreground)]">
          {copy.tools.dashboardCta}
        </Link>
      </div>
      <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {tools.map((tool) => (
          <Link key={tool.href} href={tool.href} className="min-w-0">
            <Card className="group h-full min-w-0 rounded-[28px] border-[color:var(--border)] bg-[color:var(--card)] p-6 transition hover:-translate-y-1 hover:bg-[color:var(--card-strong)]">
              <tool.icon className="h-5 w-5 text-[color:var(--foreground)]/82" />
              <h3 className="mt-5 text-xl font-semibold break-keep text-[color:var(--foreground)]">{tool.title}</h3>
              <p className="mt-3 text-sm break-keep leading-relaxed text-[color:var(--foreground)]/62">{tool.body}</p>
              <div className="mt-6 flex items-center text-sm break-keep text-[color:var(--foreground)]/72">
                {copy.tools.openTool}
                <ArrowRight className="ml-2 h-4 w-4 shrink-0 transition group-hover:translate-x-1" />
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
