export type AIProviderName = "openai" | "anthropic";

export type AIUsage = {
  inputTokens?: number | null;
  outputTokens?: number | null;
  totalTokens?: number | null;
};

export type GenerateTextParams = {
  model: string;
  prompt: string;
  maxOutputTokens?: number;
  onTextDelta?: (delta: string) => void | Promise<void>;
};

export type GeneratedTextResult = {
  content: string;
  model: string;
  provider: AIProviderName;
  usage: AIUsage;
  raw: unknown;
};

export interface AIProvider {
  generateText(params: GenerateTextParams): Promise<GeneratedTextResult>;
}
