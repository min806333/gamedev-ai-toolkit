import { handleGenerationRequest } from "@/lib/generation-route";
import { detectLanguageInstruction } from "@/lib/language";
import { buildSystemDesignPrompt } from "@/lib/prompts";
import { systemDesignSchema } from "@/lib/validators";

export const runtime = "nodejs";

export async function POST(request: Request) {
  return handleGenerationRequest({
    request,
    schema: systemDesignSchema,
    tool: "system-design",
    requiredPlan: "pro",
    buildPrompt: (payload) =>
      buildSystemDesignPrompt({
        ...payload,
        languageInstruction: detectLanguageInstruction(Object.values(payload).join(" "))
      })
  });
}
