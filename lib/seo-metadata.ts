import type { Metadata } from "next";
import { getAppUrl } from "@/lib/getBaseUrl";
import { seoPages, type SeoPageKey } from "@/lib/seo-pages";
import { type Language } from "@/lib/translations";

export function buildLocalizedMetadata(pageKey: SeoPageKey, language: Language): Metadata {
  const page = seoPages[pageKey];
  const path = `/${language}${page.slug}`;

  return {
    title: page.metadataTitle[language],
    description: page.metadataDescription[language],
    alternates: {
      canonical: getAppUrl(path),
      languages: {
        en: getAppUrl(`/en${page.slug}`),
        ko: getAppUrl(`/ko${page.slug}`)
      }
    }
  };
}
