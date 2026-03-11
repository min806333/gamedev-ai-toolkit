"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FileText,
  Gauge,
  History,
  LayoutDashboard,
  LayoutTemplate,
  Lightbulb,
  LogOut,
  Palette,
  ScrollText,
  Settings,
  Sparkles
} from "lucide-react";
import { LanguageSelector } from "@/components/language-selector";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/language-provider";
import { getToolConfig } from "@/lib/tools/tool-config";

const navIconClassName = "h-4 w-4";

export function Sidebar({ userEmail }: { userEmail?: string }) {
  const pathname = usePathname();
  const { t } = useLanguage();
  const ideaTool = getToolConfig("idea");
  const unityTool = getToolConfig("unity-script");
  const uiTool = getToolConfig("ui");
  const gddTool = getToolConfig("gdd");

  const items = [
    { href: "/dashboard", label: t.dashboard.overview, icon: LayoutDashboard },
    { href: ideaTool.route, label: t.dashboard.idea, icon: Lightbulb },
    { href: unityTool.route, label: t.dashboard.unity, icon: ScrollText },
    { href: uiTool.route, label: t.dashboard.ui, icon: LayoutTemplate },
    { href: "/pixel-art-generator", label: t.dashboard.pixelPrompt, icon: Palette },
    { href: gddTool.route, label: t.dashboard.gdd, icon: FileText },
    { href: "/dashboard/generations", label: t.dashboard.history, icon: History },
    { href: "/pricing", label: t.dashboard.usage, icon: Gauge },
    { href: "/pricing", label: t.dashboard.settings, icon: Settings }
  ];

  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-[color:var(--border)] bg-[color:var(--background-elevated)]/90 px-5 py-6 backdrop-blur-xl lg:flex lg:flex-col">
      <Link href="/" className="flex items-center gap-2 text-sm font-semibold text-[color:var(--foreground)]">
        <Sparkles className="h-4 w-4" />
        GameDev AI Toolkit
      </Link>

      <p className="mt-4 text-xs uppercase tracking-[0.24em] text-[color:var(--foreground)]/38">{t.dashboard.label}</p>

      <div className="mt-6 flex gap-3">
        <LanguageSelector />
        <ThemeToggle />
      </div>

      <nav className="mt-8 flex-1 space-y-2">
        {items.map((item) => {
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition ${
                active
                  ? "bg-[color:var(--foreground)] text-[color:var(--background)]"
                  : "text-[color:var(--foreground)]/65 hover:bg-[color:var(--card)] hover:text-[color:var(--foreground)]"
              }`}
            >
              <item.icon className={navIconClassName} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="rounded-3xl border border-[color:var(--border)] bg-[color:var(--card)] p-4">
        <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--foreground)]/40">{t.dashboard.account}</p>
        <p className="mt-3 break-all text-sm text-[color:var(--foreground)]">{userEmail}</p>
      </div>

      <form action="/api/auth/sign-out" method="post" className="mt-4">
        <Button variant="secondary" className="w-full">
          <LogOut className="mr-2 h-4 w-4" />
          {t.dashboard.signOut}
        </Button>
      </form>
    </aside>
  );
}
