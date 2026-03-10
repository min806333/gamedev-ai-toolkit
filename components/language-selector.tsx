"use client";

import { useLanguage } from "@/components/language-provider";
import type { Language } from "@/lib/translations";

export function LanguageSelector() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <label className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border)] bg-[color:var(--card)] px-3 py-2 text-sm text-[color:var(--foreground)]">
      <span className="hidden sm:inline">{t.nav.language}</span>
      <select
        value={language}
        onChange={(event) => setLanguage(event.target.value as Language)}
        className="bg-transparent outline-none"
      >
        <option value="en">English</option>
        <option value="ko">Korean</option>
      </select>
    </label>
  );
}
