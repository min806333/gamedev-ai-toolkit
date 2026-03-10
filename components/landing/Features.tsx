import { Binary, LayoutTemplate, ScrollText, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";

const features = [
  {
    icon: Zap,
    title: "Fast Ideation",
    body: "Move from vague concept to testable design direction in minutes instead of days."
  },
  {
    icon: LayoutTemplate,
    title: "UI-First Planning",
    body: "Generate HUDs, menu structures, and screen flows before production starts."
  },
  {
    icon: Binary,
    title: "Engine-Aware Code",
    body: "Produce starter gameplay code and Unity scripts with implementation context."
  },
  {
    icon: ScrollText,
    title: "Production Docs",
    body: "Build GDDs, system design docs, and MVP roadmaps without starting from zero."
  }
];

export function Features() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="max-w-2xl">
        <p className="text-sm uppercase tracking-[0.24em] text-[color:var(--foreground)]/45">Features</p>
        <h2 className="mt-3 font-display text-4xl font-semibold text-[color:var(--foreground)]">
          Built for developers shipping real games
        </h2>
      </div>
      <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {features.map((feature) => (
          <Card key={feature.title} className="rounded-[28px] border-[color:var(--border)] bg-[color:var(--card)] p-6">
            <feature.icon className="h-5 w-5 text-[color:var(--foreground)]/85" />
            <h3 className="mt-5 text-xl font-semibold text-[color:var(--foreground)]">{feature.title}</h3>
            <p className="mt-3 text-sm leading-7 text-[color:var(--foreground)]/62">{feature.body}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}
