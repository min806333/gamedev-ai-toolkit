import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const plans = [
  {
    name: "Free",
    price: "$0",
    detail: "5 generations per day",
    items: ["Game ideas", "UI layouts", "Starter code"]
  },
  {
    name: "Pro",
    price: "$12/mo",
    detail: "Unlimited generations + planning tools",
    items: ["GDD generator", "System design", "UI/UX planning"],
    featured: true
  },
  {
    name: "Studio",
    price: "$29/mo",
    detail: "For teams building full production workflows",
    items: ["Everything in Pro", "MVP roadmap", "Monetization planning"]
  }
];

export function PricingPreview() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <p className="text-sm uppercase tracking-[0.24em] text-[color:var(--foreground)]/45">Pricing Preview</p>
          <h2 className="mt-3 font-display text-4xl font-semibold text-[color:var(--foreground)]">
            Start free, upgrade when your pipeline grows
          </h2>
        </div>
        <Link href="/pricing">
          <Button variant="secondary" className="h-11 px-5">
            View full pricing
          </Button>
        </Link>
      </div>
      <div className="mt-10 grid gap-5 lg:grid-cols-3">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={`rounded-[28px] border-[color:var(--border)] p-8 ${
              plan.featured ? "bg-[linear-gradient(180deg,rgba(255,255,255,0.1),rgba(255,255,255,0.03))]" : "bg-[color:var(--card)]"
            }`}
          >
            <p className="text-sm uppercase tracking-[0.24em] text-[color:var(--foreground)]/42">{plan.name}</p>
            <h3 className="mt-4 text-4xl font-semibold text-[color:var(--foreground)]">{plan.price}</h3>
            <p className="mt-3 text-sm text-[color:var(--foreground)]/62">{plan.detail}</p>
            <div className="mt-8 space-y-3">
              {plan.items.map((item) => (
                <div key={item} className="flex items-start gap-3 text-sm text-[color:var(--foreground)]/72">
                  <Check className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
