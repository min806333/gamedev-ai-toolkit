"use client";

import { useLanguage } from "@/components/language-provider";
import { ToolForm } from "@/components/tool-form";

export default function UnityScriptToolPage() {
  const { t } = useLanguage();

  return (
    <ToolForm
      title={t.tools.unityTitle}
      description={t.tools.unityDescription}
      endpoint="/api/generate/unity-script"
      templates={[
        {
          label: t.tools.templatePuzzle,
          values: {
            scriptType: "Grid Manager",
            gameGenre: "Puzzle",
            extraFeatures: "Tile swapping, combo detection, score feedback"
          }
        },
        {
          label: t.tools.templateIdle,
          values: {
            scriptType: "Offline Reward System",
            gameGenre: "Idle",
            extraFeatures: "Server-safe timestamp checks, reward popup, bonus multipliers"
          }
        },
        {
          label: t.tools.templateRpg,
          values: {
            scriptType: "Player Combat Controller",
            gameGenre: "RPG",
            extraFeatures: "Combo attacks, stamina usage, hit reactions"
          }
        },
        {
          label: t.tools.templateTowerDefense,
          values: {
            scriptType: "Tower Targeting System",
            gameGenre: "Tower Defense",
            extraFeatures: "Priority targeting, range gizmos, upgrade hooks"
          }
        }
      ]}
      fields={[
        {
          name: "scriptType",
          label: t.tools.scriptType,
          type: "select",
          placeholder: "Select a script type...",
          options: ["Player Movement", "Enemy AI", "Camera Controller", "Inventory System"]
        },
        { name: "gameGenre", label: t.tools.gameGenre, placeholder: "Action platformer" },
        {
          name: "extraFeatures",
          label: t.tools.extraFeatures,
          type: "textarea",
          placeholder: "Double jump, dash cooldown, animation hooks, slope handling"
        }
      ]}
    />
  );
}
