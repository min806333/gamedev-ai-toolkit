"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { InputPanel } from "@/components/generator/InputPanel";
import { ResultPanel } from "@/components/generator/ResultPanel";
import type { ToolCopy } from "@/lib/tools/types";
import type { Plan } from "@/lib/types";

export type Field = ToolCopy["fields"][number];
export type Template = NonNullable<ToolCopy["templates"]>[number];

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
  const router = useRouter();
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

    let shouldRefresh = false;

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
        shouldRefresh = true;
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
      shouldRefresh = true;
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : "Request failed");
    } finally {
      if (shouldRefresh) {
        router.refresh();
      }

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
    <div className="mx-auto w-full max-w-7xl min-w-0">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-start">
        <InputPanel
          title={title}
          description={description}
          fields={fields}
          values={values}
          templates={templates}
          selectedTemplate={selectedTemplate}
          loading={loading}
          error={error}
          isFormComplete={isFormComplete}
          onValueChange={updateValue}
          onSelectTemplate={applyTemplate}
          onSubmit={() => {
            void handleSubmit();
          }}
        />
        <ResultPanel
          loading={loading}
          result={result}
          copied={copied}
          exported={exported}
          cacheHit={cacheHit}
          plan={plan}
          onCopy={() => {
            void handleCopy();
          }}
          onExport={handleExport}
        />
      </div>
    </div>
  );
}
