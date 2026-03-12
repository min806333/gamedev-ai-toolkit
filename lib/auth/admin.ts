import { redirect } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

type AdminProfile = {
  id: string;
  role: string | null;
};

export async function getAuthenticatedUserRole() {
  const supabase = createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    console.info("[admin-access] denied", { userId: null, role: null, reason: "unauthenticated" });
    return { user: null, role: null as string | null };
  }

  const admin = createAdminClient();
  const { data: profile, error } = await admin.from("users").select("id, role").eq("id", user.id).maybeSingle<AdminProfile>();

  if (error) {
    console.error("[admin-access] role lookup failed", { userId: user.id, error: error.message });
  }

  if (!profile) {
    console.info("[admin-access] profile missing", { userId: user.id, role: null });
  }

  const role = profile?.role ?? null;

  console.info("[admin-access] role lookup", { userId: user.id, role });

  return { user, role };
}

export async function requireAdminUser() {
  const { user, role } = await getAuthenticatedUserRole();

  if (!user || role !== "admin") {
    console.info("[admin-access] denied", { userId: user?.id ?? null, role, reason: "not_admin" });
    redirect("/");
  }

  console.info("[admin-access] granted", { userId: user.id, role });

  return user;
}
