import { detectLanguageInstruction } from "@/lib/language";
import {
  buildCodePrompt,
  buildGddPrompt,
  buildIdeaPrompt,
  buildMvpRoadmapPrompt,
  buildPixelArtPrompt,
  buildSystemDesignPrompt,
  buildUiPrompt,
  buildUiUxPlanningPrompt,
  buildUnityScriptPrompt
} from "@/lib/prompts";
import {
  codeSchema,
  gddSchema,
  ideaSchema,
  mvpRoadmapSchema,
  pixelArtSchema,
  systemDesignSchema,
  uiSchema,
  uiUxPlanningSchema,
  unityScriptSchema
} from "@/lib/validators";
import { getToolConfig } from "./tool-config";

export function getToolGenerationDefinition(toolId: ReturnType<typeof getToolConfig>["id"]) {
  const tool = getToolConfig(toolId);

  switch (toolId) {
    case "idea":
      return {
        ...tool,
        schema: ideaSchema,
        buildPrompt: (payload: { genre: string; platform: string; theme: string }) =>
          buildIdeaPrompt({
            ...payload,
            languageInstruction: detectLanguageInstruction(`${payload.genre} ${payload.platform} ${payload.theme}`)
          })
      };
    case "ui":
      return {
        ...tool,
        schema: uiSchema,
        buildPrompt: (payload: { gameType: string; style: string; theme: string }) =>
          buildUiPrompt({
            ...payload,
            languageInstruction: detectLanguageInstruction(`${payload.gameType} ${payload.style} ${payload.theme}`)
          })
      };
    case "pixel-art":
      return {
        ...tool,
        schema: pixelArtSchema,
        buildPrompt: (payload: { theme: string; style: string; palette: string; resolution: string }) =>
          buildPixelArtPrompt({
            ...payload,
            languageInstruction: detectLanguageInstruction(Object.values(payload).join(" "))
          })
      };
    case "code":
      return {
        ...tool,
        schema: codeSchema,
        buildPrompt: (payload: { gameType: string; engine: string; language: string }) =>
          buildCodePrompt({
            ...payload,
            languageInstruction: detectLanguageInstruction(`${payload.gameType} ${payload.engine} ${payload.language}`)
          })
      };
    case "unity-script":
      return {
        ...tool,
        schema: unityScriptSchema,
        buildPrompt: (payload: { scriptType: string; gameGenre: string; extraFeatures: string }) =>
          buildUnityScriptPrompt({
            ...payload,
            languageInstruction: detectLanguageInstruction(Object.values(payload).join(" "))
          })
      };
    case "gdd":
      return {
        ...tool,
        schema: gddSchema,
        buildPrompt: (payload: any) =>
          buildGddPrompt({
            ...payload,
            languageInstruction: detectLanguageInstruction(Object.values(payload).join(" "))
          })
      };
    case "ui-ux-plan":
      return {
        ...tool,
        schema: uiUxPlanningSchema,
        buildPrompt: (payload: any) =>
          buildUiUxPlanningPrompt({
            ...payload,
            languageInstruction: detectLanguageInstruction(Object.values(payload).join(" "))
          })
      };
    case "system-design":
      return {
        ...tool,
        schema: systemDesignSchema,
        buildPrompt: (payload: any) =>
          buildSystemDesignPrompt({
            ...payload,
            languageInstruction: detectLanguageInstruction(Object.values(payload).join(" "))
          })
      };
    case "mvp-roadmap":
      return {
        ...tool,
        schema: mvpRoadmapSchema,
        buildPrompt: (payload: any) =>
          buildMvpRoadmapPrompt({
            ...payload,
            languageInstruction: detectLanguageInstruction(Object.values(payload).join(" "))
          })
      };
  }
}
