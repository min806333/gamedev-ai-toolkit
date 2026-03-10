import { NextResponse } from "next/server";
import { getAppUrl, getBaseUrl } from "@/lib/getBaseUrl";
import { createClient } from "@/lib/supabase/server";

export async function POST() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${getBaseUrl()}/auth/callback`
    }
  });

  if (error || !data.url) {
    return NextResponse.redirect(getAppUrl(`/login?error=${encodeURIComponent(error?.message || "Google login failed")}`));
  }

  return NextResponse.redirect(data.url);
}
