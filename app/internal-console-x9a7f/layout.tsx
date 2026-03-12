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
    <div className="min-h-screen bg-[color:var(--background)] px-4 py-8 sm:px-6 sm:py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-[color:var(--foreground)]/45">내부 운영</p>
            <h1 className="mt-2 text-3xl font-semibold break-keep text-[color:var(--foreground)]">관리자 대시보드</h1>
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
