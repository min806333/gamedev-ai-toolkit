import type { AIProviderName, AIUsage } from "@/lib/ai/providers/types";
import { createAdminClient } from "@/lib/supabase/admin";
import type { ToolType } from "@/lib/types";

export async function recordGeneration(params: {
  userId: string;
  tool: ToolType;
  prompt: string;
  result: string;
  provider?: AIProviderName;
  model?: string;
  usage?: AIUsage;
}) {
  const supabase = createAdminClient();
  const { error } = await supabase.from("generations").insert({
    user_id: params.userId,
    tool: params.tool,
    prompt: params.prompt,
    result: params.result,
    provider: params.provider ?? null,
    model: params.model ?? null,
    prompt_tokens: params.usage?.inputTokens ?? null,
    completion_tokens: params.usage?.outputTokens ?? null,
    total_tokens: params.usage?.totalTokens ?? null
  });

  if (error) {
    throw error;
  }
}
