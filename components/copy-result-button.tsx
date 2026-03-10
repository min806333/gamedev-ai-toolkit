"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/components/language-provider";

export function CopyResultButton({ text }: { text: string }) {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  async function handleCopy() {
    await navigator.clipboard.writeText(text);
    setCopied(true);

    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = window.setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  return (
    <div className="flex items-center gap-3">
      {copied ? <span className="text-sm text-emerald-400">{t.common.copied}</span> : null}
      <button
        type="button"
        onClick={handleCopy}
        className="rounded-full border border-[color:var(--border)] bg-[color:var(--card)] px-4 py-2 text-sm text-[color:var(--foreground)] transition hover:bg-[color:var(--card-strong)]"
      >
        {t.common.copyResult}
      </button>
    </div>
  );
}
