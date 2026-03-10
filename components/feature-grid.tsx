"use client";

import { useLanguage } from "@/components/language-provider";
import { Card } from "@/components/ui/card";

export function FeatureGrid() {
  const { t } = useLanguage();

  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="mb-10 max-w-2xl">
        <p className="text-sm uppercase tracking-[0.24em] text-[color:var(--foreground)]/45">{t.features.label}</p>
        <h2 className="mt-3 font-display text-3xl font-semibold text-[color:var(--foreground)] md:text-4xl">
          {t.features.title}
        </h2>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {t.features.items.map((feature) => (
          <Card key={feature.title} className="border-[color:var(--border)] bg-[color:var(--card)] p-6">
            <h3 className="text-lg font-medium text-[color:var(--foreground)]">{feature.title}</h3>
            <p className="mt-3 text-sm leading-7 text-[color:var(--foreground)]/60">{feature.body}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}
