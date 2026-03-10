"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/language-provider";
import type { Plan } from "@/lib/types";

export function PlanUpgradeButton({
  targetPlan,
  currentPlan,
  authenticated
}: {
  targetPlan: Plan;
  currentPlan?: Plan;
  authenticated: boolean;
}) {
  const router = useRouter();
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);

  const isCurrent = currentPlan === targetPlan;
  const label =
    targetPlan === "pro"
      ? t.pricing.upgradeToPro
      : targetPlan === "studio"
        ? t.pricing.upgradeToStudio
        : t.pricing.switchPlan;

  async function handleClick() {
    if (!authenticated) {
      router.push("/login");
      return;
    }

    if (isCurrent || loading) {
      return;
    }

    if (targetPlan === "free") {
      router.push("/dashboard");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: targetPlan })
      });

      if (!response.ok) {
        throw new Error("Plan update failed");
      }

      const data = (await response.json()) as { url?: string };

      if (!data.url) {
        throw new Error("Missing checkout URL");
      }

      router.push(data.url);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button
      onClick={handleClick}
      disabled={isCurrent || loading}
      variant={targetPlan === "free" ? "secondary" : "primary"}
      className="w-full"
    >
      {loading ? t.pricing.managingPlan : isCurrent ? t.pricing.currentPlan : label}
    </Button>
  );
}
