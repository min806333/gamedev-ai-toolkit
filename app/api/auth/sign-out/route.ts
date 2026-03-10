import { NextResponse } from "next/server";
import { getAppUrl } from "@/lib/getBaseUrl";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

async function handleSignOut(request: Request) {
  try {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Auth sign-out failed:", error);
    }
  } catch (error) {
    console.error("Auth sign-out route crashed:", error);
  }

  return NextResponse.redirect(getAppUrl("/", request.url));
}

export async function GET(request: Request) {
  return handleSignOut(request);
}

export async function POST(request: Request) {
  return handleSignOut(request);
}
