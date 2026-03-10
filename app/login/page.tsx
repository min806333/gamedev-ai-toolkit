import { redirect } from "next/navigation";
import { LoginPageContent } from "@/components/login-page-content";
import { createClient } from "@/lib/supabase/server";

export default async function LoginPage({
  searchParams
}: {
  searchParams?: { error?: string; success?: string };
}) {
  const supabase = createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/dashboard");
  }

  return <LoginPageContent error={searchParams?.error} success={searchParams?.success} />;
}
