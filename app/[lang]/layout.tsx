import { Toaster } from "@/components/ui/sonner";
import { routing } from "@/i18n/routing";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { PageWrapper } from "../(components)/(utils)/page-wrapper";
import ChatbotWrapper from "../(components)/ChatBotWrapper";
import SmoothScrolling from "../(components)/SmoothScrolling";
import "../globals.css";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const t = await getTranslations({ lang, namespace: "Metadata" });

  // Get the translations for the current language

  const title = t("title"); // Access translated title
  const description = t("description"); // Access translated description
  const keywords = t("keywords"); // Access translated keywords

  return {
    title: title,
    description: description,
    icons: {
      icon: "/img/logo.svg"
    },
    keywords: keywords,
    openGraph: {
      type: "website",
      locale: lang,
      url: "https://portfolio.bonefons.com",
      siteName: "Portfolio Alexandre Bonefons",
      images: [{ url: "/preview.png", alt: title }]
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      creator: "@alexandrebonefons"
    },
    metadataBase: new URL("https://portfolio.bonefons.com")
  };
}
export default async function LocaleLayout(props: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  const params = await props.params;

  const { children } = props;

  const { lang } = params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(lang as (typeof routing.locales)[number])) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();
  return (
    <html lang={lang}>
      <body className="antialiased" suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          <SmoothScrolling>
            <PageWrapper>{children}</PageWrapper>
            <ChatbotWrapper />
          </SmoothScrolling>
          <Toaster richColors position="top-left" duration={2000} />
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
