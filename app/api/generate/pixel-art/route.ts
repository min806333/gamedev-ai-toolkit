import { handleGenerationRequest } from "@/lib/generation-route";
import { detectLanguageInstruction } from "@/lib/language";
import { buildPixelArtPrompt } from "@/lib/prompts";
import { pixelArtSchema } from "@/lib/validators";

export const runtime = "nodejs";

export async function POST(request: Request) {
  return handleGenerationRequest({
    request,
    schema: pixelArtSchema,
    tool: "pixel-art",
    buildPrompt: (payload) =>
      buildPixelArtPrompt({
        ...payload,
        languageInstruction: detectLanguageInstruction(
          `${payload.theme} ${payload.style} ${payload.palette} ${payload.resolution}`
        )
      })
  });
}
