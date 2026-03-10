"use client";

import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useLanguage } from "@/components/language-provider";
import { CustomSelect } from "@/components/ui/custom-select";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { Plan } from "@/lib/types";

type BaseField = {
  name: string;
  label: string;
  placeholder: string;
};

type TextField = BaseField & {
  type?: "text";
};

type SelectField = {
  name: string;
  label: string;
  options: string[];
  type: "select";
  placeholder?: string;
};

type TextareaField = BaseField & {
  type: "textarea";
};

type Field = TextField | SelectField | TextareaField;

type Template = {
  label: string;
  values: Record<string, string>;
};

function buildInitialValues(fields: Field[]) {
  return Object.fromEntries(fields.map((field) => [field.name, ""])) as Record<string, string>;
}

export function ToolForm({
  title,
  description,
  endpoint,
  fields,
  templates
}: {
  title: string;
  description: string;
  endpoint: string;
  fields: Field[];
  templates?: Template[];
}) {
  const { t } = useLanguage();
  const [values, setValues] = useState<Record<string, string>>(() => buildInitialValues(fields));
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [exported, setExported] = useState(false);
  const [cacheHit, setCacheHit] = useState(false);
  const [plan, setPlan] = useState<Plan>("free");
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    let active = true;

    void fetch("/api/account/plan")
      .then((response) => response.json())
      .then((data: { plan?: Plan }) => {
        if (active && data.plan) {
          setPlan(data.plan);
        }
      })
      .catch(() => {});

    return () => {
      active = false;
    };
  }, []);

  function setTemporaryState(setter: (value: boolean) => void) {
    setter(true);

    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = window.setTimeout(() => {
      setter(false);
    }, 2000);
  }

  function updateValue(name: string, value: string) {
    setValues((current) => ({
      ...current,
      [name]: value
    }));
  }

  function applyTemplate(templateLabel: string) {
    setSelectedTemplate(templateLabel);
    const template = templates?.find((item) => item.label === templateLabel);

    if (!template) {
      return;
    }

    setValues((current) => ({
      ...current,
      ...template.values
    }));
  }

  async function handleSubmit() {
    if (loading) {
      return;
    }

    setLoading(true);
    setError("");
    setResult("");
    setCacheHit(false);
    setCopied(false);
    setExported(false);

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values)
      });

      if (!response.ok) {
        throw new Error((await response.text()) || "Request failed");
      }

      setCacheHit(response.headers.get("X-Cache-Hit") === "1");

      if (!response.body) {
        setResult(await response.text());
        return;
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let aggregated = "";

      while (true) {
        const { value, done } = await reader.read();

        if (done) {
          break;
        }

        aggregated += decoder.decode(value, { stream: true });
        setResult(aggregated);
      }

      aggregated += decoder.decode();
      setResult(aggregated);
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : "Request failed");
    } finally {
      setLoading(false);
    }
  }

  async function handleCopy() {
    if (!result) {
      return;
    }

    await navigator.clipboard.writeText(result);
    setTemporaryState(setCopied);
  }

  function handleExport() {
    if (!result || plan === "free") {
      return;
    }

    const blob = new Blob([result], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${title.toLowerCase().replace(/\s+/g, "-")}.txt`;
    anchor.click();
    URL.revokeObjectURL(url);
    setTemporaryState(setExported);
  }

  const isFormComplete = fields.every((field) => values[field.name]?.trim());

  return (
    <div className="space-y-6">
      <div className="grid gap-6 xl:grid-cols-[420px_1fr]">
        <Card className="border-[color:var(--border)] bg-[color:var(--card)] p-6">
          <h1 className="font-display text-3xl font-semibold text-[color:var(--foreground)]">{title}</h1>
          <p className="mt-3 text-sm leading-7 text-[color:var(--foreground)]/60">{description}</p>

          {templates?.length ? (
            <div className="mt-8">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm text-[color:var(--foreground)]/65">{t.common.promptTemplates}</span>
                {selectedTemplate ? (
                  <span className="text-xs uppercase tracking-[0.2em] text-[color:var(--foreground)]/40">
                    {selectedTemplate}
                  </span>
                ) : null}
              </div>
              <div className="flex flex-wrap gap-3">
                {templates.map((template) => (
                  <button
                    key={template.label}
                    type="button"
                    onClick={() => applyTemplate(template.label)}
                    className={`rounded-full border px-4 py-2 text-sm transition ${
                      selectedTemplate === template.label
                        ? "border-[color:var(--foreground)] bg-[color:var(--foreground)] text-[color:var(--background)]"
                        : "border-[color:var(--border)] bg-[color:var(--card)] text-[color:var(--foreground)]/75 hover:bg-[color:var(--card-strong)]"
                    }`}
                  >
                    {template.label}
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          <form
            onSubmit={(event) => {
              event.preventDefault();
              void handleSubmit();
            }}
            className="mt-8 space-y-4"
          >
            {fields.map((field) => (
              <label key={field.name} className="block">
                <span className="mb-2 block text-sm text-[color:var(--foreground)]/65">{field.label}</span>
                {field.type === "select" ? (
                  <CustomSelect
                    value={values[field.name]}
                    onChange={(value) => updateValue(field.name, value)}
                    placeholder={field.placeholder || t.common.select}
                    options={field.options.map((option) => ({ value: option, label: option }))}
                    buttonClassName="w-full bg-[color:var(--background)]/50"
                  />
                ) : field.type === "textarea" ? (
                  <textarea
                    name={field.name}
                    value={values[field.name]}
                    onChange={(event) => updateValue(field.name, event.target.value)}
                    placeholder={field.placeholder}
                    className="min-h-32 w-full rounded-2xl border border-[color:var(--border)] bg-[color:var(--background)]/50 px-4 py-3 text-sm text-[color:var(--foreground)] outline-none placeholder:text-[color:var(--foreground)]/35 focus:border-[color:var(--border-strong)]"
                    required
                  />
                ) : (
                  <input
                    name={field.name}
                    value={values[field.name]}
                    onChange={(event) => updateValue(field.name, event.target.value)}
                    placeholder={field.placeholder}
                    className="w-full rounded-2xl border border-[color:var(--border)] bg-[color:var(--background)]/50 px-4 py-3 text-sm text-[color:var(--foreground)] outline-none placeholder:text-[color:var(--foreground)]/35 focus:border-[color:var(--border-strong)]"
                    required
                  />
                )}
              </label>
            ))}
            <Button disabled={loading || !isFormComplete} className="h-11 w-full">
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-black/20 border-t-black" />
                  {t.common.generating}
                </span>
              ) : (
                t.common.generate
              )}
            </Button>
            {error ? <p className="text-sm text-red-300">{error}</p> : null}
          </form>
        </Card>

        <Card className="min-h-[620px] border-[color:var(--border)] bg-[color:var(--card)] p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-[color:var(--foreground)]/45">{t.common.output}</p>
              <p className="mt-2 text-sm text-[color:var(--foreground)]/55">{t.common.resultHint}</p>
              {cacheHit ? <p className="mt-2 text-sm text-emerald-400">{t.common.cached}</p> : null}
            </div>
            <div className="flex flex-wrap items-center gap-3">
              {copied ? <span className="text-sm text-emerald-400">{t.common.copied}</span> : null}
              {exported ? <span className="text-sm text-sky-400">{t.common.exported}</span> : null}
              <button
                type="button"
                onClick={handleCopy}
                disabled={!result || loading}
                className="rounded-full border border-[color:var(--border)] bg-[color:var(--card)] px-4 py-2 text-sm text-[color:var(--foreground)] transition hover:bg-[color:var(--card-strong)] disabled:cursor-not-allowed disabled:opacity-40"
              >
                {t.common.copyResult}
              </button>
              <button
                type="button"
                onClick={handleExport}
                disabled={!result || loading || plan === "free"}
                className="rounded-full border border-[color:var(--border)] bg-[color:var(--card)] px-4 py-2 text-sm text-[color:var(--foreground)] transition hover:bg-[color:var(--card-strong)] disabled:cursor-not-allowed disabled:opacity-40"
              >
                {t.common.exportTxt}
              </button>
            </div>
          </div>
          {plan === "free" ? (
            <p className="mt-4 text-sm text-[color:var(--foreground)]/50">{t.pricing.saveExportNotice}</p>
          ) : null}

          {loading && !result ? (
            <div className="mt-6 flex min-h-[500px] flex-col items-center justify-center gap-5 rounded-2xl border border-[color:var(--border)] bg-[color:var(--background)]/45 text-center text-sm text-[color:var(--foreground)]/65">
              <span className="h-12 w-12 animate-spin rounded-full border-2 border-[color:var(--border)] border-t-[color:var(--foreground)]" />
              <div>
                <p className="font-medium text-[color:var(--foreground)]">{t.common.generating}</p>
                <p className="mt-2 text-[color:var(--foreground)]/50">{t.common.buildingResponse}</p>
              </div>
            </div>
          ) : (
            <div className="mt-6 max-h-[540px] overflow-y-auto rounded-2xl border border-[color:var(--border)] bg-[color:var(--background)]/45 p-5">
              {result ? (
                <div className="prose max-w-none text-sm leading-7 prose-headings:text-[color:var(--foreground)] prose-p:text-[color:var(--foreground)]/80 prose-li:text-[color:var(--foreground)]/80 prose-strong:text-[color:var(--foreground)] prose-code:text-[color:var(--foreground)] prose-pre:border prose-pre:border-[color:var(--border)] prose-pre:bg-[color:var(--background)]/70">
                  <ReactMarkdown>{result}</ReactMarkdown>
                </div>
              ) : (
                <div className="flex min-h-[500px] items-center justify-center rounded-2xl border border-dashed border-[color:var(--border)] text-sm text-[color:var(--foreground)]/45">
                  {t.common.resultPlaceholder}
                </div>
              )}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
