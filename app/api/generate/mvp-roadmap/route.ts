import { handleGenerationRequest } from "@/lib/generation-route";
import { detectLanguageInstruction } from "@/lib/language";
import { buildMvpRoadmapPrompt } from "@/lib/prompts";
import { mvpRoadmapSchema } from "@/lib/validators";

export const runtime = "nodejs";

export async function POST(request: Request) {
  return handleGenerationRequest({
    request,
    schema: mvpRoadmapSchema,
    tool: "mvp-roadmap",
    requiredPlan: "studio",
    buildPrompt: (payload) =>
      buildMvpRoadmapPrompt({
        ...payload,
        languageInstruction: detectLanguageInstruction(Object.values(payload).join(" "))
      })
  });
}
