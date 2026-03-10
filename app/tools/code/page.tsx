"use client";

import { useLanguage } from "@/components/language-provider";
import { ToolForm } from "@/components/tool-form";

export default function CodeToolPage() {
  const { t } = useLanguage();

  return (
    <ToolForm
      title={t.tools.codeTitle}
      description={t.tools.codeDescription}
      endpoint="/api/generate/code"
      templates={[
        {
          label: t.tools.templatePuzzle,
          values: {
            gameType: "Puzzle Match Game",
            engine: "Unity",
            language: "C#"
          }
        },
        {
          label: t.tools.templateIdle,
          values: {
            gameType: "Idle Resource Game",
            engine: "Flutter",
            language: "Dart"
          }
        },
        {
          label: t.tools.templateRpg,
          values: {
            gameType: "Action RPG",
            engine: "Unity",
            language: "C#"
          }
        },
        {
          label: t.tools.templateTowerDefense,
          values: {
            gameType: "Tower Defense",
            engine: "Unity",
            language: "C#"
          }
        }
      ]}
      fields={[
        { name: "gameType", label: t.tools.gameType, placeholder: t.tools.placeholders.codeGameType },
        { name: "engine", label: t.tools.engine, type: "select", options: [t.tools.options.unity, t.tools.options.flutter] },
        { name: "language", label: t.tools.language, type: "select", options: [t.tools.options.csharp, t.tools.options.dart] }
      ]}
    />
  );
}
