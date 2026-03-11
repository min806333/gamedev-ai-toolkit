import { anthropicProvider } from "@/lib/ai/providers/anthropic";
import { openAiProvider } from "@/lib/ai/providers/openai";
import type { AIProviderName, GeneratedTextResult } from "@/lib/ai/providers/types";

type RouteAIParams = {
  provider?: AIProviderName;
  model?: string;
  prompt: string;
  maxOutputTokens?: number;
  onTextDelta?: (delta: string) => void | Promise<void>;
};

const DEFAULT_MODELS: Record<AIProviderName, string> = {
  openai: "gpt-4.1-mini",
  anthropic: "claude-3-5-sonnet-latest"
};

function getProviderOrder(preferredProvider?: AIProviderName): AIProviderName[] {
  if (preferredProvider === "anthropic") {
    return ["anthropic", "openai"];
  }

  return ["openai", "anthropic"];
}

function resolveModel(provider: AIProviderName, requestedModel?: string) {
  if (!requestedModel) {
    return DEFAULT_MODELS[provider];
  }

  if (provider === "openai" && requestedModel.startsWith("gpt-")) {
    return requestedModel;
  }

  if (provider === "anthropic" && requestedModel.startsWith("claude-")) {
    return requestedModel;
  }

  return DEFAULT_MODELS[provider];
}

export async function routeAIRequest(params: RouteAIParams): Promise<GeneratedTextResult> {
  const providers = getProviderOrder(params.provider);
  let lastError: unknown;

  for (const providerName of providers) {
    const model = resolveModel(providerName, params.model);

    try {
      if (providerName === "openai") {
        return await openAiProvider.generateText({
          model,
          prompt: params.prompt,
          maxOutputTokens: params.maxOutputTokens,
          onTextDelta: params.onTextDelta
        });
      }

      return await anthropicProvider.generateText({
        model,
        prompt: params.prompt,
        maxOutputTokens: params.maxOutputTokens,
        onTextDelta: params.onTextDelta
      });
    } catch (error) {
      lastError = error;
      console.error(`AI provider ${providerName} failed:`, error);
    }
  }

  throw lastError instanceof Error ? lastError : new Error("All AI providers failed.");
}

