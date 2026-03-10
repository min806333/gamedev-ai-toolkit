import { NextResponse } from "next/server";
import { getAppUrl } from "@/lib/getBaseUrl";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const supabase = createClient();
  await supabase.auth.signOut();

  return NextResponse.redirect(getAppUrl("/", request.url));
}
