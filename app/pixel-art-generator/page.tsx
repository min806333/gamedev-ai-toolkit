import { PixelArtGenerator } from "@/components/generator/tool-presets";
import { seoPages } from "@/lib/seo-pages";

export const metadata = {
  title: seoPages.pixelArtGenerator.metadataTitle.en,
  description: seoPages.pixelArtGenerator.metadataDescription.en
};

export default function PixelArtGeneratorPage() {
  return <PixelArtGenerator />;
}
