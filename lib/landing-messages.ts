import type { Language } from "@/lib/translations";
import enMessages from "@/messages/en";
import koMessages from "@/messages/ko";

export const landingMessages = {
  en: enMessages.landing,
  ko: koMessages.landing
} as const;

export type LandingMessages = (typeof landingMessages)["en"];

export function getLandingMessages(language: Language) {
  return landingMessages[language];
}
