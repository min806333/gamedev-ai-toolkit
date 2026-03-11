import { NextResponse } from "next/server";
import { getAppUrl } from "@/lib/getBaseUrl";

export function redirectSeeOther(path: string, requestUrl?: string) {
  return NextResponse.redirect(getAppUrl(path, requestUrl), { status: 303 });
}

export function getAuthCallbackUrl(requestUrl?: string) {
  return getAppUrl("/auth/callback", requestUrl);
}
