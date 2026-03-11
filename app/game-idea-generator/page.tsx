import { ToolPage } from "@/components/generator/ToolPage";
import { seoPages } from "@/lib/seo-pages";

export const metadata = {
  title: seoPages.gameIdea.metadataTitle.en,
  description: seoPages.gameIdea.metadataDescription.en
};

export default async function GameIdeaGeneratorPage() {
  return <ToolPage toolId="idea" />;
}
