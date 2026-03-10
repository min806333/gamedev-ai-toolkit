"use client";

import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { CopyResultButton } from "@/components/copy-result-button";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/components/language-provider";

export function GenerationsHistory({
  activeFilter,
  generations
}: {
  activeFilter: string;
  generations: Array<{ id: string; tool: string; prompt: string; result: string; created_at: string }> | null;
}) {
  const { t } = useLanguage();

  const filters = [
    { label: t.history.all, value: "all" },
    { label: t.history.idea, value: "idea" },
    { label: t.history.ui, value: "ui" },
    { label: t.history.code, value: "code" },
    { label: t.history.unity, value: "unity-script" },
    { label: t.history.gdd, value: "gdd" },
    { label: t.history.uiUxPlan, value: "ui-ux-plan" },
    { label: t.history.systemDesign, value: "system-design" },
    { label: t.history.mvpRoadmap, value: "mvp-roadmap" }
  ];

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm uppercase tracking-[0.24em] text-[color:var(--foreground)]/45">{t.history.label}</p>
        <h1 className="mt-3 text-4xl font-semibold text-[color:var(--foreground)]">{t.history.title}</h1>
        <p className="mt-3 max-w-3xl text-[color:var(--foreground)]/60">{t.history.description}</p>
      </div>

      <div className="flex flex-wrap gap-3">
        {filters.map((filter) => (
          <Link
            key={filter.value}
            href={filter.value === "all" ? "/dashboard/generations" : `/dashboard/generations?tool=${filter.value}`}
            className={`rounded-full border px-4 py-2 text-sm transition ${
              activeFilter === filter.value
                ? "border-[color:var(--foreground)] bg-[color:var(--foreground)] text-[color:var(--background)]"
                : "border-[color:var(--border)] bg-[color:var(--card)] text-[color:var(--foreground)]/75 hover:bg-[color:var(--card-strong)]"
            }`}
          >
            {filter.label}
          </Link>
        ))}
      </div>

      <div className="space-y-6">
        {generations?.length ? (
          generations.map((item) => (
            <Card key={item.id} className="border-[color:var(--border)] bg-[color:var(--card)] p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-[color:var(--foreground)]/45">{item.tool}</p>
                  <p className="mt-2 text-sm text-[color:var(--foreground)]/45">
                    {new Date(item.created_at).toLocaleString()}
                  </p>
                </div>
                <CopyResultButton text={item.result} />
              </div>

              <div className="mt-6 grid gap-6 lg:grid-cols-2">
                <div className="rounded-3xl border border-[color:var(--border)] bg-[color:var(--background)]/35 p-5">
                  <h2 className="text-sm font-medium uppercase tracking-[0.2em] text-[color:var(--foreground)]/45">
                    {t.history.prompt}
                  </h2>
                  <pre className="mt-4 whitespace-pre-wrap text-sm leading-7 text-[color:var(--foreground)]/75">
                    {item.prompt}
                  </pre>
                </div>
                <div className="max-h-[420px] overflow-y-auto rounded-3xl border border-[color:var(--border)] bg-[color:var(--background)]/35 p-5">
                  <h2 className="text-sm font-medium uppercase tracking-[0.2em] text-[color:var(--foreground)]/45">
                    {t.history.result}
                  </h2>
                  <div className="prose prose-sm mt-4 max-w-none text-[color:var(--foreground)]/80 prose-headings:text-[color:var(--foreground)] prose-p:text-[color:var(--foreground)]/80 prose-li:text-[color:var(--foreground)]/80 prose-strong:text-[color:var(--foreground)]">
                    <ReactMarkdown>{item.result}</ReactMarkdown>
                  </div>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <Card className="border-[color:var(--border)] bg-[color:var(--card)] p-6 text-sm text-[color:var(--foreground)]/55">
            {t.history.empty}
          </Card>
        )}
      </div>
    </div>
  );
}
