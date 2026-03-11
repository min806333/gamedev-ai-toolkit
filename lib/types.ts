import type { AIProviderName } from "@/lib/ai/providers/types";

export type Plan = "free" | "pro" | "studio";
export type ToolType =
  | "idea"
  | "ui"
  | "pixel-art"
  | "code"
  | "unity-script"
  | "gdd"
  | "ui-ux-plan"
  | "system-design"
  | "mvp-roadmap";

export interface UserProfile {
  id: string;
  email: string;
  plan: Plan;
  created_at: string;
}

export interface GenerationRecord {
  id: string;
  user_id: string;
  tool: ToolType;
  prompt: string;
  result: string;
  provider?: AIProviderName | null;
  model?: string | null;
  prompt_tokens?: number | null;
  completion_tokens?: number | null;
  total_tokens?: number | null;
  created_at: string;
}
