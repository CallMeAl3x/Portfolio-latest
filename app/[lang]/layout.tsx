import { Toaster } from "@/components/ui/sonner";
import { routing } from "@/i18n/routing";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { PageWrapper } from "../(components)/(utils)/page-wrapper";
import ChatbotWrapper from "../(components)/ChatBotWrapper";
import SmoothScrolling from "../(components)/SmoothScrolling";
import "../globals.css";

export async function generateMetadata(props: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const params = await props.params;
  const { lang } = params;

  return {
    title: "Portfolio Alexandre Bonefons",
    description: "Portfolio Alexandre Bonefons présentant ses projets de développement web et mobile.",
    icons: {
      icon: "/img/logo.svg"
    },
    openGraph: {
      type: "website",
      locale: lang,
      url: "https://portfolio.bonefons.fr",
      siteName: "Portfolio Alexandre Bonefons",
      images: [{ url: "/preview.png", alt: "Portfolio Alexandre Bonefons" }]
    },
    twitter: {
      card: "summary_large_image",
      title: "Portfolio Alexandre Bonefons",
      description: "Portfolio Alexandre Bonefons présentant ses projets de développement web et mobile.",
      creator: "@alexandrebonefons"
    },
    metadataBase: new URL("https://portfolio.bonefons.fr")
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
      </body>
    </html>
  );
}
