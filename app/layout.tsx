import type { Metadata } from "next";
import Script from "next/script";

import { ThemeProvider } from "@/components/theme-provider";

import "./globals.css";

const siteUrl = "https://aitokencostcalculator.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "AI Token Cost Calculator — How Much Does Your AI Tool Cost?",
  description:
    "Free AI token calculator for OpenAI, Claude, Gemini, Grok, DeepSeek, Mistral, and Llama models. Estimate LLM API pricing, count tokens, and compare real AI usage costs.",
  keywords: ["AI token calculator", "LLM cost calculator", "AI pricing calculator", "token counter", "OpenAI pricing", "Claude pricing"],
  openGraph: {
    title: "AI Token Cost Calculator — How Much Does Your AI Tool Cost?",
    description:
      "Estimate token usage, compare model pricing, and see what your AI workflows cost before the invoice lands.",
    url: siteUrl,
    siteName: "AI Token Cost Calculator",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Token Cost Calculator — How Much Does Your AI Tool Cost?",
    description:
      "Compare OpenAI, Claude, Gemini, Grok, DeepSeek, Mistral, and Llama pricing with a clean token calculator.",
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider>{children}</ThemeProvider>
        <Script
          id="adsense-script"
          async
          strategy="afterInteractive"
          crossOrigin="anonymous"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
        />
      </body>
    </html>
  );
}
