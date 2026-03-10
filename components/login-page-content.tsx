"use client";

import { useLanguage } from "@/components/language-provider";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export function LoginPageContent({
  error,
  success
}: {
  error?: string;
  success?: string;
}) {
  const { t } = useLanguage();
  const authMessages = t.auth as typeof t.auth & { checkEmailSuccess?: string };
  const successMessage =
    success === "check-email"
      ? (authMessages.checkEmailSuccess ?? "Check your email to confirm your account, then sign in.")
      : success;

  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <Card className="w-full max-w-md p-8">
        <p className="text-sm uppercase tracking-[0.24em] text-white/45">{t.auth.label}</p>
        <h1 className="mt-3 text-3xl font-semibold text-white">{t.auth.title}</h1>
        <p className="mt-3 text-sm text-white/55">{t.auth.description}</p>
        {error ? (
          <p className="mt-4 rounded-2xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-200">{error}</p>
        ) : null}
        {successMessage ? (
          <p className="mt-4 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-200">
            {successMessage}
          </p>
        ) : null}
        <form action="/api/auth/sign-in" method="post" className="mt-8 space-y-4">
          <label className="block">
            <span className="mb-2 block text-sm text-white/65">{t.auth.email}</span>
            <Input type="email" name="email" placeholder={t.auth.emailPlaceholder} required />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm text-white/65">{t.auth.password}</span>
            <Input type="password" name="password" placeholder={t.auth.passwordPlaceholder} required />
          </label>
          <Button className="w-full" type="submit">
            {t.auth.continueWithEmail}
          </Button>
        </form>
        <form action="/api/auth/google" method="post" className="mt-3">
          <Button className="w-full" type="submit" variant="secondary">
            {t.auth.continueWithGoogle}
          </Button>
        </form>
        <form action="/api/auth/sign-up" method="post" className="mt-6 space-y-4 border-t border-white/10 pt-6">
          <label className="block">
            <span className="mb-2 block text-sm text-white/65">{t.auth.createAccountLabel}</span>
            <Input type="email" name="email" placeholder={t.auth.emailPlaceholder} required />
          </label>
          <label className="block">
            <Input type="password" name="password" placeholder={t.auth.createPasswordPlaceholder} required />
          </label>
          <Button className="w-full" type="submit" variant="secondary">
            {t.auth.createAccount}
          </Button>
        </form>
      </Card>
    </div>
  );
}
