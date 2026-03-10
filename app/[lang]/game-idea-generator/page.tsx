import { notFound } from "next/navigation";
import { SeoLandingPage } from "@/components/seo-landing-page";
import { buildLocalizedMetadata } from "@/lib/seo-metadata";
import { isSupportedLanguage } from "@/lib/i18n-routing";
import { createClient } from "@/lib/supabase/server";

export function generateMetadata({ params }: { params: { lang: string } }) {
  if (!isSupportedLanguage(params.lang)) {
    return {};
  }

  return buildLocalizedMetadata("gameIdea", params.lang);
}

export default async function LocalizedGameIdeaGeneratorLandingPage({
  params
}: {
  params: { lang: string };
}) {
  if (!isSupportedLanguage(params.lang)) {
    notFound();
  }

  const supabase = createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  return <SeoLandingPage pageKey="gameIdea" isAuthenticated={!!user} />;
}
