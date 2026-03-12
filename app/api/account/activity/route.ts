import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/session";
import { createAdminClient } from "@/lib/supabase/admin";
import { ensureUserProfile, getUsageSummary } from "@/lib/usage";
import type { ToolType } from "@/lib/types";

const VALID_TOOLS = new Set<ToolType>([
  "idea",
  "ui",
  "pixel-art",
  "code",
  "unity-script",
  "gdd",
  "ui-ux-plan",
  "system-design",
  "mvp-roadmap"
]);

export const runtime = "nodejs";

export async function GET(request: Request) {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await ensureUserProfile(user);
  const admin = createAdminClient();
  const { searchParams } = new URL(request.url);
  const requestedTool = searchParams.get("tool");
  const toolFilter = requestedTool && VALID_TOOLS.has(requestedTool as ToolType) ? (requestedTool as ToolType) : null;
  const requestedLimit = Number(searchParams.get("limit") ?? "5");
  const limit = Number.isFinite(requestedLimit) ? Math.min(Math.max(requestedLimit, 1), 10) : 5;

  let query = admin
    .from("generations")
    .select("id, tool, created_at, prompt")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (toolFilter) {
    query = query.eq("tool", toolFilter);
  }

  const [{ data: generations, error: generationsError }, usage] = await Promise.all([query, getUsageSummary(user.id)]);

  if (generationsError) {
    console.error("Account activity lookup failed:", generationsError);
    return NextResponse.json({ error: "Unable to load activity." }, { status: 500 });
  }

  return NextResponse.json({
    usage: {
      plan: usage.plan,
      todayCount: usage.todayCount,
      remaining: usage.remaining,
      limit: usage.limit
    },
    generations: generations ?? []
  });
}
