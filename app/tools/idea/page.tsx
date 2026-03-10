"use client";

import { useLanguage } from "@/components/language-provider";
import { ToolForm } from "@/components/tool-form";

export default function IdeaToolPage() {
  const { t } = useLanguage();

  return (
    <ToolForm
      title={t.tools.ideaTitle}
      description={t.tools.ideaDescription}
      endpoint="/api/generate/idea"
      templates={[
        {
          label: t.tools.templatePuzzle,
          values: {
            genre: "Puzzle",
            platform: "Mobile",
            theme: "Color-matching dreamscape"
          }
        },
        {
          label: t.tools.templateIdle,
          values: {
            genre: "Idle",
            platform: "iOS and Android",
            theme: "Space mining corporation"
          }
        },
        {
          label: t.tools.templateRpg,
          values: {
            genre: "RPG",
            platform: "PC",
            theme: "Ancient kingdoms and lost magic"
          }
        },
        {
          label: t.tools.templateTowerDefense,
          values: {
            genre: "Tower Defense",
            platform: "PC and mobile",
            theme: "Bio-mechanical invasion"
          }
        }
      ]}
      fields={[
        { name: "genre", label: t.tools.genre, placeholder: t.tools.placeholders.ideaGenre },
        { name: "platform", label: t.tools.platform, placeholder: t.tools.placeholders.ideaPlatform },
        { name: "theme", label: t.tools.theme, placeholder: t.tools.placeholders.ideaTheme }
      ]}
    />
  );
}
