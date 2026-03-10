import { NextResponse } from "next/server";
import { getAppUrl } from "@/lib/getBaseUrl";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const supabase = createClient();
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: getAppUrl("/auth/callback", request.url)
      }
    });

    if (error || !data.url) {
      console.error("GitHub auth start failed:", error);
      return NextResponse.redirect(
        getAppUrl(`/login?error=${encodeURIComponent(error?.message || "GitHub login failed")}`, request.url)
      );
    }

    return NextResponse.redirect(data.url);
  } catch (error) {
    console.error("GitHub auth route crashed:", error);
    return NextResponse.redirect(getAppUrl("/login?error=GitHub%20login%20failed", request.url));
  }
}
