import { NextResponse } from "next/server";
import { getAuthCallbackUrl, redirectSeeOther } from "@/lib/auth/redirects";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const supabase = createClient();
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: getAuthCallbackUrl(request.url)
      }
    });

    if (error || !data.url) {
      console.error("GitHub auth start failed:", error);
      return redirectSeeOther(`/login?error=${encodeURIComponent(error?.message || "GitHub login failed")}`, request.url);
    }

    return NextResponse.redirect(data.url, { status: 303 });
  } catch (error) {
    console.error("GitHub auth route crashed:", error);
    return redirectSeeOther("/login?error=GitHub%20login%20failed", request.url);
  }
}
