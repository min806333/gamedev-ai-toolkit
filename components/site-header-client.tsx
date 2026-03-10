"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";
import { LanguageSelector } from "@/components/language-selector";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/language-provider";

export function SiteHeaderClient({ isAuthenticated }: { isAuthenticated: boolean }) {
  const { t } = useLanguage();

  return (
    <header className="sticky top-0 z-40 border-b border-[color:var(--border)] bg-[color:var(--background-elevated)]/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2 text-sm font-semibold text-[color:var(--foreground)]">
          <Sparkles className="h-4 w-4" />
          GameDev AI Toolkit
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-[color:var(--foreground)]/60 md:flex">
          <Link href="/pricing">{t.nav.pricing}</Link>
          <Link href="/dashboard">{t.nav.dashboard}</Link>
          <Link href="/ai-game-development-tools">{t.nav.tools}</Link>
        </nav>
        <div className="flex items-center gap-3">
          <LanguageSelector />
          <ThemeToggle />
          {isAuthenticated ? (
            <Link href="/dashboard">
              <Button variant="secondary">{t.nav.openApp}</Button>
            </Link>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost">{t.nav.logIn}</Button>
              </Link>
              <Link href="/login">
                <Button>{t.nav.startFree}</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
