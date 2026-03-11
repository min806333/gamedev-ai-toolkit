import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/session";
import { createBillingPortalSession } from "@/lib/billing/stripe";
import { createAdminClient } from "@/lib/supabase/admin";
import { ensureUserProfile } from "@/lib/usage";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await ensureUserProfile(user);

    const admin = createAdminClient();
    const { data: profile } = await admin
      .from("users")
      .select("stripe_customer_id, plan")
      .eq("id", user.id)
      .maybeSingle();

    if (!profile?.stripe_customer_id || profile.plan === "free") {
      return NextResponse.json({ error: "No active billing account found." }, { status: 400 });
    }

    const session = await createBillingPortalSession({
      customerId: profile.stripe_customer_id,
      requestUrl: request.url
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe billing portal failed:", error);

    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Portal failed" },
      { status: 500 }
    );
  }
}
