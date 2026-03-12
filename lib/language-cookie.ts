import type { Language } from "@/lib/translations";

export const LANGUAGE_COOKIE = "gamedev-ai-language";
const ONE_YEAR_IN_SECONDS = 60 * 60 * 24 * 365;

export function isLanguage(value: string | undefined | null): value is Language {
  return value === "en" || value === "ko";
}

export function getLanguageCookieValue(language: Language) {
  return `${LANGUAGE_COOKIE}=${language}; Path=/; Max-Age=${ONE_YEAR_IN_SECONDS}; SameSite=Lax`;
}
