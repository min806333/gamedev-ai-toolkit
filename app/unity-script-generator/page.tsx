import { ToolPage } from "@/components/generator/ToolPage";
import { seoPages } from "@/lib/seo-pages";

export const metadata = {
  title: seoPages.unityScript.metadataTitle.en,
  description: seoPages.unityScript.metadataDescription.en
};

export default async function UnityScriptGeneratorPage() {
  return <ToolPage toolId="unity-script" />;
}
