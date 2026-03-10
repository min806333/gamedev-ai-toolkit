import { ZodType } from "zod";
import { createClient } from "@/lib/supabase/server";
import { getOpenAIClient } from "@/lib/openai";
import {
  ensureUserProfile,
  enforceRequiredPlan,
  enforceUsageLimit,
  getCachedGeneration,
  saveGeneration
} from "@/lib/usage";
import type { Plan, ToolType } from "@/lib/types";

type PromptBuilder<TPayload> = (payload: TPayload) => string;

export async function handleGenerationRequest<TPayload extends Record<string, string>>(params: {
  request: Request;
  schema: ZodType<TPayload>;
  tool: ToolType;
  buildPrompt: PromptBuilder<TPayload>;
  requiredPlan?: Plan;
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
    const usage = await enforceUsageLimit(user.id);
    if (params.requiredPlan) {
      await enforceRequiredPlan(user.id, params.requiredPlan);
    }
    const promptPayload = JSON.stringify(payload);
    const cachedResult = await getCachedGeneration(promptPayload, params.tool);

    if (cachedResult) {
      return new Response(cachedResult, {
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "X-Cache-Hit": "1"
        }
      });
    }

    const prompt = params.buildPrompt(payload);
    const openAiStream = await getOpenAIClient().responses.create({
      model: "gpt-4.1-mini",
      input: prompt,
      stream: true,
      max_output_tokens: usage.plan === "free" ? 700 : usage.plan === "pro" ? 1800 : 2600
    });
    const encoder = new TextEncoder();
    let result = "";

    const stream = new ReadableStream<Uint8Array>({
      async start(controller) {
        try {
          for await (const event of openAiStream) {
            if (event.type === "response.output_text.delta") {
              result += event.delta;
              controller.enqueue(encoder.encode(event.delta));
            }
          }

          if (result.trim() && usage.plan !== "free") {
            await saveGeneration({
              userId: user.id,
              tool: params.tool,
              prompt: promptPayload,
              result
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
