import type { AIProviderName, AIUsage } from "@/lib/ai/providers/types";
import { createAdminClient } from "@/lib/supabase/admin";
import type { ToolType } from "@/lib/types";

export async function logUsageRequest(params: {
  userId: string;
  tool: ToolType;
  provider?: AIProviderName;
  model?: string;
  prompt: string;
  status: "success" | "failed" | "rate_limited" | "blocked";
  error?: string | null;
  usage?: AIUsage;
}) {
  const supabase = createAdminClient();
  const { error } = await supabase.from("usage_logs").insert({
    user_id: params.userId,
    tool: params.tool,
    provider: params.provider ?? null,
    model: params.model ?? null,
    prompt: params.prompt,
    status: params.status,
    error_message: params.error ?? null,
    prompt_tokens: params.usage?.inputTokens ?? null,
    completion_tokens: params.usage?.outputTokens ?? null,
    total_tokens: params.usage?.totalTokens ?? null
  });

  if (error) {
    console.error("Usage log insert failed:", error);
  }
}
