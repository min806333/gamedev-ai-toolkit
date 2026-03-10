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
      className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border)] bg-[color:var(--card)] px-4 py-2 text-sm text-[color:var(--foreground)] transition hover:scale-[1.02] hover:bg-[color:var(--card-strong)]"
    >
      {theme === "dark" ? <SunMedium className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      {theme === "dark" ? t.common.light : t.common.dark}
    </button>
  );
}
