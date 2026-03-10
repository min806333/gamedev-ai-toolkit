import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/footer";
import { SiteHeader } from "@/components/site-header";
import { HomePageContent } from "@/components/home-page-content";
import { getAppUrl } from "@/lib/getBaseUrl";
import { isSupportedLanguage } from "@/lib/i18n-routing";

const homeMetadata = {
  en: {
    title: "GameDev AI Toolkit",
    description: "Generate game ideas, UI systems, and starter code with AI."
  },
  ko: {
    title: "GameDev AI Toolkit",
    description: "AI로 게임 아이디어, UI 시스템, 시작 코드를 생성하세요."
  }
} as const;

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  if (!isSupportedLanguage(params.lang)) {
    return {};
  }

  return {
    title: homeMetadata[params.lang].title,
    description: homeMetadata[params.lang].description,
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

  return (
    <div className="min-h-screen bg-[color:var(--background)]">
      <SiteHeader />
      <HomePageContent />
      <Footer />
    </div>
  );
}
