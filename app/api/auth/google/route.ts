import { NextResponse } from "next/server";
import { getAppUrl, getBaseUrl } from "@/lib/getBaseUrl";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${getBaseUrl(request.url)}/auth/callback`
    }
  });

  if (error || !data.url) {
    return NextResponse.redirect(getAppUrl(`/login?error=${encodeURIComponent(error?.message || "Google login failed")}`, request.url));
  }

  return NextResponse.redirect(data.url);
}
