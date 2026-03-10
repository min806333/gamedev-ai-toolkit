"use client";

import Link from "next/link";
import { ArrowRight, Code2, LayoutTemplate, Lightbulb } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function Hero() {
  const { t } = useLanguage();
  const highlights = [
    { ...t.hero.highlights[0], icon: Lightbulb },
    { ...t.hero.highlights[1], icon: LayoutTemplate },
    { ...t.hero.highlights[2], icon: Code2 }
  ];

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,170,120,0.16),transparent_26%),radial-gradient(circle_at_right,rgba(112,214,255,0.1),transparent_28%),linear-gradient(180deg,transparent_0%,rgba(0,0,0,0.1)_100%)]" />
      <div className="absolute inset-0 bg-grid bg-[size:52px_52px] opacity-20" />
      <div className="relative mx-auto flex max-w-7xl flex-col gap-12 px-6 py-20 lg:flex-row lg:items-end lg:justify-between lg:py-28">
        <div className="max-w-3xl">
          <div className="mb-6 inline-flex rounded-full border border-[color:var(--border)] bg-[color:var(--card)] px-3 py-1 text-xs uppercase tracking-[0.24em] text-[color:var(--foreground)]/60">
            {t.hero.badge}
          </div>
          <h1 className="max-w-3xl font-display text-5xl font-semibold tracking-tight text-[color:var(--foreground)] md:text-7xl">
            {t.hero.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[color:var(--foreground)]/65">{t.hero.description}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/login">
              <Button className="h-11 px-6">
                {t.nav.startFree}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/pricing">
              <Button variant="secondary" className="h-11 px-6">
                {t.hero.viewPricing}
              </Button>
            </Link>
          </div>
        </div>
        <Card className="w-full max-w-xl border-[color:var(--border)] bg-[color:var(--card)] p-6">
          <div className="space-y-4">
            {highlights.map((item) => (
              <div
                key={item.title}
                className="flex items-start gap-4 rounded-2xl border border-[color:var(--border)] bg-[color:var(--background)]/35 p-4"
              >
                <item.icon className="mt-1 h-5 w-5 text-[color:var(--foreground)]/80" />
                <div>
                  <h3 className="text-sm font-medium text-[color:var(--foreground)]">{item.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-[color:var(--foreground)]/55">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </section>
  );
}
