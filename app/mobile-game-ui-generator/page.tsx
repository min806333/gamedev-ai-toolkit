import { SeoLandingPage } from "@/components/seo-landing-page";
import { seoPages } from "@/lib/seo-pages";
import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: seoPages.mobileGameUi.metadataTitle.en,
  description: seoPages.mobileGameUi.metadataDescription.en
};

export default async function MobileGameUiGeneratorPage() {
  const supabase = createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  return <SeoLandingPage pageKey="mobileGameUi" isAuthenticated={!!user} />;
}
