"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles } from "lucide-react";
import { LanguageSelector } from "@/components/language-selector";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/language-provider";
import { getLanguageFromPathname, localizePath } from "@/lib/i18n-routing";

export function SiteHeaderClient({ isAuthenticated }: { isAuthenticated: boolean }) {
  const pathname = usePathname();
  const { t, language } = useLanguage();
  const activeLanguage = getLanguageFromPathname(pathname) ?? language;

  return (
    <header className="sticky top-0 z-40 border-b border-[color:var(--border)] bg-[color:var(--background-elevated)]/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6 md:flex-nowrap">
        <Link
          href={localizePath("/", activeLanguage)}
          className="inline-flex min-w-0 shrink-0 items-center gap-2 text-sm font-semibold text-[color:var(--foreground)]"
        >
          <Sparkles className="h-4 w-4 shrink-0" />
          <span className="break-keep whitespace-nowrap">VertikerAI</span>
        </Link>
        <nav className="hidden min-w-0 items-center gap-6 text-sm text-[color:var(--foreground)]/60 md:flex">
          <Link href="/pricing" className="whitespace-nowrap">{t.nav.pricing}</Link>
          <Link href="/dashboard" className="whitespace-nowrap">{t.nav.dashboard}</Link>
          <Link href="/ai-game-development-tools" className="whitespace-nowrap">{t.nav.tools}</Link>
        </nav>
        <div className="flex w-full items-center justify-end gap-2 overflow-x-auto pb-1 sm:w-auto sm:gap-3 sm:overflow-visible sm:pb-0">
          <LanguageSelector />
          <ThemeToggle />
          {isAuthenticated ? (
            <Link href="/dashboard">
              <Button variant="secondary" className="h-11 px-4 sm:h-12 sm:px-5">{t.nav.openApp}</Button>
            </Link>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" className="h-11 px-4 sm:h-12 sm:px-5">{t.nav.logIn}</Button>
              </Link>
              <Link href="/login">
                <Button className="h-11 px-4 sm:h-12 sm:px-5">{t.nav.startFree}</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
