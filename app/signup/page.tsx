import { LoginPageContent } from "@/components/login-page-content";
import { redirectAuthenticatedUser } from "@/lib/auth/session";

export default async function SignupPage({
  searchParams
}: {
  searchParams?: { error?: string; success?: string };
}) {
  await redirectAuthenticatedUser("/dashboard");

  return <LoginPageContent mode="signup" error={searchParams?.error} success={searchParams?.success} />;
}
