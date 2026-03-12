"use client";

import Link from "next/link";
import { Github, MoveRight } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export function LoginCard({
  error,
  success
}: {
  error?: string;
  success?: string;
}) {
  const { t } = useLanguage();
  const authCopy = t.auth as typeof t.auth & {
    login_title?: string;
    continue_google?: string;
    continue_github?: string;
    or?: string;
    signup?: string;
    no_account?: string;
    have_account?: string;
  };

  return (
    <Card className="w-full max-w-md rounded-2xl border-[color:var(--border)] bg-[color:var(--card)] p-8 shadow-xl">
      <h2 className="text-2xl font-semibold text-[color:var(--foreground)]">{authCopy.login_title ?? "VertikerAI"}</h2>

      {error ? (
        <p className="mt-4 rounded-2xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm break-keep text-red-200">{error}</p>
      ) : null}
      {success ? (
        <p className="mt-4 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm break-keep text-emerald-200">
          {success}
        </p>
      ) : null}

      <div className="mt-8 space-y-3">
        <form action="/api/auth/google" method="post">
          <Button className="h-12 w-full justify-start gap-3 rounded-2xl" type="submit" variant="secondary">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[color:var(--border)] bg-[color:var(--background)]/45">
              <MoveRight className="h-4 w-4" />
            </span>
            <span className="break-keep whitespace-normal text-left">{authCopy.continue_google ?? t.auth.continueWithGoogle}</span>
          </Button>
        </form>
        <form action="/api/auth/github" method="post">
          <Button className="h-12 w-full justify-start gap-3 rounded-2xl" type="submit" variant="secondary">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[color:var(--border)] bg-[color:var(--background)]/45">
              <Github className="h-4 w-4" />
            </span>
            <span className="break-keep whitespace-normal text-left">{authCopy.continue_github ?? t.auth.continueWithGithub}</span>
          </Button>
        </form>
      </div>

      <div className="my-8 flex items-center gap-4">
        <div className="h-px flex-1 bg-[color:var(--border)]" />
        <span className="text-xs font-medium tracking-[0.24em] text-[color:var(--foreground)]/38">{authCopy.or ?? t.auth.divider}</span>
        <div className="h-px flex-1 bg-[color:var(--border)]" />
      </div>

      <form action="/api/auth/sign-in" method="post" className="space-y-4">
        <label className="block">
          <span className="mb-2 block text-sm text-[color:var(--foreground)]/68">{t.auth.email}</span>
          <Input type="email" name="email" placeholder={t.auth.emailPlaceholder} required />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm text-[color:var(--foreground)]/68">{t.auth.password}</span>
          <Input type="password" name="password" placeholder={t.auth.passwordPlaceholder} required />
        </label>
        <Button className="mt-2 h-12 w-full rounded-2xl bg-white text-black hover:bg-zinc-200" type="submit">
          {t.auth.loginButton ?? t.auth.login}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm break-keep text-[color:var(--foreground)]/58">
        {authCopy.no_account ?? t.auth.noAccount}{" "}
        <Link href="/signup" className="font-medium text-[color:var(--foreground)] transition hover:opacity-80">
          {authCopy.signup ?? t.auth.createAccountLink}
        </Link>
      </p>
    </Card>
  );
}
