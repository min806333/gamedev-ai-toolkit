import { DashboardShell } from "@/components/dashboard-shell";
import { ToolPage } from "@/components/generator/ToolPage";
import { seoPages } from "@/lib/seo-pages";

export const metadata = {
  title: seoPages.pixelArtGenerator.metadataTitle.en,
  description: seoPages.pixelArtGenerator.metadataDescription.en
};

export default async function PixelArtGeneratorPage() {
  return (
    <DashboardShell>
      <ToolPage toolId="pixel-art" />
    </DashboardShell>
  );
}
