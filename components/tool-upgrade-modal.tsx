"use client";

import Link from "next/link";
import { Lock, X } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { Plan } from "@/lib/types";
import { cn } from "@/lib/utils";

type ToolUpgradeModalProps = {
  open: boolean;
  onClose: () => void;
  toolName: string;
  toolDescription: string;
  requiredPlan: Plan;
  className?: string;
};

export function ToolUpgradeModal({
  open,
  onClose,
  toolName,
  toolDescription,
  requiredPlan,
  className
}: ToolUpgradeModalProps) {
  const { t, language } = useLanguage();

  if (!open) {
    return null;
  }

  const requiredPlanLabel = requiredPlan === "studio" ? t.common.planStudio : t.common.planPro;
  const availabilityCopy =
    language === "ko"
      ? requiredPlan === "studio"
        ? "이 도구는 스튜디오 플랜에서 사용할 수 있습니다."
        : "이 도구는 프로 플랜에서 사용할 수 있습니다."
      : requiredPlan === "studio"
        ? "This tool is available on the Studio plan."
        : "This tool is available on the Pro plan.";
  const requiredPlanCopy = language === "ko" ? "필요 플랜" : "Required plan";

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
      <Card
        className={cn(
          "w-full max-w-xl border-[color:var(--border-strong)] bg-[linear-gradient(160deg,color-mix(in_srgb,var(--background)_88%,black_12%),color-mix(in_srgb,var(--card)_94%,black_6%))] p-7 shadow-[0_32px_90px_rgba(0,0,0,0.45)] sm:p-8",
          className
        )}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 items-start gap-3">
            <div className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--background)]/55 p-3">
              <Lock className="h-5 w-5 text-[color:var(--foreground)]" />
            </div>
            <div className="min-w-0">
              <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--foreground)]/45">{t.premium.modalTitle}</p>
              <h2 className="mt-2 text-2xl font-semibold break-keep text-[color:var(--foreground)]">{toolName}</h2>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-[color:var(--border)] p-2 text-[color:var(--foreground)]/65 transition hover:bg-[color:var(--card-strong)] hover:text-[color:var(--foreground)]"
            aria-label={t.premium.close}
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-6 space-y-4">
          <p className="text-sm break-keep leading-7 text-[color:var(--foreground)]/72">{toolDescription}</p>
          <p className="text-sm break-keep leading-7 text-[color:var(--foreground)]/78">{availabilityCopy}</p>
          <div className="inline-flex items-center gap-3 rounded-2xl border border-[color:var(--border)] bg-[color:var(--background)]/45 px-4 py-3 text-sm">
            <span className="text-[color:var(--foreground)]/50">{requiredPlanCopy}</span>
            <span className="rounded-full border border-[color:var(--border)] bg-[color:var(--card)] px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-[color:var(--foreground)]/80">
              {requiredPlanLabel}
            </span>
          </div>
        </div>

        <div className="mt-7 flex flex-wrap gap-3">
          <Link href="/pricing">
            <Button className="h-11 px-5">{t.premium.cta}</Button>
          </Link>
          <Button variant="secondary" className="h-11 px-5" onClick={onClose}>
            {t.premium.close}
          </Button>
        </div>
      </Card>
    </div>
  );
}
