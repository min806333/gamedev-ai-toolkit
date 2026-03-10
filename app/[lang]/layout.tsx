import { notFound } from "next/navigation";
import { isSupportedLanguage, supportedLanguages } from "@/lib/i18n-routing";

export function generateStaticParams() {
  return supportedLanguages.map((lang) => ({ lang }));
}

export default function LanguageLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  if (!isSupportedLanguage(params.lang)) {
    notFound();
  }

  return <div lang={params.lang}>{children}</div>;
}
