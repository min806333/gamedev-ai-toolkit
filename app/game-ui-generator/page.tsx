import { GameUiGenerator } from "@/components/generator/tool-presets";
import { seoPages } from "@/lib/seo-pages";

export const metadata = {
  title: seoPages.gameUi.metadataTitle.en,
  description: seoPages.gameUi.metadataDescription.en
};

export default function GameUiGeneratorPage() {
  return <GameUiGenerator />;
}
