import { routeAIRequest } from "@/lib/ai-router";
import type { AIProviderName } from "@/lib/ai/providers/types";

export async function executeGeneration(params: {
  provider: AIProviderName;
  model: string;
  prompt: string;
  maxOutputTokens?: number;
  onTextDelta?: (delta: string) => void | Promise<void>;
}) {
  return routeAIRequest(params);
}
