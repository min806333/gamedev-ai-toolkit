import { NextResponse } from "next/server";
import { createInternalServerErrorResponse } from "@/lib/api/errors";
import { getCurrentUser } from "@/lib/auth/session";
import { ensureUserProfile, getUsageSummary } from "@/lib/usage";

export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ plan: "free", authenticated: false });
    }

    await ensureUserProfile(user);
    const usage = await getUsageSummary(user.id);

    return NextResponse.json({ plan: usage.plan, authenticated: true });
  } catch (error) {
    console.error("Account plan lookup failed:", error);
    return createInternalServerErrorResponse(error);
  }
}

export async function POST(request: Request) {
  try {
    void request;

    return NextResponse.json(
      { error: "Plan changes are managed by Stripe checkout." },
      { status: 405 }
    );
  } catch (error) {
    console.error("Account plan update failed:", error);
    return createInternalServerErrorResponse(error);
  }
}
