import { generateText } from "@/lib/ai";
import type { AIProviderName } from "@/lib/ai/providers/types";

export async function executeGeneration(params: {
  provider: AIProviderName;
  model: string;
  prompt: string;
  maxOutputTokens?: number;
  onTextDelta?: (delta: string) => void | Promise<void>;
}) {
  return generateText(params);
}
