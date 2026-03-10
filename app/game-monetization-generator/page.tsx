import { SeoLandingPage } from "@/components/seo-landing-page";
import { seoPages } from "@/lib/seo-pages";
import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: seoPages.gameMonetization.metadataTitle.en,
  description: seoPages.gameMonetization.metadataDescription.en
};

export default async function GameMonetizationGeneratorLandingPage() {
  const supabase = createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  return <SeoLandingPage pageKey="gameMonetization" isAuthenticated={!!user} />;
}
