import { handleGenerationRequest } from "@/lib/generation-route";
import { detectLanguageInstruction } from "@/lib/language";
import { buildUiUxPlanningPrompt } from "@/lib/prompts";
import { uiUxPlanningSchema } from "@/lib/validators";

export const runtime = "nodejs";

export async function POST(request: Request) {
  return handleGenerationRequest({
    request,
    schema: uiUxPlanningSchema,
    tool: "ui-ux-plan",
    requiredPlan: "pro",
    buildPrompt: (payload) =>
      buildUiUxPlanningPrompt({
        ...payload,
        languageInstruction: detectLanguageInstruction(Object.values(payload).join(" "))
      })
  });
}
