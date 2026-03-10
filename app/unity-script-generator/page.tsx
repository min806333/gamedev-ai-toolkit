import { UnityScriptGenerator } from "@/components/generator/tool-presets";
import { seoPages } from "@/lib/seo-pages";

export const metadata = {
  title: seoPages.unityScript.metadataTitle.en,
  description: seoPages.unityScript.metadataDescription.en
};

export default function UnityScriptGeneratorPage() {
  return <UnityScriptGenerator />;
}
