"use client";

import Link from "next/link";
import { Lock, X } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/components/language-provider";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { Plan } from "@/lib/types";

export function PremiumToolGate({
  plan,
  requiredPlan,
  message,
  children
}: {
  plan: Plan;
  requiredPlan: Plan;
  message: string;
  children: React.ReactNode;
}) {
  const { t } = useLanguage();
  const [open, setOpen] = useState(true);

  if ((requiredPlan === "pro" && (plan === "pro" || plan === "studio")) || (requiredPlan === "studio" && plan === "studio")) {
    return <>{children}</>;
  }

  return (
    <div className="relative min-h-[70vh]">
      <div className="pointer-events-none opacity-15 blur-[3px]">{children}</div>
      {open ? (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm">
          <Card className="w-full max-w-xl border-[color:var(--border)] bg-[color:var(--card)] p-8 shadow-panel">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--background)]/35 p-3">
                  <Lock className="h-5 w-5 text-[color:var(--foreground)]" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--foreground)]/45">
                    {requiredPlan === "studio" ? t.premium.studioBadge : t.premium.badge}
                  </p>
                  <h1 className="mt-1 text-2xl font-semibold text-[color:var(--foreground)]">{t.premium.modalTitle}</h1>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full border border-[color:var(--border)] p-2 text-[color:var(--foreground)]/65 transition hover:bg-[color:var(--card-strong)]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-5 text-sm leading-7 text-[color:var(--foreground)]/65">{message}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/pricing">
                <Button>{requiredPlan === "studio" ? t.pricing.upgradeToStudio : t.pricing.upgradeToPro}</Button>
              </Link>
              <Button variant="secondary" onClick={() => setOpen(false)}>
                {t.premium.close}
              </Button>
            </div>
          </Card>
        </div>
      ) : null}
    </div>
  );
}
