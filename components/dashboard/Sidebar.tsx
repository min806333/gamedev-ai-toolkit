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
import { cn } from "@/lib/utils";

const navIconClassName = "h-4 w-4 shrink-0";

export function Sidebar({
  userEmail,
  mobile = false,
  onNavigate
}: {
  userEmail?: string;
  mobile?: boolean;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const { t } = useLanguage();
  const ideaTool = getToolConfig("idea");
  const unityTool = getToolConfig("unity-script");
  const uiTool = getToolConfig("ui");
  const pixelArtTool = getToolConfig("pixel-art");
  const gddTool = getToolConfig("gdd");

  const items = [
    { href: "/dashboard", label: t.dashboard.overview, icon: LayoutDashboard },
    { href: ideaTool.route, label: t.dashboard.idea, icon: Lightbulb },
    { href: unityTool.route, label: t.dashboard.unity, icon: ScrollText },
    { href: uiTool.route, label: t.dashboard.ui, icon: LayoutTemplate },
    { href: pixelArtTool.route, label: t.dashboard.pixelPrompt, icon: Palette },
    { href: gddTool.route, label: t.dashboard.gdd, icon: FileText },
    { href: "/dashboard/history", label: t.dashboard.history, icon: History },
    { href: "/dashboard/usage", label: t.dashboard.usage, icon: Gauge },
    { href: "/dashboard/settings", label: t.dashboard.settings, icon: Settings }
  ];

  return (
    <aside
      className={cn(
        "z-30 flex flex-col overflow-y-auto border-r border-[color:var(--border)] bg-[color:var(--background-elevated)]/95 px-5 py-6 backdrop-blur-xl",
        mobile ? "h-full w-[min(86vw,20rem)]" : "fixed inset-y-0 left-0 hidden w-72 lg:flex"
      )}
    >
      <Link href="/dashboard" onClick={onNavigate} className="inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--foreground)]">
        <Sparkles className="h-4 w-4 shrink-0" />
        <span className="break-keep whitespace-nowrap">VertikerAI</span>
      </Link>

      <p className="mt-4 text-xs uppercase tracking-[0.24em] text-[color:var(--foreground)]/38">{t.dashboard.label}</p>

      <div className="mt-6 flex flex-wrap gap-3">
        <LanguageSelector />
        <ThemeToggle />
      </div>

      <nav className="mt-8 flex-1 space-y-2">
        {items.map((item) => {
          const active = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={cn(
                "flex min-w-0 items-start gap-3 rounded-2xl px-4 py-3 text-sm transition",
                active
                  ? "bg-[color:var(--foreground)] text-[color:var(--background)]"
                  : "text-[color:var(--foreground)]/65 hover:bg-[color:var(--card)] hover:text-[color:var(--foreground)]"
              )}
            >
              <item.icon className={navIconClassName} />
              <span className="min-w-0 break-keep whitespace-normal leading-relaxed">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="rounded-3xl border border-[color:var(--border)] bg-[color:var(--card)] p-4">
        <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--foreground)]/40">{t.dashboard.account}</p>
        <p className="mt-3 break-all text-sm leading-relaxed text-[color:var(--foreground)]">{userEmail}</p>
      </div>

      <form action="/api/auth/sign-out" method="post" className="mt-4">
        <Button variant="secondary" className="h-12 w-full">
          <LogOut className="h-4 w-4" />
          {t.dashboard.signOut}
        </Button>
      </form>
    </aside>
  );
}
