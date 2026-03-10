import { handleGenerationRequest } from "@/lib/generation-route";
import { detectLanguageInstruction } from "@/lib/language";
import { buildGddPrompt } from "@/lib/prompts";
import { gddSchema } from "@/lib/validators";

export const runtime = "nodejs";

export async function POST(request: Request) {
  return handleGenerationRequest({
    request,
    schema: gddSchema,
    tool: "gdd",
    requiredPlan: "pro",
    buildPrompt: (payload) =>
      buildGddPrompt({
        ...payload,
        languageInstruction: detectLanguageInstruction(Object.values(payload).join(" "))
      })
  });
}
