"use client";

import { useLanguage } from "@/components/language-provider";
import { Card } from "@/components/ui/card";
import { getLandingMessages } from "@/lib/landing-messages";

export function Examples() {
  const { language } = useLanguage();
  const copy = getLandingMessages(language);

  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="max-w-2xl">
        <p className="text-sm uppercase tracking-[0.24em] text-[color:var(--foreground)]/45">{copy.examples.label}</p>
        <h2 className="mt-3 font-display text-4xl font-semibold break-keep text-[color:var(--foreground)]">{copy.examples.title}</h2>
      </div>
      <div className="mt-10 grid gap-5 lg:grid-cols-3">
        {copy.examples.items.map((example) => (
          <Card key={example.title} className="rounded-[28px] border-[color:var(--border)] bg-[color:var(--card)] p-6">
            <p className="text-sm uppercase tracking-[0.24em] text-[color:var(--foreground)]/42">{example.label}</p>
            <h3 className="mt-4 text-xl font-semibold break-keep text-[color:var(--foreground)]">{example.title}</h3>
            <pre className="mt-5 overflow-x-auto rounded-2xl border border-[color:var(--border)] bg-black/20 p-4 text-sm leading-7 text-[color:var(--foreground)]/76">
              {example.body}
            </pre>
          </Card>
        ))}
      </div>
    </section>
  );
}
