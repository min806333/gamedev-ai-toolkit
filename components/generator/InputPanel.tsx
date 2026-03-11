"use client";

import { CustomSelect } from "@/components/ui/custom-select";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/components/language-provider";
import type { Field, Template } from "@/components/tool-form";

export function InputPanel({
  title,
  description,
  fields,
  values,
  templates,
  selectedTemplate,
  loading,
  error,
  isFormComplete,
  onValueChange,
  onSelectTemplate,
  onSubmit
}: {
  title: string;
  description: string;
  fields: Field[];
  values: Record<string, string>;
  templates?: Template[];
  selectedTemplate: string;
  loading: boolean;
  error: string;
  isFormComplete: boolean;
  onValueChange: (name: string, value: string) => void;
  onSelectTemplate: (templateLabel: string) => void;
  onSubmit: () => void;
}) {
  const { t } = useLanguage();

  return (
    <Card className="border-[color:var(--border)] bg-[linear-gradient(180deg,color-mix(in_srgb,var(--card)_92%,white_8%),var(--card))] p-6 lg:p-7">
      <div className="border-b border-[color:var(--border)] pb-6">
        <p className="text-xs uppercase tracking-[0.24em] text-[color:var(--foreground)]/45">{t.common.tryGenerator}</p>
        <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-[color:var(--foreground)]">
          {title}
        </h1>
        <p className="mt-3 max-w-xl text-sm leading-7 text-[color:var(--foreground)]/62">{description}</p>
      </div>

      {templates?.length ? (
        <div className="mt-6">
          <div className="mb-3 flex items-center justify-between gap-4">
            <span className="text-sm text-[color:var(--foreground)]/65">{t.common.promptTemplates}</span>
            {selectedTemplate ? (
              <span className="rounded-full border border-[color:var(--border)] bg-[color:var(--background)]/60 px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-[color:var(--foreground)]/55">
                {selectedTemplate}
              </span>
            ) : null}
          </div>
          <div className="flex flex-wrap gap-3">
            {templates.map((template) => (
              <button
                key={template.label}
                type="button"
                onClick={() => onSelectTemplate(template.label)}
                className={`rounded-full border px-4 py-2 text-sm transition ${
                  selectedTemplate === template.label
                    ? "border-[color:var(--foreground)] bg-[color:var(--foreground)] text-[color:var(--background)]"
                    : "border-[color:var(--border)] bg-[color:var(--background)]/55 text-[color:var(--foreground)]/75 hover:bg-[color:var(--card-strong)]"
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
          onSubmit();
        }}
        className="mt-6 space-y-4"
      >
        {fields.map((field) => (
          <label key={field.name} className="block">
            <span className="mb-2 block text-sm font-medium text-[color:var(--foreground)]/72">{field.label}</span>
            {field.type === "select" ? (
              <CustomSelect
                value={values[field.name]}
                onChange={(value) => onValueChange(field.name, value)}
                placeholder={field.placeholder || t.common.select}
                options={(field.options ?? []).map((option) => ({ value: option, label: option }))}
                buttonClassName="w-full bg-[color:var(--background)]/55"
              />
            ) : field.type === "textarea" ? (
              <textarea
                name={field.name}
                value={values[field.name]}
                onChange={(event) => onValueChange(field.name, event.target.value)}
                placeholder={field.placeholder}
                className="min-h-36 w-full rounded-2xl border border-[color:var(--border)] bg-[color:var(--background)]/55 px-4 py-3 text-sm text-[color:var(--foreground)] outline-none placeholder:text-[color:var(--foreground)]/35 focus:border-[color:var(--border-strong)]"
                required
              />
            ) : (
              <input
                name={field.name}
                value={values[field.name]}
                onChange={(event) => onValueChange(field.name, event.target.value)}
                placeholder={field.placeholder}
                className="w-full rounded-2xl border border-[color:var(--border)] bg-[color:var(--background)]/55 px-4 py-3 text-sm text-[color:var(--foreground)] outline-none placeholder:text-[color:var(--foreground)]/35 focus:border-[color:var(--border-strong)]"
                required
              />
            )}
          </label>
        ))}

        <Button disabled={loading || !isFormComplete} className="h-12 w-full rounded-2xl">
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-black/20 border-t-black dark:border-white/20 dark:border-t-white" />
              {t.common.generating}
            </span>
          ) : (
            t.common.generate
          )}
        </Button>

        {error ? <p className="text-sm text-red-300">{error}</p> : null}
      </form>
    </Card>
  );
}
