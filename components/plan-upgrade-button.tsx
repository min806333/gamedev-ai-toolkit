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
  const hasActivePaidPlan = currentPlan === "pro" || currentPlan === "studio";
  const useBillingPortal = hasActivePaidPlan && targetPlan !== "free";
  const label =
    targetPlan === "pro"
      ? t.pricing.upgradeToPro
      : targetPlan === "studio"
        ? t.pricing.upgradeToStudio
        : t.pricing.switchPlan;

  async function handleClick() {
    if (!authenticated) {
      router.push("/signup");
      return;
    }

    if (loading) {
      return;
    }

    if (targetPlan === "free") {
      router.push("/dashboard");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(useBillingPortal ? "/api/stripe/portal" : "/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: useBillingPortal ? undefined : JSON.stringify({ plan: targetPlan })
      });

      const data = (await response.json()) as { url?: string; error?: string };

      if (!data.url) {
        throw new Error(data.error || "Missing checkout URL");
      }

      window.location.href = data.url;
    } catch (error) {
      console.error("Checkout redirect failed:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button
      onClick={handleClick}
      disabled={(isCurrent && targetPlan === "free") || loading}
      variant={targetPlan === "free" ? "secondary" : "primary"}
      className="w-full"
    >
      {loading
        ? t.pricing.managingPlan
        : useBillingPortal
          ? isCurrent
            ? "Manage billing"
            : "Change plan"
          : isCurrent
            ? t.pricing.currentPlan
            : label}
    </Button>
  );
}
