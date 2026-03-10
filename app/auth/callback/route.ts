import { NextResponse } from "next/server";
import { getAppUrl } from "@/lib/getBaseUrl";
import { createClient } from "@/lib/supabase/server";
import { ensureUserProfile } from "@/lib/usage";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const requestUrl = new URL(request.url);
    const code = requestUrl.searchParams.get("code");
    const nextParam = requestUrl.searchParams.get("next");
    const authError = requestUrl.searchParams.get("error_description") || requestUrl.searchParams.get("error");
    const nextPath = nextParam?.startsWith("/") ? nextParam : "/dashboard";

    if (authError) {
      return NextResponse.redirect(getAppUrl(`/login?error=${encodeURIComponent(authError)}`, request.url));
    }

    if (!code) {
      return NextResponse.redirect(getAppUrl("/login?error=Authentication%20callback%20is%20missing%20a%20code", request.url));
    }

    const supabase = createClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      console.error("Auth callback exchange failed:", error);
      return NextResponse.redirect(getAppUrl(`/login?error=${encodeURIComponent(error.message)}`, request.url));
    }

    if (data.user) {
      await ensureUserProfile(data.user);
    }

    return NextResponse.redirect(getAppUrl(nextPath, request.url));
  } catch (error) {
    console.error("Auth callback route crashed:", error);
    return NextResponse.redirect(getAppUrl("/login?error=Authentication%20callback%20failed", request.url));
  }
}
