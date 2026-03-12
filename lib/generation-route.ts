import { revalidatePath } from "next/cache";
import { ZodType } from "zod";
import { executeGeneration } from "@/lib/ai/execute-generation";
import { containsBlockedPromptInstruction } from "@/lib/ai/prompt-safety";
import type { AIProviderName } from "@/lib/ai/providers/types";
import { checkRateLimit } from "@/lib/ratelimit";
import { createClient } from "@/lib/supabase/server";
import { getToolConfig } from "@/lib/tools/tool-config";
import {
  checkUsageLimit,
  ensureUserProfile,
  enforceRequiredPlan,
  getCachedGeneration,
  logUsageRequest,
  recordGeneration
} from "@/lib/usage";
import type { Plan, ToolType } from "@/lib/types";

type PromptBuilder<TPayload> = (payload: TPayload) => string;

function revalidateGenerationViews(tool: ToolType) {
  const config = getToolConfig(tool);
  const paths = [
    "/dashboard",
    "/dashboard/history",
    "/dashboard/generations",
    "/dashboard/usage",
    config.route,
    config.publicRoute
  ].filter((path): path is string => Boolean(path));

  for (const path of paths) {
    revalidatePath(path);
  }
}

export async function handleGenerationRequest<TPayload extends Record<string, string>>(params: {
  request: Request;
  schema: ZodType<TPayload>;
  tool: ToolType;
  buildPrompt: PromptBuilder<TPayload>;
  requiredPlan?: Plan;
  provider?: AIProviderName;
  model?: string;
}) {
  let currentUserId: string | null = null;
  let promptForLogging = "";

  try {
    const payload = params.schema.parse(await params.request.json());
    const supabase = createClient();
    const {
      data: { user }
    } = await supabase.auth.getUser();

    if (!user) {
      return new Response("Unauthorized", { status: 401 });
    }

    currentUserId = user.id;
    const limit = await checkRateLimit(`generation:${user.id}`);

    if (!limit.success) {
      await logUsageRequest({
        userId: user.id,
        tool: params.tool,
        provider: params.provider,
        model: params.model,
        prompt: "RATE_LIMITED",
        status: "rate_limited",
        error: "Too many requests"
      });

      return new Response("Too many requests", {
        status: 429,
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Retry-After": String(Math.max(1, Math.ceil((limit.reset - Date.now()) / 1000)))
        }
      });
    }

    await ensureUserProfile(user);
    const usage = await checkUsageLimit(user.id);
    if (params.requiredPlan) {
      await enforceRequiredPlan(user.id, params.requiredPlan);
    }

    const promptPayload = JSON.stringify(payload);
    promptForLogging = promptPayload;
    const cachedGeneration = await getCachedGeneration({
      prompt: promptPayload,
      tool: params.tool,
      provider: params.provider,
      model: params.model
    });

    if (cachedGeneration) {
      if (cachedGeneration.result.trim()) {
        await recordGeneration({
          userId: user.id,
          tool: params.tool,
          prompt: promptPayload,
          result: cachedGeneration.result,
          provider: cachedGeneration.provider,
          model: cachedGeneration.model,
          usage: cachedGeneration.usage
        });
        revalidateGenerationViews(params.tool);
      }

      await logUsageRequest({
        userId: user.id,
        tool: params.tool,
        provider: cachedGeneration.provider,
        model: cachedGeneration.model,
        prompt: promptPayload,
        status: "success",
        usage: cachedGeneration.usage
      });

      return new Response(cachedGeneration.result, {
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "X-Cache-Hit": "1"
        }
      });
    }

    const prompt = params.buildPrompt(payload);

    if (containsBlockedPromptInstruction(prompt)) {
      await logUsageRequest({
        userId: user.id,
        tool: params.tool,
        provider: params.provider,
        model: params.model,
        prompt,
        status: "blocked",
        error: "Prompt contains blocked instructions"
      });

      return new Response("Prompt contains blocked instructions", {
        status: 400,
        headers: {
          "Content-Type": "text/plain; charset=utf-8"
        }
      });
    }

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

          if (generation.content.trim()) {
            await recordGeneration({
              userId: user.id,
              tool: params.tool,
              prompt: promptPayload,
              result: generation.content,
              provider: generation.provider,
              model: generation.model,
              usage: generation.usage
            });
            revalidateGenerationViews(params.tool);
          }

          await logUsageRequest({
            userId: user.id,
            tool: params.tool,
            provider: generation.provider,
            model: generation.model,
            prompt,
            status: "success",
            usage: generation.usage
          });

          controller.close();
        } catch (error) {
          await logUsageRequest({
            userId: user.id,
            tool: params.tool,
            provider: params.provider,
            model: params.model,
            prompt,
            status: "failed",
            error: error instanceof Error ? error.message : "Generation failed"
          });
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
    console.error("Generation request failed:", error);

    if (currentUserId) {
      await logUsageRequest({
        userId: currentUserId,
        tool: params.tool,
        provider: params.provider,
        model: params.model,
        prompt: promptForLogging || "REQUEST_FAILED",
        status: "failed",
        error: error instanceof Error ? error.message : "Generation failed"
      });
    }

    const message =
      process.env.NODE_ENV === "development" && error instanceof Error ? error.message : "Internal server error";

    return new Response(message, {
      status: 400,
      headers: {
        "Content-Type": "text/plain; charset=utf-8"
      }
    });
  }
}
