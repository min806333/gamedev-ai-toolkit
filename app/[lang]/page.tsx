import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LandingPage } from "@/components/landing/LandingPage";
import { getAppUrl } from "@/lib/getBaseUrl";
import { landingMessages } from "@/lib/landing-messages";
import { isSupportedLanguage } from "@/lib/i18n-routing";

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  if (!isSupportedLanguage(params.lang)) {
    return {};
  }

  const copy = landingMessages[params.lang];

  return {
    title: "VertikerAI",
    description: copy.hero.description,
    alternates: {
      canonical: getAppUrl(`/${params.lang}`),
      languages: {
        en: getAppUrl("/en"),
        ko: getAppUrl("/ko")
      }
    }
  };
}

export default function LocalizedHomePage({ params }: { params: { lang: string } }) {
  if (!isSupportedLanguage(params.lang)) {
    notFound();
  }

  return <LandingPage />;
}

