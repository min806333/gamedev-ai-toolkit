import type { ReactNode } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { requireAdminUser } from "@/lib/auth/admin";

export default async function InternalConsoleLayout({
  children
}: {
  children: ReactNode;
}) {
  await requireAdminUser();

  return (
    <div className="min-h-screen bg-[color:var(--background)] px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-[color:var(--foreground)]/45">Internal Console</p>
            <h1 className="mt-2 text-3xl font-semibold text-[color:var(--foreground)]">Admin Dashboard</h1>
          </div>
        </div>
        <div className="flex flex-col gap-6 md:flex-row">
          <AdminSidebar />
          <div className="min-w-0 flex-1">{children}</div>
        </div>
      </div>
    </div>
  );
}
