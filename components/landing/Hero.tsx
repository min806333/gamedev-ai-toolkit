"use client";

import Link from "next/link";
import { ArrowRight, Bot, Gamepad2, Layers3 } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { Button } from "@/components/ui/button";

export function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden border-b border-[color:var(--border)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,159,122,0.18),transparent_28%),radial-gradient(circle_at_top_right,rgba(112,214,255,0.14),transparent_26%),linear-gradient(180deg,transparent_0%,rgba(255,255,255,0.02)_100%)]" />
      <div className="absolute inset-0 bg-grid bg-[size:72px_72px] opacity-20" />

      <div className="relative mx-auto max-w-7xl px-6 py-24 md:py-32">
        <div className="grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border)] bg-[color:var(--card)] px-4 py-2 text-sm text-[color:var(--foreground)]/72">
              <Bot className="h-4 w-4" />
              {t.hero.badge}
            </div>
            <h1 className="mt-8 max-w-4xl font-display text-5xl font-semibold tracking-tight text-[color:var(--foreground)] md:text-7xl">
              {t.hero.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[color:var(--foreground)]/62 md:text-xl">
              {t.hero.description}
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/signup">
                <Button className="h-12 px-6 text-base">
                  {t.nav.startFree}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="#tools">
                <Button variant="secondary" className="h-12 px-6 text-base">
                  {t.nav.tools}
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-[28px] border border-[color:var(--border)] bg-[linear-gradient(160deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-6 shadow-panel sm:col-span-2">
              <div className="flex items-center justify-between">
                <span className="text-sm uppercase tracking-[0.24em] text-[color:var(--foreground)]/42">Live Output</span>
                <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-300">
                  Streaming
                </span>
              </div>
              <pre className="mt-5 overflow-hidden rounded-2xl border border-[color:var(--border)] bg-black/25 p-4 text-sm leading-7 text-[color:var(--foreground)]/78">
{`## Mission-Based Roguelite
- Midcore co-op raid loop
- Procedural level goals
- Town progression meta

## Recommended MVP
- 1 biome
- 3 weapons
- 2 boss variants`}
              </pre>
            </div>
            <div className="rounded-[28px] border border-[color:var(--border)] bg-[color:var(--card)] p-5 shadow-panel">
              <Gamepad2 className="h-5 w-5 text-orange-200" />
              <p className="mt-4 text-sm leading-7 text-[color:var(--foreground)]/70">Idea, UI, code and planning in one workspace.</p>
            </div>
            <div className="rounded-[28px] border border-[color:var(--border)] bg-[color:var(--card)] p-5 shadow-panel">
              <Layers3 className="h-5 w-5 text-cyan-200" />
              <p className="mt-4 text-sm leading-7 text-[color:var(--foreground)]/70">Structured outputs built for actual production decisions.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
