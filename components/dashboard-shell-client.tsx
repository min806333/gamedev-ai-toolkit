"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentType } from "react";
import {
  BarChart3,
  CalendarRange,
  Code2,
  CreditCard,
  FileText,
  History,
  LayoutTemplate,
  Lightbulb,
  LogOut,
  Network,
  PanelsTopLeft,
  ScrollText,
  Sparkles,
  UserRound
} from "lucide-react";
import { LanguageSelector } from "@/components/language-selector";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/language-provider";

export function DashboardShellClient({
  userEmail,
  children
}: {
  userEmail?: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { t } = useLanguage();

  const overviewLinks = [{ href: "/dashboard", label: t.dashboard.overview, icon: BarChart3 }];
  const generatorLinks = [
    { href: "/tools/idea", label: t.dashboard.idea, icon: Lightbulb },
    { href: "/tools/ui", label: t.dashboard.ui, icon: LayoutTemplate },
    { href: "/tools/code", label: t.dashboard.code, icon: Code2 },
    { href: "/tools/unity-script", label: t.dashboard.unity, icon: ScrollText },
    { href: "/tools/gdd", label: t.dashboard.gdd, icon: FileText },
    { href: "/tools/ui-ux-planning", label: t.dashboard.uiUxPlanning, icon: PanelsTopLeft },
    { href: "/tools/system-design", label: t.dashboard.systemDesign, icon: Network },
    { href: "/tools/mvp-roadmap", label: t.dashboard.mvpRoadmap, icon: CalendarRange }
  ];
  const historyLinks = [{ href: "/dashboard/generations", label: t.dashboard.history, icon: History }];
  const pricingLinks = [{ href: "/pricing", label: t.dashboard.pricing, icon: CreditCard }];

  function navLink(link: { href: string; label: string; icon: ComponentType<{ className?: string }> }) {
    const active = pathname === link.href;

    return (
      <Link
        key={link.href}
        href={link.href}
        className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition ${
          active
            ? "bg-[color:var(--foreground)] text-[color:var(--background)]"
            : "text-[color:var(--foreground)]/65 hover:bg-[color:var(--card)] hover:text-[color:var(--foreground)]"
        }`}
      >
        <link.icon className="h-4 w-4" />
        {link.label}
      </Link>
    );
  }

  return (
    <div className="min-h-screen bg-[color:var(--background)] text-[color:var(--foreground)]">
      <div className="mx-auto grid min-h-screen max-w-[1440px] lg:grid-cols-[300px_1fr]">
        <aside className="border-r border-[color:var(--border)] bg-[color:var(--background-elevated)]/70 p-6 backdrop-blur-xl">
          <Link href="/" className="flex items-center gap-2 text-sm font-semibold">
            <Sparkles className="h-4 w-4" />
            GameDev AI Toolkit
          </Link>
          <p className="mt-4 text-sm text-[color:var(--foreground)]/52">{t.dashboard.sidebarTitle}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <LanguageSelector />
            <ThemeToggle />
          </div>

          <div className="mt-10 space-y-6">
            <section>
              <p className="mb-2 px-4 text-xs uppercase tracking-[0.24em] text-[color:var(--foreground)]/35">
                {t.dashboard.overview}
              </p>
              <div className="space-y-1">{overviewLinks.map(navLink)}</div>
            </section>

            <section>
              <p className="mb-2 px-4 text-xs uppercase tracking-[0.24em] text-[color:var(--foreground)]/35">
                {t.dashboard.generators}
              </p>
              <div className="space-y-1">{generatorLinks.map(navLink)}</div>
            </section>

            <section>
              <p className="mb-2 px-4 text-xs uppercase tracking-[0.24em] text-[color:var(--foreground)]/35">
                {t.dashboard.history}
              </p>
              <div className="space-y-1">{historyLinks.map(navLink)}</div>
            </section>

            <section>
              <p className="mb-2 px-4 text-xs uppercase tracking-[0.24em] text-[color:var(--foreground)]/35">
                {t.dashboard.pricing}
              </p>
              <div className="space-y-1">{pricingLinks.map(navLink)}</div>
            </section>

            <section className="rounded-3xl border border-[color:var(--border)] bg-[color:var(--card)] p-4">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--background)]/35 p-2">
                  <UserRound className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--foreground)]/40">{t.dashboard.account}</p>
                  <p className="mt-1 text-sm text-[color:var(--foreground)]/65">{t.dashboard.accountHint}</p>
                </div>
              </div>
              <p className="mt-4 break-all text-sm text-[color:var(--foreground)]">{userEmail}</p>
              <p className="mt-2 text-sm text-[color:var(--foreground)]/55">{t.dashboard.pricingHint}</p>
            </section>
          </div>

          <form action="/api/auth/sign-out" method="post" className="mt-6">
            <Button variant="secondary" className="w-full">
              <LogOut className="mr-2 h-4 w-4" />
              {t.dashboard.signOut}
            </Button>
          </form>
        </aside>
        <main className="p-6 lg:p-10">{children}</main>
      </div>
    </div>
  );
}
