import { SeoLandingPage } from "@/components/seo-landing-page";
import { seoPages } from "@/lib/seo-pages";
import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: seoPages.mvpRoadmap.metadataTitle.en,
  description: seoPages.mvpRoadmap.metadataDescription.en
};

export default async function MvpRoadmapGeneratorPage() {
  const supabase = createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  return <SeoLandingPage pageKey="mvpRoadmap" isAuthenticated={!!user} />;
}
