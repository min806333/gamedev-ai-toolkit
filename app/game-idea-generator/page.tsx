import { DashboardShell } from "@/components/dashboard-shell";
import { ToolPage } from "@/components/generator/ToolPage";
import { seoPages } from "@/lib/seo-pages";

export const metadata = {
  title: seoPages.gameIdea.metadataTitle.en,
  description: seoPages.gameIdea.metadataDescription.en
};

export default async function GameIdeaGeneratorPage() {
  return (
    <DashboardShell>
      <ToolPage toolId="idea" />
    </DashboardShell>
  );
}
