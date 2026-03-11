import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function requireAdminUser() {
  const supabase = createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  const adminEmail = process.env.ADMIN_EMAIL?.toLowerCase();
  const userEmail = user?.email?.toLowerCase();

  if (!user || !adminEmail || userEmail !== adminEmail) {
    redirect("/");
  }

  return user;
}

