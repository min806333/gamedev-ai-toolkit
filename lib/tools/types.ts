import type { AIProviderName } from "@/lib/ai/providers/types";
import type { Plan, ToolType } from "@/lib/types";

export type ToolFieldType = "text" | "textarea" | "select";
export type PremiumMessageKey = "gddMessage" | "uiUxMessage" | "systemDesignMessage" | "mvpRoadmapMessage";

export type ToolFieldConfig = {
  name: string;
  labelKey?: string;
  placeholderKey?: string;
  type?: ToolFieldType;
  options?: string[];
  optionKeys?: string[];
};

export type ToolTemplateConfig = {
  label?: string;
  labelKey?: string;
  values: Record<string, string>;
};

export type ToolCopy = {
  title: string;
  description: string;
  fields: Array<{
    name: string;
    label: string;
    placeholder?: string;
    type?: ToolFieldType;
    options?: string[];
  }>;
  templates?: Array<{
    label: string;
    values: Record<string, string>;
  }>;
};

export type ToolConfig = {
  id: ToolType;
  label: string;
  route: string;
  apiRoute: string;
  publicRoute?: string;
  provider: AIProviderName;
  defaultModel: string;
  requiredPlan?: Plan;
  premiumMessageKey?: PremiumMessageKey;
  resultTitle: string;
  titleKey?: string;
  descriptionKey?: string;
  fieldConfigs: ToolFieldConfig[];
  templates?: ToolTemplateConfig[];
  copy?: Record<string, ToolCopy>;
};
