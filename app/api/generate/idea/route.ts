import { handleGenerationRequest } from "@/lib/generation-route";
import { detectLanguageInstruction } from "@/lib/language";
import { buildIdeaPrompt } from "@/lib/prompts";
import { ideaSchema } from "@/lib/validators";

export const runtime = "nodejs";

export async function POST(request: Request) {
  return handleGenerationRequest({
    request,
    schema: ideaSchema,
    tool: "idea",
    buildPrompt: (payload) =>
      buildIdeaPrompt({
        ...payload,
        languageInstruction: detectLanguageInstruction(
          `${payload.genre} ${payload.platform} ${payload.theme}`
        )
      })
  });
}
