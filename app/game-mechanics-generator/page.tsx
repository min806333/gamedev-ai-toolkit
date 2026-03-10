import { SeoLandingPage } from "@/components/seo-landing-page";
import { seoPages } from "@/lib/seo-pages";
import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: seoPages.gameMechanics.metadataTitle.en,
  description: seoPages.gameMechanics.metadataDescription.en
};

export default async function GameMechanicsGeneratorLandingPage() {
  const supabase = createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  return <SeoLandingPage pageKey="gameMechanics" isAuthenticated={!!user} />;
}
