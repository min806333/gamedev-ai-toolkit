import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getBaseUrl } from "@/lib/utils";

export async function POST() {
  const supabase = createClient();
  await supabase.auth.signOut();

  return NextResponse.redirect(`${getBaseUrl()}/`);
}
