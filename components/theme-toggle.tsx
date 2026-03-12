"use client";

import { Moon, SunMedium } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { useTheme } from "@/components/theme-provider";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const { t } = useLanguage();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="inline-flex h-12 shrink-0 items-center gap-2 whitespace-nowrap rounded-full border border-[color:var(--border)] bg-[color:var(--card)] px-4 text-sm text-[color:var(--foreground)] transition hover:scale-[1.02] hover:bg-[color:var(--card-strong)]"
    >
      {theme === "dark" ? <SunMedium className="h-4 w-4 shrink-0" /> : <Moon className="h-4 w-4 shrink-0" />}
      <span className="break-keep">{theme === "dark" ? t.common.light : t.common.dark}</span>
    </button>
  );
}
