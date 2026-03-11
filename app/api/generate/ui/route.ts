import { handleToolGenerationRequest } from "@/lib/tools";

export const runtime = "nodejs";

export async function POST(request: Request) {
  return handleToolGenerationRequest(request, "ui");
}
