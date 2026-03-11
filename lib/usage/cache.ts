import type { AIProviderName } from "@/lib/ai/providers/types";
import { createAdminClient } from "@/lib/supabase/admin";
import type { ToolType } from "@/lib/types";

export async function getCachedGeneration(params: {
  prompt: string;
  tool?: ToolType;
  provider?: AIProviderName;
  model?: string;
}) {
  const supabase = createAdminClient();
  let query = supabase
    .from("generations")
    .select("result, tool, provider, model")
    .eq("prompt", params.prompt)
    .order("created_at", { ascending: false })
    .limit(1);

  if (params.tool) {
    query = query.eq("tool", params.tool);
  }

  if (params.provider) {
    query = query.eq("provider", params.provider);
  }

  if (params.model) {
    query = query.eq("model", params.model);
  }

  const { data } = await query.maybeSingle();
  return data?.result ?? null;
}
