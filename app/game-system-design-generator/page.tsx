import { SeoLandingPage } from "@/components/seo-landing-page";
import { seoPages } from "@/lib/seo-pages";
import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: seoPages.gameSystemDesign.metadataTitle.en,
  description: seoPages.gameSystemDesign.metadataDescription.en
};

export default async function GameSystemDesignGeneratorLandingPage() {
  const supabase = createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  return <SeoLandingPage pageKey="gameSystemDesign" isAuthenticated={!!user} />;
}
