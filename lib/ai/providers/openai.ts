import OpenAI from "openai";
import { getRequiredEnv } from "@/lib/utils/env";
import type { AIProvider, GenerateTextParams } from "./types";

let openAiClient: OpenAI | null = null;

export function getOpenAIClient() {
  if (!openAiClient) {
    openAiClient = new OpenAI({
      apiKey: getRequiredEnv("OPENAI_API_KEY")
    });
  }

  return openAiClient;
}

export const openAiProvider: AIProvider = {
  async generateText(params: GenerateTextParams) {
    const response = await getOpenAIClient().responses.create({
      model: params.model,
      input: params.prompt,
      max_output_tokens: params.maxOutputTokens
    });
    const content = response.output_text ?? "";

    if (content && params.onTextDelta) {
      await params.onTextDelta(content);
    }

    return {
      content,
      model: params.model,
      provider: "openai",
      usage: {
        inputTokens: response.usage?.input_tokens ?? null,
        outputTokens: response.usage?.output_tokens ?? null,
        totalTokens: response.usage?.total_tokens ?? null
      },
      raw: response
    }
  }
};
