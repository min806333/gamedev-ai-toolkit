import { GddGenerator } from "@/components/generator/tool-presets";
import { PremiumToolGate } from "@/components/premium-tool-gate";
import { seoPages } from "@/lib/seo-pages";
import { createClient } from "@/lib/supabase/server";
import { getUsageSummary } from "@/lib/usage";

export const metadata = {
  title: seoPages.gameDesignDocument.metadataTitle.en,
  description: seoPages.gameDesignDocument.metadataDescription.en
};

export default async function GameDesignDocumentGeneratorPage() {
  const supabase = createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();
  const usage = user ? await getUsageSummary(user.id) : { plan: "free" as const };

  return (
    <PremiumToolGate
      plan={usage.plan}
      requiredPlan="pro"
      message=""
      messageKey="gddMessage"
    >
      <GddGenerator />
    </PremiumToolGate>
  );
}
