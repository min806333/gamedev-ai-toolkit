import { handleGenerationRequest } from "@/lib/generation-route";
import { detectLanguageInstruction } from "@/lib/language";
import { buildUiPrompt } from "@/lib/prompts";
import { uiSchema } from "@/lib/validators";

export const runtime = "nodejs";

export async function POST(request: Request) {
  return handleGenerationRequest({
    request,
    schema: uiSchema,
    tool: "ui",
    buildPrompt: (payload) =>
      buildUiPrompt({
        ...payload,
        languageInstruction: detectLanguageInstruction(
          `${payload.gameType} ${payload.style} ${payload.theme}`
        )
      })
  });
}
