import type { Language } from "@/lib/translations";

export const supportedLanguages: Language[] = ["en", "ko"];

export function isSupportedLanguage(value: string): value is Language {
  return supportedLanguages.includes(value as Language);
}

export function getLanguageFromPathname(pathname?: string | null): Language | null {
  if (!pathname) {
    return null;
  }

  const [, firstSegment] = pathname.split("/");
  return firstSegment && isSupportedLanguage(firstSegment) ? firstSegment : null;
}

export function stripLanguagePrefix(pathname: string) {
  const parts = pathname.split("/");

  if (parts[1] && isSupportedLanguage(parts[1])) {
    return `/${parts.slice(2).join("/")}`.replace(/\/+$/, "") || "/";
  }

  return pathname || "/";
}

export function localizePath(pathname: string, language: Language) {
  const normalized = stripLanguagePrefix(pathname);
  return normalized === "/" ? `/${language}` : `/${language}${normalized}`;
}
