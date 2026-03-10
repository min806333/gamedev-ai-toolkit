"use client";

import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { ArrowRight } from "lucide-react";
import { Footer } from "@/components/footer";
import { SiteHeaderClient } from "@/components/site-header-client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/components/language-provider";
import { seoPages, type SeoPageKey } from "@/lib/seo-pages";

export function SeoLandingPage({
  pageKey,
  isAuthenticated
}: {
  pageKey: SeoPageKey;
  isAuthenticated: boolean;
}) {
  const { language, t } = useLanguage();
  const page = seoPages[pageKey];
  const relatedPages = page.related.map((key) => seoPages[key]);
  const localizedSeoHref = (slug: string) => `/${language}${slug}`;

  return (
    <div className="min-h-screen bg-[color:var(--background)]">
      <SiteHeaderClient isAuthenticated={isAuthenticated} />

      <section className="relative overflow-hidden border-b border-[color:var(--border)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,170,120,0.16),transparent_30%),radial-gradient(circle_at_top_right,rgba(112,214,255,0.12),transparent_28%)]" />
        <div className="absolute inset-0 bg-grid bg-[size:56px_56px] opacity-20" />
        <div className="relative mx-auto max-w-6xl px-6 py-20">
          <div className="max-w-4xl">
            <p className="text-sm uppercase tracking-[0.24em] text-[color:var(--foreground)]/45">{t.common.tryTool}</p>
            <h1 className="mt-4 font-display text-5xl font-semibold tracking-tight text-[color:var(--foreground)] md:text-6xl">
              {page.heroTitle[language]}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-[color:var(--foreground)]/62">
              {page.heroDescription[language]}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href={page.toolHref}>
                <Button className="h-11 px-6">
                  {t.common.tryGenerator}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/pricing">
                <Button variant="secondary" className="h-11 px-6">
                  {t.pricing.upgradeToPro}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="border-[color:var(--border)] bg-[color:var(--card)] p-8">
            <p className="text-sm uppercase tracking-[0.24em] text-[color:var(--foreground)]/45">{t.seo.problem}</p>
            <h2 className="mt-3 text-3xl font-semibold text-[color:var(--foreground)]">{page.problemTitle[language]}</h2>
            <p className="mt-4 text-base leading-8 text-[color:var(--foreground)]/65">{page.problemBody[language]}</p>
          </Card>

          <Card className="border-[color:var(--border)] bg-[color:var(--card)] p-8">
            <p className="text-sm uppercase tracking-[0.24em] text-[color:var(--foreground)]/45">{t.seo.solution}</p>
            <h2 className="mt-3 text-3xl font-semibold text-[color:var(--foreground)]">{page.solutionTitle[language]}</h2>
            <p className="mt-4 text-base leading-8 text-[color:var(--foreground)]/65">{page.solutionBody[language]}</p>
          </Card>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Card className="border-[color:var(--border)] bg-[color:var(--card)] p-8">
            <p className="text-sm uppercase tracking-[0.24em] text-[color:var(--foreground)]/45">{t.common.exampleOutput}</p>
            <h2 className="mt-3 text-2xl font-semibold text-[color:var(--foreground)]">{page.exampleTitle[language]}</h2>
            <div className="prose prose-sm mt-6 max-w-none text-[color:var(--foreground)]/82 prose-headings:text-[color:var(--foreground)] prose-p:text-[color:var(--foreground)]/82 prose-li:text-[color:var(--foreground)]/82 prose-strong:text-[color:var(--foreground)] prose-code:text-[color:var(--foreground)]">
              <ReactMarkdown>{page.exampleBody[language]}</ReactMarkdown>
            </div>
          </Card>

          <Card className="border-[color:var(--border)] bg-[color:var(--card)] p-8">
            <p className="text-sm uppercase tracking-[0.24em] text-[color:var(--foreground)]/45">{t.seo.benefits}</p>
            <h2 className="mt-3 text-2xl font-semibold text-[color:var(--foreground)]">{page.benefitsTitle[language]}</h2>
            <div className="mt-6 space-y-4">
              {page.benefits[language].map((benefit) => (
                <div
                  key={benefit}
                  className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--background)]/35 p-4 text-sm leading-7 text-[color:var(--foreground)]/72"
                >
                  {benefit}
                </div>
              ))}
            </div>
          </Card>
        </div>

        <Card className="mt-6 border-[color:var(--border)] bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-8">
          <p className="text-sm uppercase tracking-[0.24em] text-[color:var(--foreground)]/45">{t.seo.premium}</p>
          <h2 className="mt-3 text-3xl font-semibold text-[color:var(--foreground)]">{page.premiumTitle[language]}</h2>
          <p className="mt-4 max-w-3xl text-base leading-8 text-[color:var(--foreground)]/65">{page.premiumBody[language]}</p>
          <div className="mt-6 flex flex-wrap gap-4">
            {page.premiumToolHref ? (
              <Link href={page.premiumToolHref}>
                <Button>{t.pricing.upgradeToPro}</Button>
              </Link>
            ) : null}
            <Link href="/pricing">
              <Button variant="secondary">{t.premium.cta}</Button>
            </Link>
          </div>
        </Card>

        <Card className="mt-6 border-[color:var(--border)] bg-[color:var(--card)] p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-[color:var(--foreground)]/45">{t.common.tryTool}</p>
              <h2 className="mt-3 text-3xl font-semibold text-[color:var(--foreground)]">{page.cta[language]}</h2>
            </div>
            <Link href={page.toolHref}>
              <Button className="h-11 px-6">{t.common.tryGenerator}</Button>
            </Link>
          </div>
        </Card>

        <section className="mt-10">
          <div className="mb-6">
            <p className="text-sm uppercase tracking-[0.24em] text-[color:var(--foreground)]/45">{t.seo.relatedPages}</p>
            <h2 className="mt-3 text-3xl font-semibold text-[color:var(--foreground)]">{t.seo.relatedPages}</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {relatedPages.map((related) => (
              <Link key={related.slug} href={localizedSeoHref(related.slug)} className="h-full">
                <Card className="group flex h-full flex-col border-[color:var(--border)] bg-[color:var(--card)] p-6 transition hover:-translate-y-1 hover:bg-[color:var(--card-strong)]">
                  <h3 className="text-lg font-semibold text-[color:var(--foreground)]">{related.heroTitle[language]}</h3>
                  <p className="mt-3 text-sm leading-7 text-[color:var(--foreground)]/62">{related.heroDescription[language]}</p>
                  <div className="mt-auto flex items-center pt-6 text-sm text-[color:var(--foreground)]/75">
                    {t.seo.explore}
                    <ArrowRight className="ml-2 h-4 w-4 transition group-hover:translate-x-1" />
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      </section>

      <Footer />
    </div>
  );
}
