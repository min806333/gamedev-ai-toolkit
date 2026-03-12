"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { LogOut } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { LanguageSelector } from "@/components/language-selector";
import { ThemeToggle } from "@/components/theme-toggle";
import { useTheme, type Theme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CustomSelect } from "@/components/ui/custom-select";
import { getPlanLabel } from "@/lib/plan-label";
import type { Plan } from "@/lib/types";

const STORAGE_KEYS = {
  outputLanguage: "vertikerai-output-language",
  responseStyle: "vertikerai-response-style",
  modelPriority: "vertikerai-model-priority",
  historyLimit: "vertikerai-history-limit"
} as const;

function readStoredValue(key: string, fallback: string) {
  if (typeof window === "undefined") {
    return fallback;
  }

  return window.localStorage.getItem(key) ?? fallback;
}

function SettingRow({
  label,
  body,
  control
}: {
  label: string;
  body: string;
  control: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--background)]/30 p-4">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0">
          <p className="text-sm font-medium break-keep text-[color:var(--foreground)]">{label}</p>
          <p className="mt-1 text-sm break-keep leading-relaxed text-[color:var(--foreground)]/58">{body}</p>
        </div>
        <div className="w-full lg:w-64">{control}</div>
      </div>
    </div>
  );
}

export function SettingsPageContent({
  email,
  plan
}: {
  email: string;
  plan: Plan;
}) {
  const { t, language } = useLanguage();
  const { theme, setTheme } = useTheme();
  const copy = t.dashboard.settingsPage;
  const planLabel = getPlanLabel(plan, t);
  const [outputLanguage, setOutputLanguage] = useState("auto");
  const [responseStyle, setResponseStyle] = useState("balanced");
  const [modelPriority, setModelPriority] = useState("openai-first");
  const [historyLimit, setHistoryLimit] = useState("20");
  const isKorean = language === "ko";

  useEffect(() => {
    setOutputLanguage(readStoredValue(STORAGE_KEYS.outputLanguage, "auto"));
    setResponseStyle(readStoredValue(STORAGE_KEYS.responseStyle, "balanced"));
    setModelPriority(readStoredValue(STORAGE_KEYS.modelPriority, "openai-first"));
    setHistoryLimit(readStoredValue(STORAGE_KEYS.historyLimit, "20"));
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEYS.outputLanguage, outputLanguage);
  }, [outputLanguage]);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEYS.responseStyle, responseStyle);
  }, [responseStyle]);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEYS.modelPriority, modelPriority);
  }, [modelPriority]);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEYS.historyLimit, historyLimit);
  }, [historyLimit]);

  const themeOptions = [
    { value: "light", label: isKorean ? "라이트" : "Light" },
    { value: "dark", label: isKorean ? "다크" : "Dark" },
    { value: "system", label: isKorean ? "시스템" : "System" }
  ];
  const outputLanguageOptions = [
    { value: "auto", label: isKorean ? "입력 기준 자동" : "Auto from prompt" },
    { value: "ko", label: isKorean ? "한국어 우선" : "Prefer Korean" },
    { value: "en", label: isKorean ? "영어 우선" : "Prefer English" }
  ];
  const responseStyleOptions = [
    { value: "simple", label: isKorean ? "간단" : "Simple" },
    { value: "balanced", label: isKorean ? "균형" : "Balanced" },
    { value: "detailed", label: isKorean ? "상세" : "Detailed" }
  ];
  const modelPriorityOptions = [
    { value: "openai-first", label: isKorean ? "OpenAI 우선" : "OpenAI first" },
    { value: "claude-fallback", label: isKorean ? "Claude fallback" : "Claude fallback" }
  ];
  const historyLimitOptions = [
    { value: "10", label: isKorean ? "10개" : "10 items" },
    { value: "20", label: isKorean ? "20개" : "20 items" },
    { value: "30", label: isKorean ? "30개" : "30 items" },
    { value: "50", label: isKorean ? "50개" : "50 items" }
  ];
  const workspaceDefaultsTitle = isKorean ? "기본 생성 설정" : "Workspace defaults";
  const workspaceDefaultsBody = isKorean
    ? "새 생성에 사용할 기본 출력 방향을 먼저 정리해 둘 수 있습니다."
    : "Review the defaults that should guide future generations.";
  const autoSaveTitle = isKorean ? "자동 저장" : "Auto save";
  const autoSaveBody = isKorean
    ? "성공한 생성은 이제 즉시 기록과 사용량에 반영되므로 자동 저장은 항상 켜져 있습니다."
    : "Successful generations are now saved immediately, so auto save remains always on.";
  const sessionTitle = isKorean ? "세션" : "Session";
  const sessionBody = isKorean ? "현재 로그인 세션과 결제 관리로 바로 이동할 수 있습니다." : "Manage the current session and billing shortcuts.";

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm uppercase tracking-[0.24em] text-[color:var(--foreground)]/45">{copy.label}</p>
        <h1 className="mt-3 text-4xl font-semibold break-keep text-[color:var(--foreground)]">{copy.title}</h1>
        <p className="mt-3 max-w-3xl break-keep leading-relaxed text-[color:var(--foreground)]/60">{copy.description}</p>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <Card className="border-[color:var(--border)] bg-[color:var(--card)] p-6">
          <h2 className="text-xl font-semibold break-keep text-[color:var(--foreground)]">{copy.appearance}</h2>
          <p className="mt-3 break-keep leading-relaxed text-[color:var(--foreground)]/60">{copy.appearanceBody}</p>
          <div className="mt-6 space-y-4">
            <SettingRow
              label={isKorean ? "인터페이스 언어" : "Interface language"}
              body={isKorean ? "사이트 탐색과 생성기 UI 언어를 바꿉니다." : "Switch the main workspace UI language."}
              control={<LanguageSelector />}
            />
            <SettingRow
              label={isKorean ? "테마 모드" : "Theme mode"}
              body={isKorean ? "라이트, 다크, 시스템 테마를 선택할 수 있습니다." : "Choose light, dark, or system theme."}
              control={
                <CustomSelect
                  value={theme}
                  onChange={(value) => setTheme(value as Theme)}
                  options={themeOptions}
                  placeholder={isKorean ? "테마 선택" : "Select theme"}
                />
              }
            />
            <div className="flex justify-end">
              <ThemeToggle />
            </div>
          </div>
        </Card>

        <Card className="border-[color:var(--border)] bg-[color:var(--card)] p-6">
          <h2 className="text-xl font-semibold break-keep text-[color:var(--foreground)]">{workspaceDefaultsTitle}</h2>
          <p className="mt-3 break-keep leading-relaxed text-[color:var(--foreground)]/60">{workspaceDefaultsBody}</p>
          <div className="mt-6 space-y-4">
            <SettingRow
              label={isKorean ? "출력 언어" : "Output language"}
              body={isKorean ? "새 생성 결과의 기본 언어 선호도를 저장합니다." : "Store your default language preference for future outputs."}
              control={
                <CustomSelect
                  value={outputLanguage}
                  onChange={setOutputLanguage}
                  options={outputLanguageOptions}
                  placeholder={isKorean ? "출력 언어 선택" : "Select output language"}
                />
              }
            />
            <SettingRow
              label={isKorean ? "AI 응답 스타일" : "AI response style"}
              body={isKorean ? "간단, 균형, 상세 중 기본 응답 밀도를 정합니다." : "Choose the default response density for future generations."}
              control={
                <CustomSelect
                  value={responseStyle}
                  onChange={setResponseStyle}
                  options={responseStyleOptions}
                  placeholder={isKorean ? "응답 스타일 선택" : "Select response style"}
                />
              }
            />
            <SettingRow
              label={isKorean ? "기본 모델 우선순위" : "Model priority"}
              body={isKorean ? "기본 공급자 우선순위를 저장합니다." : "Store the preferred provider ordering for future generations."}
              control={
                <CustomSelect
                  value={modelPriority}
                  onChange={setModelPriority}
                  options={modelPriorityOptions}
                  placeholder={isKorean ? "모델 우선순위 선택" : "Select model priority"}
                />
              }
            />
            <SettingRow
              label={isKorean ? "히스토리 표시 개수" : "History item count"}
              body={isKorean ? "생성 기록 화면에서 우선 보여줄 개수 기본값입니다." : "Set the default number of history items to keep in view."}
              control={
                <CustomSelect
                  value={historyLimit}
                  onChange={setHistoryLimit}
                  options={historyLimitOptions}
                  placeholder={isKorean ? "개수 선택" : "Select item count"}
                />
              }
            />
          </div>
        </Card>

        <Card className="border-[color:var(--border)] bg-[color:var(--card)] p-6">
          <h2 className="text-xl font-semibold break-keep text-[color:var(--foreground)]">{copy.account}</h2>
          <p className="mt-3 break-keep leading-relaxed text-[color:var(--foreground)]/60">{copy.accountBody}</p>
          <div className="mt-6 space-y-4 text-sm leading-relaxed text-[color:var(--foreground)]/72">
            <div>
              <p className="text-[color:var(--foreground)]/45">{t.auth.email}</p>
              <p className="mt-1 break-all text-[color:var(--foreground)]">{email}</p>
            </div>
            <div>
              <p className="text-[color:var(--foreground)]/45">{t.dashboard.plan}</p>
              <p className="mt-1 text-[color:var(--foreground)]">{planLabel}</p>
            </div>
          </div>
          <div className="mt-6 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm break-keep text-emerald-200">
            <p className="font-medium">{autoSaveTitle}</p>
            <p className="mt-1 leading-relaxed">{autoSaveBody}</p>
          </div>
        </Card>

        <Card className="border-[color:var(--border)] bg-[color:var(--card)] p-6">
          <h2 className="text-xl font-semibold break-keep text-[color:var(--foreground)]">{sessionTitle}</h2>
          <p className="mt-3 break-keep leading-relaxed text-[color:var(--foreground)]/60">{sessionBody}</p>
          <p className="mt-6 break-keep leading-relaxed text-[color:var(--foreground)]/60">{copy.billingBody}</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link href="/pricing" className="inline-flex">
              <Button className="h-12 px-5">{copy.billingCta}</Button>
            </Link>
            <form action="/api/auth/sign-out" method="post" className="inline-flex">
              <Button variant="secondary" className="h-12 px-5">
                <LogOut className="h-4 w-4" />
                {t.dashboard.signOut}
              </Button>
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
}
