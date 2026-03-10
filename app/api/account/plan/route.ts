import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { ensureUserProfile, getUsageSummary } from "@/lib/usage";
import type { Plan } from "@/lib/types";

const ALLOWED_PLANS: Plan[] = ["free", "pro", "studio"];

export async function GET() {
  const supabase = createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ plan: "free", authenticated: false });
  }

  await ensureUserProfile(user);
  const usage = await getUsageSummary(user.id);

  return NextResponse.json({ plan: usage.plan, authenticated: true });
}

export async function POST(request: Request) {
  const supabase = createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await ensureUserProfile(user);
  const body = (await request.json()) as { plan?: Plan };

  if (!body.plan || !ALLOWED_PLANS.includes(body.plan)) {
    return NextResponse.json({ error: "Invalid plan." }, { status: 400 });
  }

  const admin = createAdminClient();
  await admin.from("users").update({ plan: body.plan }).eq("id", user.id);

  return NextResponse.json({ success: true, plan: body.plan });
}
