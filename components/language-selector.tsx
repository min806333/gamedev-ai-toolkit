"use client";

import { Globe2 } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { localizePath } from "@/lib/i18n-routing";
import { useLanguage } from "@/components/language-provider";
import { CustomSelect } from "@/components/ui/custom-select";
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
    <div className="flex items-center gap-2 rounded-full border border-[color:var(--border)] bg-[color:var(--card)] px-2 py-2 text-sm text-[color:var(--foreground)]">
      <Globe2 className="ml-2 h-4 w-4 shrink-0" />
      <span className="hidden sm:inline">{t.nav.language}</span>
      <CustomSelect
        value={language}
        onChange={(value) => {
          const nextLanguage = value as Language;
          setLanguage(nextLanguage);

          if (pathname && (pathname === "/" || pathname.startsWith("/en/") || pathname.startsWith("/ko/") || pathname === "/en" || pathname === "/ko")) {
            router.push(localizePath(pathname, nextLanguage));
          }
        }}
        options={options}
        placeholder={t.nav.language}
        buttonClassName="min-w-[120px] border-transparent bg-transparent px-2 py-1.5 hover:bg-[color:var(--card-strong)]"
        menuClassName="right-0 left-auto w-[160px]"
      />
    </div>
  );
}
