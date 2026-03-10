import { SeoLandingPage } from "@/components/seo-landing-page";
import { seoPages } from "@/lib/seo-pages";
import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: seoPages.puzzleGameIdea.metadataTitle.en,
  description: seoPages.puzzleGameIdea.metadataDescription.en
};

export default async function PuzzleGameIdeaGeneratorPage() {
  const supabase = createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  return <SeoLandingPage pageKey="puzzleGameIdea" isAuthenticated={!!user} />;
}
