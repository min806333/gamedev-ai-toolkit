import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/supabase/server";

export default async function LoginPage({
  searchParams
}: {
  searchParams?: { error?: string };
}) {
  const supabase = createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <Card className="w-full max-w-md p-8">
        <p className="text-sm uppercase tracking-[0.24em] text-white/45">Authentication</p>
        <h1 className="mt-3 text-3xl font-semibold text-white">Sign in to your workspace</h1>
        <p className="mt-3 text-sm text-white/55">Use email/password or Google through Supabase Auth.</p>
        {searchParams?.error ? (
          <p className="mt-4 rounded-2xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-200">
            {searchParams.error}
          </p>
        ) : null}
        <form action="/api/auth/sign-in" method="post" className="mt-8 space-y-4">
          <label className="block">
            <span className="mb-2 block text-sm text-white/65">Email</span>
            <Input type="email" name="email" placeholder="founder@studio.com" required />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm text-white/65">Password</span>
            <Input type="password" name="password" placeholder="Enter your password" required />
          </label>
          <Button className="w-full" type="submit">
            Continue with email
          </Button>
        </form>
        <form action="/api/auth/google" method="post" className="mt-3">
          <Button className="w-full" type="submit" variant="secondary">
            Continue with Google
          </Button>
        </form>
        <form action="/api/auth/sign-up" method="post" className="mt-6 space-y-4 border-t border-white/10 pt-6">
          <label className="block">
            <span className="mb-2 block text-sm text-white/65">Create account with email</span>
            <Input type="email" name="email" placeholder="founder@studio.com" required />
          </label>
          <label className="block">
            <Input type="password" name="password" placeholder="Create a password" required />
          </label>
          <Button className="w-full" type="submit" variant="secondary">
            Create account
          </Button>
        </form>
      </Card>
    </div>
  );
}
