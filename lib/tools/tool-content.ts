import type { Language } from "@/lib/translations";
import { getNestedValue } from "@/lib/utils/object";
import { getToolConfig } from "./tool-config";
import type { ToolCopy } from "./types";

type TranslationRecord = Record<string, any>;

function readTranslation(source: TranslationRecord, path?: string) {
  if (!path) {
    return undefined;
  }

  return getNestedValue(source, path);
}

export function getToolFormCopy(toolId: Parameters<typeof getToolConfig>[0], source: TranslationRecord, language: Language): ToolCopy {
  const config = getToolConfig(toolId);
  const localizedCopy = config.copy?.[language];

  if (localizedCopy) {
    return localizedCopy;
  }

  return {
    title: readTranslation(source.tools, config.titleKey) ?? config.label,
    description: readTranslation(source.tools, config.descriptionKey) ?? "",
    fields: config.fieldConfigs.map((field) => ({
      name: field.name,
      label: readTranslation(source.tools, field.labelKey) ?? field.name,
      placeholder: readTranslation(source.tools.placeholders, field.placeholderKey),
      type: field.type,
      options: field.optionKeys?.map((optionKey) => readTranslation(source.tools, optionKey) ?? optionKey) ?? field.options
    })),
    templates: config.templates?.map((template) => ({
      label: template.label ?? readTranslation(source.tools, template.labelKey) ?? "Template",
      values: template.values
    }))
  };
}

export function getToolCardCopy(toolId: Parameters<typeof getToolConfig>[0], source: TranslationRecord) {
  const items = source.toolCards.items as Array<{ title: string; description: string }>;

  switch (toolId) {
    case "idea":
      return items[0];
    case "ui":
      return items[1];
    case "unity-script":
      return items[2];
    case "code":
      return items[3];
    case "gdd":
      return items[4];
    case "ui-ux-plan":
      return items[5];
    case "system-design":
      return items[6];
    case "mvp-roadmap":
      return items[7];
    default:
      return { title: getToolConfig(toolId).label, description: "" };
  }
}
