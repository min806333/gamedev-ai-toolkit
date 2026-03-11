import { anthropicProvider } from "./providers/anthropic";
import { openAiProvider } from "./providers/openai";
import type { AIProvider, AIProviderName, GenerateTextParams } from "./providers/types";

const PROVIDERS: Record<AIProviderName, AIProvider> = {
  openai: openAiProvider,
  anthropic: anthropicProvider
};

export function getAIProvider(provider: AIProviderName = "openai") {
  return PROVIDERS[provider];
}

export async function generateText(params: GenerateTextParams & { provider?: AIProviderName }) {
  const provider = getAIProvider(params.provider);
  return provider.generateText(params);
}

export * from "./providers/anthropic";
export * from "./providers/openai";
export * from "./providers/types";
