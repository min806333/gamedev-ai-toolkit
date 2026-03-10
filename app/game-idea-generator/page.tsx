import { GameIdeaGenerator } from "@/components/generator/tool-presets";
import { seoPages } from "@/lib/seo-pages";

export const metadata = {
  title: seoPages.gameIdea.metadataTitle.en,
  description: seoPages.gameIdea.metadataDescription.en
};

export default function GameIdeaGeneratorPage() {
  return <GameIdeaGenerator />;
}
