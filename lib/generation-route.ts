import { ZodType } from "zod";
import { executeGeneration } from "@/lib/ai/execute-generation";
import type { AIProviderName } from "@/lib/ai/providers/types";
import { createClient } from "@/lib/supabase/server";
import {
  checkUsageLimit,
  ensureUserProfile,
  enforceRequiredPlan,
  getCachedGeneration,
  recordGeneration
} from "@/lib/usage";
import type { Plan, ToolType } from "@/lib/types";

type PromptBuilder<TPayload> = (payload: TPayload) => string;

export async function handleGenerationRequest<TPayload extends Record<string, string>>(params: {
  request: Request;
  schema: ZodType<TPayload>;
  tool: ToolType;
  buildPrompt: PromptBuilder<TPayload>;
  requiredPlan?: Plan;
  provider?: AIProviderName;
  model?: string;
}) {
  try {
    const payload = params.schema.parse(await params.request.json());
    const supabase = createClient();
    const {
      data: { user }
    } = await supabase.auth.getUser();

    if (!user) {
      return new Response("Unauthorized", { status: 401 });
    }

    await ensureUserProfile(user);
    const usage = await checkUsageLimit(user.id);
    if (params.requiredPlan) {
      await enforceRequiredPlan(user.id, params.requiredPlan);
    }
    const promptPayload = JSON.stringify(payload);
    const cachedResult = await getCachedGeneration({
      prompt: promptPayload,
      tool: params.tool,
      provider: params.provider,
      model: params.model
    });

    if (cachedResult) {
      return new Response(cachedResult, {
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "X-Cache-Hit": "1"
        }
      });
    }

    const prompt = params.buildPrompt(payload);
    const encoder = new TextEncoder();

    const stream = new ReadableStream<Uint8Array>({
      async start(controller) {
        try {
          const generation = await executeGeneration({
            provider: params.provider ?? "openai",
            model: params.model ?? "gpt-4.1-mini",
            prompt,
            maxOutputTokens: usage.plan === "free" ? 700 : usage.plan === "pro" ? 1800 : 2600,
            onTextDelta: async (delta) => {
              controller.enqueue(encoder.encode(delta));
            }
          });

          if (generation.content.trim() && usage.plan !== "free") {
            await recordGeneration({
              userId: user.id,
              tool: params.tool,
              prompt: promptPayload,
              result: generation.content,
              provider: generation.provider,
              model: generation.model,
              usage: generation.usage
            });
          }

          controller.close();
        } catch (error) {
          controller.error(error);
        }
      }
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-store"
      }
    });
  } catch (error) {
    return new Response(error instanceof Error ? error.message : "Generation failed", {
      status: 400,
      headers: {
        "Content-Type": "text/plain; charset=utf-8"
      }
    });
  }
}
