import { handleGenerationRequest } from "@/lib/generation-route";
import { detectLanguageInstruction } from "@/lib/language";
import { buildUnityScriptPrompt } from "@/lib/prompts";
import { unityScriptSchema } from "@/lib/validators";

export const runtime = "nodejs";

export async function POST(request: Request) {
  return handleGenerationRequest({
    request,
    schema: unityScriptSchema,
    tool: "unity-script",
    buildPrompt: (payload) =>
      buildUnityScriptPrompt({
        ...payload,
        languageInstruction: detectLanguageInstruction(
          `${payload.scriptType} ${payload.gameGenre} ${payload.extraFeatures}`
        )
      })
  });
}
