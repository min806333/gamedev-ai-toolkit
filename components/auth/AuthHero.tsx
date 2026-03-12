"use client";

import { Bot, Gamepad2, Layers3, Sparkles } from "lucide-react";
import { useLanguage } from "@/components/language-provider";

export function AuthHero() {
  const { language } = useLanguage();

  const content = {
    en: {
      eyebrow: "AI Game Studio",
      title: "Build games faster with AI",
      description: "Generate game ideas, Unity scripts, UI layouts, and production planning docs in one workspace.",
      points: ["Prompt-to-prototype workflows", "Production-ready planning outputs", "Built for indie teams and solo developers"],
      footer: "AI-powered workflows for concept, code, and production planning"
    },
    ko: {
      eyebrow: "AI 게임 스튜디오",
      title: "AI로 더 빠르게 게임을 만드세요",
      description: "게임 아이디어, Unity 스크립트, UI 레이아웃, 프로덕션 기획 문서를 하나의 워크스페이스에서 생성하세요.",
      points: ["프롬프트에서 프로토타입까지", "실무에 바로 쓰는 기획 결과물", "인디 팀과 솔로 개발자를 위한 워크플로"],
      footer: "콘셉트, 코드, 프로덕션 기획을 위한 AI 워크플로"
    }
  } as const;

  const copy = content[language];

  return (
    <section className="relative hidden overflow-hidden md:flex">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,161,122,0.2),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(112,214,255,0.16),transparent_28%),linear-gradient(160deg,#0b1220_0%,#10192c_45%,#0d1526_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_0%,rgba(255,255,255,0.04)_100%)]" />

      <div className="relative flex h-full w-full flex-col justify-between p-12 lg:p-16">
        <div className="flex items-center gap-3 text-sm font-medium text-white/80">
          <div className="rounded-2xl border border-white/10 bg-white/10 p-2 backdrop-blur">
            <Sparkles className="h-4 w-4" />
          </div>
          VertikerAI
        </div>

        <div className="max-w-xl">
          <p className="text-sm uppercase tracking-[0.28em] text-cyan-200/70">{copy.eyebrow}</p>
          <h1 className="mt-6 max-w-lg text-5xl font-semibold break-keep leading-tight text-white">{copy.title}</h1>
          <p className="mt-6 max-w-xl text-lg break-keep leading-relaxed text-white/68">{copy.description}</p>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-white/8 p-5 backdrop-blur">
              <Bot className="h-5 w-5 text-cyan-200" />
              <p className="mt-4 text-sm break-keep leading-relaxed text-white/72">{copy.points[0]}</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/8 p-5 backdrop-blur">
              <Layers3 className="h-5 w-5 text-orange-200" />
              <p className="mt-4 text-sm break-keep leading-relaxed text-white/72">{copy.points[1]}</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/8 p-5 backdrop-blur">
              <Gamepad2 className="h-5 w-5 text-emerald-200" />
              <p className="mt-4 text-sm break-keep leading-relaxed text-white/72">{copy.points[2]}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 text-sm text-white/45">
          <div className="h-px w-14 bg-white/10" />
          {copy.footer}
        </div>
      </div>
    </section>
  );
}
