"use client";

import Link from "next/link";
import { useLanguage } from "@/components/language-provider";
import { LanguageSelector } from "@/components/language-selector";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getPlanLabel } from "@/lib/plan-label";
import type { Plan } from "@/lib/types";

export function SettingsPageContent({
  email,
  plan
}: {
  email: string;
  plan: Plan;
}) {
  const { t } = useLanguage();
  const copy = t.dashboard.settingsPage;
  const planLabel = getPlanLabel(plan, t);

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm uppercase tracking-[0.24em] text-[color:var(--foreground)]/45">{copy.label}</p>
        <h1 className="mt-3 text-4xl font-semibold break-keep text-[color:var(--foreground)]">{copy.title}</h1>
        <p className="mt-3 max-w-3xl break-keep leading-relaxed text-[color:var(--foreground)]/60">{copy.description}</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-[color:var(--border)] bg-[color:var(--card)] p-6">
          <h2 className="text-xl font-semibold break-keep text-[color:var(--foreground)]">{copy.appearance}</h2>
          <p className="mt-3 break-keep leading-relaxed text-[color:var(--foreground)]/60">{copy.appearanceBody}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <LanguageSelector />
            <ThemeToggle />
          </div>
        </Card>

        <Card className="border-[color:var(--border)] bg-[color:var(--card)] p-6">
          <h2 className="text-xl font-semibold break-keep text-[color:var(--foreground)]">{copy.account}</h2>
          <p className="mt-3 break-keep leading-relaxed text-[color:var(--foreground)]/60">{copy.accountBody}</p>
          <div className="mt-6 space-y-4 text-sm leading-relaxed text-[color:var(--foreground)]/72">
            <div>
              <p className="text-[color:var(--foreground)]/45">{t.auth.email}</p>
              <p className="mt-1 break-all text-[color:var(--foreground)]">{email}</p>
            </div>
            <div>
              <p className="text-[color:var(--foreground)]/45">{t.dashboard.plan}</p>
              <p className="mt-1 text-[color:var(--foreground)]">{planLabel}</p>
            </div>
          </div>
          <p className="mt-6 break-keep leading-relaxed text-[color:var(--foreground)]/60">{copy.billingBody}</p>
          <Link href="/pricing" className="mt-6 inline-flex">
            <Button className="h-12 px-5">{copy.billingCta}</Button>
          </Link>
        </Card>
      </div>
    </div>
  );
}
