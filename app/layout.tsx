import type { Metadata } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";
import { LanguageProvider } from "@/components/language-provider";
import { ThemeProvider } from "@/components/theme-provider";
import { getRequestLanguage } from "@/lib/request-language";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-body"
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display"
});

export const metadata: Metadata = {
  title: "VertikerAI",
  description: "Generate game ideas, UI systems, and starter code with AI."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const language = getRequestLanguage();

  return (
    <html lang={language} suppressHydrationWarning>
      <body className={`${manrope.variable} ${spaceGrotesk.variable}`}>
        <ThemeProvider>
          <LanguageProvider initialLanguage={language}>{children}</LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
