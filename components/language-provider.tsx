"use client";

import { usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getLanguageFromPathname } from "@/lib/i18n-routing";
import { getLanguageCookieValue, isLanguage } from "@/lib/language-cookie";
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

function persistLanguage(language: Language) {
  window.localStorage.setItem(STORAGE_KEY, language);
  document.cookie = getLanguageCookieValue(language);
}

function readLanguageCookie() {
  const cookieValue = document.cookie
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${STORAGE_KEY}=`))
    ?.split("=")[1];

  return isLanguage(cookieValue) ? cookieValue : null;
}

function detectInitialLanguage(fallback: Language): Language {
  if (typeof window === "undefined") {
    return fallback;
  }

  const pathLanguage = getLanguageFromPathname(window.location.pathname);
  if (pathLanguage) {
    return pathLanguage;
  }

  const cookieLanguage = readLanguageCookie();
  if (cookieLanguage) {
    return cookieLanguage;
  }

  const stored = window.localStorage.getItem(STORAGE_KEY) as Language | null;
  if (stored === "en" || stored === "ko") {
    return stored;
  }

  return window.navigator.language.toLowerCase().startsWith("ko") ? "ko" : fallback;
}

export function LanguageProvider({
  children,
  initialLanguage = "en"
}: {
  children: React.ReactNode;
  initialLanguage?: Language;
}) {
  const pathname = usePathname();
  const [language, setLanguageState] = useState<Language>(initialLanguage);

  useEffect(() => {
    setLanguageState(detectInitialLanguage(initialLanguage));
  }, [initialLanguage]);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  useEffect(() => {
    const pathLanguage = getLanguageFromPathname(pathname);

    if (pathLanguage && pathLanguage !== language) {
      setLanguageState(pathLanguage);
      persistLanguage(pathLanguage);
      return;
    }

    if (pathLanguage) {
      persistLanguage(pathLanguage);
    }
  }, [language, pathname]);

  function setLanguage(nextLanguage: Language) {
    setLanguageState(nextLanguage);
    persistLanguage(nextLanguage);
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
