import { NextResponse } from "next/server";
import { getAuthCallbackUrl, redirectSeeOther } from "@/lib/auth/redirects";
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
        emailRedirectTo: getAuthCallbackUrl(request.url)
      }
    });

    if (error) {
      console.error("Auth sign-up failed:", error);
      return redirectSeeOther(`/signup?error=${encodeURIComponent(error.message)}`, request.url);
    }

    if (data.user) {
      await ensureUserProfile(data.user);
    }

    if (!data.session) {
      return redirectSeeOther("/signup?success=check-email", request.url);
    }

    return redirectSeeOther("/dashboard", request.url);
  } catch (error) {
    console.error("Auth sign-up route crashed:", error);
    return redirectSeeOther("/signup?error=Unable%20to%20create%20account", request.url);
  }
}
