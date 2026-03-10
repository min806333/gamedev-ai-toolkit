import { SeoLandingPage } from "@/components/seo-landing-page";
import { seoPages } from "@/lib/seo-pages";
import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: seoPages.uiUxPlanning.metadataTitle.en,
  description: seoPages.uiUxPlanning.metadataDescription.en
};

export default async function UiUxPlanningGeneratorPage() {
  const supabase = createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  return <SeoLandingPage pageKey="uiUxPlanning" isAuthenticated={!!user} />;
}
