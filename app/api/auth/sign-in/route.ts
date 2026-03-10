import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { ensureUserProfile } from "@/lib/usage";
import { getBaseUrl } from "@/lib/utils";

export async function POST(request: Request) {
  const formData = await request.formData();
  const email = String(formData.get("email") || "");
  const password = String(formData.get("password") || "");
  const supabase = createClient();

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return NextResponse.redirect(`${getBaseUrl()}/login?error=${encodeURIComponent(error.message)}`);
  }

  if (data.user) {
    await ensureUserProfile(data.user);
  }

  return NextResponse.redirect(`${getBaseUrl()}/dashboard`);
}
