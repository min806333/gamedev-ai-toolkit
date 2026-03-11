import { handleGenerationRequest } from "@/lib/generation-route";
import { getToolGenerationDefinition } from "./tool-generation";

export function handleToolGenerationRequest(request: Request, toolId: Parameters<typeof getToolGenerationDefinition>[0]) {
  const definition = getToolGenerationDefinition(toolId);

  return handleGenerationRequest({
    request,
    schema: definition.schema as any,
    tool: definition.id,
    requiredPlan: definition.requiredPlan,
    provider: definition.provider,
    model: definition.defaultModel,
    buildPrompt: definition.buildPrompt as any
  });
}
