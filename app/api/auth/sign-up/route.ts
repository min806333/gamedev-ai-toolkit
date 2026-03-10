import { NextResponse } from "next/server";
import { getAppUrl } from "@/lib/getBaseUrl";
import { createClient } from "@/lib/supabase/server";
import { ensureUserProfile } from "@/lib/usage";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const email = String(formData.get("email") || "");
    const password = String(formData.get("password") || "");
    const supabase = createClient();

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: getAppUrl("/auth/callback", request.url)
      }
    });

    if (error) {
      console.error("Auth sign-up failed:", error);
      return NextResponse.redirect(getAppUrl(`/signup?error=${encodeURIComponent(error.message)}`, request.url));
    }

    if (data.user) {
      await ensureUserProfile(data.user);
    }

    if (!data.session) {
      return NextResponse.redirect(getAppUrl("/signup?success=check-email", request.url));
    }

    return NextResponse.redirect(getAppUrl("/dashboard", request.url));
  } catch (error) {
    console.error("Auth sign-up route crashed:", error);
    return NextResponse.redirect(getAppUrl("/signup?error=Unable%20to%20create%20account", request.url));
  }
}
