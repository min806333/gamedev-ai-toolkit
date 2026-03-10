"use client";

import { useLanguage } from "@/components/language-provider";
import { ToolForm } from "@/components/tool-form";

export default function UiToolPage() {
  const { t } = useLanguage();

  return (
    <ToolForm
      title={t.tools.uiTitle}
      description={t.tools.uiDescription}
      endpoint="/api/generate/ui"
      templates={[
        {
          label: t.tools.templatePuzzle,
          values: {
            gameType: "Puzzle Merge",
            style: "Bright mobile-first UI",
            theme: "Magic relic workshop"
          }
        },
        {
          label: t.tools.templateIdle,
          values: {
            gameType: "Idle Tycoon",
            style: "Clean sci-fi management HUD",
            theme: "Orbital mining station"
          }
        },
        {
          label: t.tools.templateRpg,
          values: {
            gameType: "Action RPG",
            style: "Dark fantasy layered HUD",
            theme: "Forgotten moon temple"
          }
        },
        {
          label: t.tools.templateTowerDefense,
          values: {
            gameType: "Tower Defense",
            style: "Readable tactical battlefield UI",
            theme: "Biomechanical wasteland"
          }
        }
      ]}
      fields={[
        { name: "gameType", label: t.tools.gameType, placeholder: t.tools.placeholders.uiGameType },
        { name: "style", label: t.tools.style, placeholder: t.tools.placeholders.uiStyle },
        { name: "theme", label: t.tools.theme, placeholder: t.tools.placeholders.uiTheme }
      ]}
    />
  );
}
