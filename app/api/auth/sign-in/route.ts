import { NextResponse } from "next/server";
import { redirectSeeOther } from "@/lib/auth/redirects";
import { createClient } from "@/lib/supabase/server";
import { ensureUserProfile } from "@/lib/usage";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const email = String(formData.get("email") || "");
    const password = String(formData.get("password") || "");
    const supabase = createClient();

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      console.error("Auth sign-in failed:", error);
      return redirectSeeOther(`/login?error=${encodeURIComponent(error.message)}`, request.url);
    }

    if (data.user) {
      await ensureUserProfile(data.user);
    }

    return redirectSeeOther("/dashboard", request.url);
  } catch (error) {
    console.error("Auth sign-in route crashed:", error);
    return redirectSeeOther("/login?error=Unable%20to%20sign%20in", request.url);
  }
}
