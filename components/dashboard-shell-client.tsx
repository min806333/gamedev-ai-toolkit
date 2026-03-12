"use client";

import Link from "next/link";
import { Menu, Sparkles, X } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/components/language-provider";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Button } from "@/components/ui/button";

export function DashboardShellClient({
  userEmail,
  children
}: {
  userEmail?: string;
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-[color:var(--background)] text-[color:var(--foreground)]">
      <Sidebar userEmail={userEmail} />

      <div className="sticky top-0 z-40 border-b border-[color:var(--border)] bg-[color:var(--background-elevated)]/90 px-4 py-3 backdrop-blur-xl lg:hidden">
        <div className="flex items-center justify-between gap-3">
          <Link href="/dashboard" className="inline-flex min-w-0 items-center gap-2 text-sm font-semibold text-[color:var(--foreground)]">
            <Sparkles className="h-4 w-4 shrink-0" />
            <span className="break-keep whitespace-nowrap">VertikerAI</span>
          </Link>
          <Button type="button" variant="secondary" className="h-10 px-3" onClick={() => setMobileOpen((current) => !current)}>
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {mobileOpen ? (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <button type="button" className="flex-1 bg-black/60" aria-label={t.common.closeNavigation} onClick={() => setMobileOpen(false)} />
          <Sidebar userEmail={userEmail} mobile onNavigate={() => setMobileOpen(false)} />
        </div>
      ) : null}

      <main className="min-h-screen px-4 pb-8 pt-4 sm:px-6 lg:ml-72 lg:px-8 lg:py-8">
        <div className="mx-auto max-w-7xl min-w-0">{children}</div>
      </main>
    </div>
  );
}
