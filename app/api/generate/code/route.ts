import { handleGenerationRequest } from "@/lib/generation-route";
import { detectLanguageInstruction } from "@/lib/language";
import { buildCodePrompt } from "@/lib/prompts";
import { codeSchema } from "@/lib/validators";

export const runtime = "nodejs";

export async function POST(request: Request) {
  return handleGenerationRequest({
    request,
    schema: codeSchema,
    tool: "code",
    buildPrompt: (payload) =>
      buildCodePrompt({
        ...payload,
        languageInstruction: detectLanguageInstruction(
          `${payload.gameType} ${payload.engine} ${payload.language}`
        )
      })
  });
}
