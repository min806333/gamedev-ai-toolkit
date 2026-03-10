import { NextResponse } from "next/server";
import { getAppUrl } from "@/lib/getBaseUrl";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const supabase = createClient();
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: getAppUrl("/auth/callback", request.url)
      }
    });

    if (error || !data.url) {
      console.error("Google auth start failed:", error);
      return NextResponse.redirect(
        getAppUrl(`/login?error=${encodeURIComponent(error?.message || "Google login failed")}`, request.url)
      );
    }

    return NextResponse.redirect(data.url);
  } catch (error) {
    console.error("Google auth route crashed:", error);
    return NextResponse.redirect(getAppUrl("/login?error=Google%20login%20failed", request.url));
  }
}
