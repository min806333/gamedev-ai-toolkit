import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getBaseUrl } from "@/lib/utils";

export async function POST() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${getBaseUrl()}/auth/callback`
    }
  });

  if (error || !data.url) {
    return NextResponse.redirect(`${getBaseUrl()}/login?error=${encodeURIComponent(error?.message || "Google login failed")}`);
  }

  return NextResponse.redirect(data.url);
}
