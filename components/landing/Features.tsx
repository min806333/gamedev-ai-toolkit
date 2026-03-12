"use client";

import { Binary, LayoutTemplate, ScrollText, Zap } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { Card } from "@/components/ui/card";
import { getLandingMessages } from "@/lib/landing-messages";

const FEATURE_ICONS = [Zap, LayoutTemplate, Binary, ScrollText] as const;

export function Features() {
  const { language } = useLanguage();
  const copy = getLandingMessages(language);

  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="max-w-2xl">
        <p className="text-sm uppercase tracking-[0.24em] text-[color:var(--foreground)]/45">{copy.features.label}</p>
        <h2 className="mt-3 font-display text-4xl font-semibold break-keep text-[color:var(--foreground)]">{copy.features.title}</h2>
      </div>
      <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {copy.features.items.map((feature, index) => {
          const Icon = FEATURE_ICONS[index];

          return (
            <Card key={feature.title} className="rounded-[28px] border-[color:var(--border)] bg-[color:var(--card)] p-6">
              <Icon className="h-5 w-5 text-[color:var(--foreground)]/85" />
              <h3 className="mt-5 text-xl font-semibold break-keep text-[color:var(--foreground)]">{feature.title}</h3>
              <p className="mt-3 text-sm break-keep leading-relaxed text-[color:var(--foreground)]/62">{feature.body}</p>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
