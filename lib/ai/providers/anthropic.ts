import Anthropic from "@anthropic-ai/sdk";
import { getRequiredEnv } from "@/lib/utils/env";
import type { AIProvider, GenerateTextParams } from "./types";

let anthropicClient: Anthropic | null = null;

export function getAnthropicClient() {
  if (!anthropicClient) {
    anthropicClient = new Anthropic({
      apiKey: getRequiredEnv("ANTHROPIC_API_KEY")
    });
  }

  return anthropicClient;
}

function getAnthropicTextContent(content: Array<{ type: string; text?: string }>) {
  return content
    .filter((item) => item.type === "text")
    .map((item) => item.text ?? "")
    .join("");
}

export const anthropicProvider: AIProvider = {
  async generateText(params: GenerateTextParams) {
    const message = await getAnthropicClient().messages.create({
      model: params.model,
      max_tokens: params.maxOutputTokens ?? 1024,
      messages: [{ role: "user", content: params.prompt }]
    });
    const content = getAnthropicTextContent(message.content as Array<{ type: string; text?: string }>);

    if (content && params.onTextDelta) {
      await params.onTextDelta(content);
    }

    return {
      content,
      model: params.model,
      provider: "anthropic",
      usage: {
        inputTokens: message.usage.input_tokens ?? null,
        outputTokens: message.usage.output_tokens ?? null,
        totalTokens:
          (message.usage.input_tokens ?? 0) +
          (message.usage.output_tokens ?? 0)
      },
      raw: message
    };
  }
};
