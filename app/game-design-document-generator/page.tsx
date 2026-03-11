import { ToolPage } from "@/components/generator/ToolPage";
import { seoPages } from "@/lib/seo-pages";

export const metadata = {
  title: seoPages.gameDesignDocument.metadataTitle.en,
  description: seoPages.gameDesignDocument.metadataDescription.en
};

export default async function GameDesignDocumentGeneratorPage() {
  return <ToolPage toolId="gdd" />;
}
