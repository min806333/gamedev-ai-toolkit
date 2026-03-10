"use client";

import ReactMarkdown from "react-markdown";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/components/language-provider";
import type { Plan } from "@/lib/types";

export function ResultPanel({
  loading,
  result,
  copied,
  exported,
  cacheHit,
  plan,
  onCopy,
  onExport
}: {
  loading: boolean;
  result: string;
  copied: boolean;
  exported: boolean;
  cacheHit: boolean;
  plan: Plan;
  onCopy: () => void;
  onExport: () => void;
}) {
  const { t } = useLanguage();

  return (
    <Card className="min-h-[640px] border-[color:var(--border)] bg-[linear-gradient(180deg,color-mix(in_srgb,var(--card)_94%,white_6%),var(--card))] p-6 lg:p-7">
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[color:var(--border)] pb-5">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-[color:var(--foreground)]/45">{t.common.output}</p>
          <p className="mt-2 max-w-xl text-sm leading-7 text-[color:var(--foreground)]/58">{t.common.resultHint}</p>
          {cacheHit ? <p className="mt-2 text-sm text-emerald-400">{t.common.cached}</p> : null}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {copied ? <span className="text-sm text-emerald-400">{t.common.copied}</span> : null}
          {exported ? <span className="text-sm text-sky-400">{t.common.exported}</span> : null}
          <Button
            type="button"
            onClick={onCopy}
            disabled={!result || loading}
            variant="secondary"
            className="rounded-full"
          >
            {t.common.copyResult}
          </Button>
          <Button
            type="button"
            onClick={onExport}
            disabled={!result || loading || plan === "free"}
            variant="secondary"
            className="rounded-full"
          >
            {t.common.exportTxt}
          </Button>
        </div>
      </div>

      {plan === "free" ? (
        <p className="mt-4 text-sm text-[color:var(--foreground)]/50">{t.pricing.saveExportNotice}</p>
      ) : null}

      {loading && !result ? (
        <div className="mt-6 flex min-h-[520px] flex-col items-center justify-center gap-5 rounded-2xl border border-[color:var(--border)] bg-[color:var(--background)]/45 text-center text-sm text-[color:var(--foreground)]/65">
          <span className="h-12 w-12 animate-spin rounded-full border-2 border-[color:var(--border)] border-t-[color:var(--foreground)]" />
          <div>
            <p className="font-medium text-[color:var(--foreground)]">{t.common.generating}</p>
            <p className="mt-2 text-[color:var(--foreground)]/50">{t.common.buildingResponse}</p>
          </div>
        </div>
      ) : (
        <div className="mt-6 max-h-[560px] overflow-y-auto rounded-2xl border border-[color:var(--border)] bg-[color:var(--background)]/45 p-5">
          {result ? (
            <div className="prose max-w-none text-sm leading-7 prose-headings:text-[color:var(--foreground)] prose-p:text-[color:var(--foreground)]/80 prose-li:text-[color:var(--foreground)]/80 prose-strong:text-[color:var(--foreground)] prose-code:text-[color:var(--foreground)] prose-pre:border prose-pre:border-[color:var(--border)] prose-pre:bg-[color:var(--background)]/70">
              <ReactMarkdown>{result}</ReactMarkdown>
            </div>
          ) : (
            <div className="flex min-h-[520px] items-center justify-center rounded-2xl border border-dashed border-[color:var(--border)] text-sm text-[color:var(--foreground)]/45">
              {t.common.resultPlaceholder}
            </div>
          )}
        </div>
      )}
    </Card>
  );
}
