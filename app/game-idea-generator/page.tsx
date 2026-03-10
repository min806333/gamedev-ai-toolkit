import { SeoLandingPage } from "@/components/seo-landing-page";
import { seoPages } from "@/lib/seo-pages";
import { createClient } from "@/lib/supabase/server";

export const metadata = seoPages.gameIdea.metadata;

export default async function GameIdeaGeneratorLandingPage() {
  const supabase = createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  return <SeoLandingPage pageKey="gameIdea" isAuthenticated={!!user} />;
}
