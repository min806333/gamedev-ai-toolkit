"use client";

import { ToolForm } from "@/components/tool-form";
import { useLanguage } from "@/components/language-provider";
import { getToolFormCopy } from "@/lib/tools/tool-content";
import { getToolConfig } from "@/lib/tools/tool-config";
import type { ToolType } from "@/lib/types";

export function ToolRenderer({ toolId }: { toolId: ToolType }) {
  const { t, language } = useLanguage();
  const copy = getToolFormCopy(toolId, t, language);

  return (
    <ToolForm
      title={copy.title}
      description={copy.description}
      endpoint={getToolConfig(toolId).apiRoute}
      fields={copy.fields}
      templates={copy.templates}
    />
  );
}
