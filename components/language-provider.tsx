"use client";

import { usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getLanguageFromPathname } from "@/lib/i18n-routing";
import { translations, type Language } from "@/lib/translations";

const STORAGE_KEY = "gamedev-ai-language";
type TranslationSet = (typeof translations)[Language];

const LanguageContext = createContext<{
  language: Language;
  setLanguage: (language: Language) => void;
  t: TranslationSet;
}>({
  language: "en",
  setLanguage: () => {},
  t: translations.en
});

function detectInitialLanguage(): Language {
  if (typeof window === "undefined") {
    return "en";
  }

  const pathLanguage = getLanguageFromPathname(window.location.pathname);
  if (pathLanguage) {
    return pathLanguage;
  }

  const stored = window.localStorage.getItem(STORAGE_KEY) as Language | null;
  if (stored === "en" || stored === "ko") {
    return stored;
  }

  return window.navigator.language.toLowerCase().startsWith("ko") ? "ko" : "en";
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    setLanguageState(detectInitialLanguage());
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  useEffect(() => {
    const pathLanguage = getLanguageFromPathname(pathname);

    if (pathLanguage && pathLanguage !== language) {
      setLanguageState(pathLanguage);
      window.localStorage.setItem(STORAGE_KEY, pathLanguage);
    }
  }, [language, pathname]);

  function setLanguage(nextLanguage: Language) {
    setLanguageState(nextLanguage);
    window.localStorage.setItem(STORAGE_KEY, nextLanguage);
  }

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      t: translations[language]
    }),
    [language]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  return useContext(LanguageContext);
}
