import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/session";
import { ensureUserProfile, getUsageSummary } from "@/lib/usage";

export async function GET() {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ plan: "free", authenticated: false });
  }

  await ensureUserProfile(user);
  const usage = await getUsageSummary(user.id);

  return NextResponse.json({ plan: usage.plan, authenticated: true });
}

export async function POST(request: Request) {
  void request;

  return NextResponse.json(
    { error: "Plan changes are managed by Stripe checkout." },
    { status: 405 }
  );
}
