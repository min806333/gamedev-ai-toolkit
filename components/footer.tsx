"use client";

import { useLanguage } from "@/components/language-provider";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-[color:var(--border)] py-8 text-center text-sm text-[color:var(--foreground)]/45">
      {t.footer.builtWith}
    </footer>
  );
}
