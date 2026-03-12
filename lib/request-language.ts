import { cookies, headers } from "next/headers";
import { supportedLanguages } from "@/lib/i18n-routing";
import { isLanguage } from "@/lib/language-cookie";

function readAcceptLanguage(value?: string | null) {
  if (!value) {
    return null;
  }

  const normalized = value.toLowerCase();

  for (const language of supportedLanguages) {
    if (normalized.includes(language)) {
      return language;
    }
  }

  return null;
}

export function getRequestLanguage() {
  const cookieLanguage = cookies().get("gamedev-ai-language")?.value;

  if (isLanguage(cookieLanguage)) {
    return cookieLanguage;
  }

  return readAcceptLanguage(headers().get("accept-language")) ?? "en";
}
