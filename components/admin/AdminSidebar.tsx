"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { INTERNAL_CONSOLE_LINKS } from "@/lib/admin-console";

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full rounded-3xl border border-zinc-800 bg-zinc-950/80 p-4 md:w-64 md:shrink-0">
      <p className="px-3 text-xs uppercase tracking-[0.24em] text-zinc-500">Vertiker AI</p>
      <h2 className="px-3 pt-2 text-lg font-semibold text-white">Admin Console</h2>
      <nav className="mt-5 space-y-2">
        {INTERNAL_CONSOLE_LINKS.map((link) => {
          const active = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`block rounded-2xl px-3 py-3 text-sm transition ${
                active
                  ? "bg-white text-black"
                  : "text-zinc-300 hover:bg-zinc-900 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

