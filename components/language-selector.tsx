"use client";

import { Globe2 } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useLanguage } from "@/components/language-provider";
import { CustomSelect } from "@/components/ui/custom-select";
import { localizePath } from "@/lib/i18n-routing";
import type { Language } from "@/lib/translations";

export function LanguageSelector() {
  const pathname = usePathname();
  const router = useRouter();
  const { language, setLanguage, t } = useLanguage();
  const options = [
    { value: "en", label: t.languageSelector.english },
    { value: "ko", label: t.languageSelector.korean }
  ] satisfies Array<{ value: Language; label: string }>;

  return (
    <div className="relative z-[60] inline-flex h-12 max-w-full shrink-0 items-center gap-2 rounded-full border border-[color:var(--border)] bg-[color:var(--card)] px-3 text-sm text-[color:var(--foreground)] whitespace-nowrap">
      <Globe2 className="h-4 w-4 shrink-0" />
      <span className="hidden shrink-0 sm:inline">{t.nav.language}</span>
      <CustomSelect
        value={language}
        onChange={(value) => {
          const nextLanguage = value as Language;
          setLanguage(nextLanguage);

          if (pathname && (pathname === "/" || pathname.startsWith("/en/") || pathname.startsWith("/ko/") || pathname === "/en" || pathname === "/ko")) {
            router.push(localizePath(pathname, nextLanguage));
            return;
          }

          router.refresh();
        }}
        options={options}
        placeholder={t.nav.language}
        className="w-[108px] sm:w-[124px]"
        buttonClassName="h-10 min-w-0 rounded-full border-transparent bg-transparent px-2 py-0 text-sm hover:bg-[color:var(--card-strong)]"
        menuClassName="right-0 left-auto w-[160px]"
      />
    </div>
  );
}
