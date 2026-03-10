import { NextResponse } from "next/server";
import { getAppUrl, getBaseUrl } from "@/lib/getBaseUrl";
import { createClient } from "@/lib/supabase/server";
import { ensureUserProfile } from "@/lib/usage";

export async function POST(request: Request) {
  const formData = await request.formData();
  const email = String(formData.get("email") || "");
  const password = String(formData.get("password") || "");
  const supabase = createClient();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${getBaseUrl()}/auth/callback`
    }
  });

  if (error) {
    return NextResponse.redirect(getAppUrl(`/login?error=${encodeURIComponent(error.message)}`));
  }

  if (data.user) {
    await ensureUserProfile(data.user);
  }

  return NextResponse.redirect(getAppUrl("/dashboard"));
}
