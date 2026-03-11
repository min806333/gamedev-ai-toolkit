import { ToolPage } from "@/components/generator/ToolPage";
import { seoPages } from "@/lib/seo-pages";

export const metadata = {
  title: seoPages.gameUi.metadataTitle.en,
  description: seoPages.gameUi.metadataDescription.en
};

export default async function GameUiGeneratorPage() {
  return <ToolPage toolId="ui" />;
}
