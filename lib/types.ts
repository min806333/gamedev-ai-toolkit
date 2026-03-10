export type Plan = "free" | "pro" | "studio";
export type ToolType =
  | "idea"
  | "ui"
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
  created_at: string;
}
