"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getLandingMessages } from "@/lib/landing-messages";

export function CTA() {
  const { language } = useLanguage();
  const copy = getLandingMessages(language);

  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <Card className="rounded-[32px] border-[color:var(--border)] bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-10 md:p-14">
        <div className="max-w-3xl">
          <p className="text-sm uppercase tracking-[0.24em] text-[color:var(--foreground)]/45">{copy.cta.label}</p>
          <h2 className="mt-4 font-display text-4xl font-semibold break-keep text-[color:var(--foreground)] md:text-5xl">{copy.cta.title}</h2>
          <p className="mt-5 text-lg break-keep leading-relaxed text-[color:var(--foreground)]/62">{copy.cta.description}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/signup">
              <Button className="h-12 px-6 text-base">
                {copy.cta.primaryCta}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="secondary" className="h-12 px-6 text-base">
                {copy.cta.secondaryCta}
              </Button>
            </Link>
          </div>
        </div>
      </Card>
    </section>
  );
}
