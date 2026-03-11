import { AuthHero } from "@/components/auth/AuthHero";
import { LoginCard } from "@/components/auth/LoginCard";
import { redirectAuthenticatedUser } from "@/lib/auth/session";

export default async function LoginPage({
  searchParams
}: {
  searchParams?: { error?: string; success?: string };
}) {
  await redirectAuthenticatedUser("/dashboard");

  return (
    <main className="grid min-h-screen bg-[color:var(--background)] md:grid-cols-2">
      <AuthHero />
      <section className="flex items-center justify-center px-6 py-12">
        <LoginCard error={searchParams?.error} success={searchParams?.success} />
      </section>
    </main>
  );
}
