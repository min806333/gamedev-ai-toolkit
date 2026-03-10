"use client";

import Link from "next/link";
import { Github, MoveRight } from "lucide-react";
import { FormEvent, useState } from "react";
import { useLanguage } from "@/components/language-provider";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type AuthMode = "login" | "signup";

export function LoginPageContent({
  mode,
  error,
  success
}: {
  mode: AuthMode;
  error?: string;
  success?: string;
}) {
  const { t } = useLanguage();
  const [localError, setLocalError] = useState("");
  const authMessages = t.auth as typeof t.auth & {
    continueWithGithub?: string;
    divider?: string;
    confirmPassword?: string;
    confirmPasswordPlaceholder?: string;
    loginButton?: string;
    signupButton?: string;
    noAccount?: string;
    createAccountLink?: string;
    haveAccount?: string;
    loginLink?: string;
    signupTitle?: string;
    signupDescription?: string;
  };

  const isSignup = mode === "signup";
  const title = isSignup ? authMessages.signupTitle ?? t.auth.createAccount : t.auth.title;
  const description = isSignup
    ? authMessages.signupDescription ?? t.auth.description
    : t.auth.description;
  const formAction = isSignup ? "/api/auth/sign-up" : "/api/auth/sign-in";
  const submitLabel = isSignup ? authMessages.signupButton ?? t.auth.createAccount : authMessages.loginButton ?? t.auth.continueWithEmail;
  const bottomText = isSignup ? authMessages.haveAccount ?? "Already have an account?" : authMessages.noAccount ?? "Don't have an account?";
  const bottomLinkHref = isSignup ? "/login" : "/signup";
  const bottomLinkLabel = isSignup ? authMessages.loginLink ?? "Login" : authMessages.createAccountLink ?? "Create account";
  const successMessage = success === "check-email" ? t.auth.checkEmailSuccess : success;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    if (!isSignup) {
      setLocalError("");
      return;
    }

    const formData = new FormData(event.currentTarget);
    const password = String(formData.get("password") || "");
    const confirmPassword = String(formData.get("confirmPassword") || "");

    if (password !== confirmPassword) {
      event.preventDefault();
      setLocalError(t.auth.passwordMismatch);
      return;
    }

    setLocalError("");
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-12">
      <Card className="w-full max-w-[420px] rounded-xl border border-[color:var(--border)] bg-[color:var(--card)] p-8 shadow-panel">
        <p className="text-sm uppercase tracking-[0.24em] text-[color:var(--foreground)]/45">{t.auth.label}</p>
        <h1 className="mt-3 text-3xl font-semibold text-[color:var(--foreground)]">{title}</h1>
        <p className="mt-3 text-sm leading-7 text-[color:var(--foreground)]/60">{description}</p>

        {error ? (
          <p className="mt-4 rounded-2xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-200">{error}</p>
        ) : null}
        {localError ? (
          <p className="mt-4 rounded-2xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-200">{localError}</p>
        ) : null}
        {successMessage ? (
          <p className="mt-4 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-200">
            {successMessage}
          </p>
        ) : null}

        <div className="mt-8 space-y-3">
          <form action="/api/auth/google" method="post">
            <Button className="w-full justify-start gap-3" type="submit" variant="secondary">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[color:var(--border)] bg-[color:var(--background)]/45">
                <MoveRight className="h-4 w-4" />
              </span>
              {t.auth.continueWithGoogle}
            </Button>
          </form>
          <form action="/api/auth/github" method="post">
            <Button className="w-full justify-start gap-3" type="submit" variant="secondary">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[color:var(--border)] bg-[color:var(--background)]/45">
                <Github className="h-4 w-4" />
              </span>
              {authMessages.continueWithGithub ?? "Continue with GitHub"}
            </Button>
          </form>
        </div>

        <div className="mt-8 flex items-center gap-4">
          <div className="h-px flex-1 bg-[color:var(--border)]" />
          <span className="text-xs uppercase tracking-[0.24em] text-[color:var(--foreground)]/35">
            {authMessages.divider ?? "Or"}
          </span>
          <div className="h-px flex-1 bg-[color:var(--border)]" />
        </div>

        <form action={formAction} method="post" onSubmit={handleSubmit} className="mt-8 space-y-4">
          <label className="block">
            <span className="mb-2 block text-sm text-[color:var(--foreground)]/65">{t.auth.email}</span>
            <Input type="email" name="email" placeholder={t.auth.emailPlaceholder} required />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm text-[color:var(--foreground)]/65">{t.auth.password}</span>
            <Input type="password" name="password" placeholder={t.auth.passwordPlaceholder} required />
          </label>
          {isSignup ? (
            <label className="block">
              <span className="mb-2 block text-sm text-[color:var(--foreground)]/65">
                {authMessages.confirmPassword ?? "Confirm password"}
              </span>
              <Input
                type="password"
                name="confirmPassword"
                placeholder={authMessages.confirmPasswordPlaceholder ?? "Confirm your password"}
                required
              />
            </label>
          ) : null}
          <Button className="w-full" type="submit">
            {submitLabel}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-[color:var(--foreground)]/60">
          {bottomText}{" "}
          <Link href={bottomLinkHref} className="font-medium text-[color:var(--foreground)] transition hover:opacity-80">
            {bottomLinkLabel}
          </Link>
        </p>
      </Card>
    </div>
  );
}
