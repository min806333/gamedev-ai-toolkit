"use client";

import { Sidebar } from "@/components/dashboard/Sidebar";

export function DashboardShellClient({
  userEmail,
  children
}: {
  userEmail?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[color:var(--background)] text-[color:var(--foreground)]">
      <Sidebar userEmail={userEmail} />
      <main className="min-h-screen p-6 lg:ml-64 lg:p-8">
        <div className="mx-auto max-w-7xl">{children}</div>
      </main>
    </div>
  );
}
