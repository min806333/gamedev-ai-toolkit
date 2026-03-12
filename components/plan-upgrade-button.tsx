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
  const { t, language } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const isCurrent = currentPlan === targetPlan;
  const hasActivePaidPlan = currentPlan === "pro" || currentPlan === "studio";
  const useBillingPortal = hasActivePaidPlan && targetPlan !== "free";
  const label =
    targetPlan === "pro"
      ? t.pricing.upgradeToPro
      : targetPlan === "studio"
        ? t.pricing.upgradeToStudio
        : t.pricing.switchPlan;
  const manageBillingLabel = language === "ko" ? "결제 관리" : "Manage billing";
  const changePlanLabel = language === "ko" ? "플랜 변경" : "Change plan";
  const genericError =
    language === "ko"
      ? "결제 페이지를 여는 중 문제가 발생했습니다. 잠시 후 다시 시도해 주세요."
      : "We could not open billing right now. Please try again.";
  const timeoutError =
    language === "ko"
      ? "응답이 지연되고 있습니다. 잠시 후 다시 시도해 주세요."
      : "Billing is taking too long to respond. Please try again.";

  function localizeError(message: string) {
    if (language !== "ko") {
      return message || genericError;
    }

    if (!message) {
      return genericError;
    }

    if (message.includes("Unauthorized")) {
      return "로그인이 필요합니다.";
    }

    if (message.includes("Invalid plan")) {
      return "선택한 플랜 정보를 확인할 수 없습니다.";
    }

    if (message.includes("Unable to load plan details")) {
      return "플랜 정보를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.";
    }

    if (message.includes("Stripe price ID is not configured")) {
      return "이 플랜의 결제 가격 정보가 아직 설정되지 않았습니다. 운영 설정을 확인해 주세요.";
    }

    if (message.includes("No active billing account found")) {
      return "활성 결제 계정을 찾을 수 없습니다. 요금제 페이지에서 다시 시도해 주세요.";
    }

    if (message.includes("Missing checkout URL")) {
      return "결제 페이지 주소를 불러오지 못했습니다.";
    }

    if (message.includes("A verified email is required for billing")) {
      return "결제를 진행하려면 인증된 이메일이 필요합니다.";
    }

    if (message.includes("Unable to prepare billing profile")) {
      return "결제용 고객 정보를 준비하지 못했습니다. 잠시 후 다시 시도해 주세요.";
    }

    return genericError;
  }

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
    setErrorMessage("");

    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 15000);

    try {
      const response = await fetch(useBillingPortal ? "/api/stripe/portal" : "/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: useBillingPortal ? undefined : JSON.stringify({ plan: targetPlan }),
        signal: controller.signal
      });

      const contentType = response.headers.get("content-type") ?? "";
      let data: { url?: string; error?: string } = {};

      if (contentType.includes("application/json")) {
        data = (await response.json()) as { url?: string; error?: string };
      } else {
        data = { error: (await response.text()) || undefined };
      }

      if (!response.ok || !data.url) {
        throw new Error(data.error || "Missing checkout URL");
      }

      window.location.assign(data.url);
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        setErrorMessage(timeoutError);
      } else if (error instanceof Error) {
        setErrorMessage(localizeError(error.message));
      } else {
        setErrorMessage(genericError);
      }

      console.error("Checkout redirect failed:", error);
    } finally {
      window.clearTimeout(timeoutId);
      setLoading(false);
    }
  }

  return (
    <div className="space-y-3">
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
              ? manageBillingLabel
              : changePlanLabel
            : isCurrent
              ? t.pricing.currentPlan
              : label}
      </Button>
      {errorMessage ? <p className="text-sm break-keep text-rose-300">{errorMessage}</p> : null}
    </div>
  );
}
