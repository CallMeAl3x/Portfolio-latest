import type { Metadata } from "next";
import "../globals.css";
import { Toaster } from "@/components/ui/sonner";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { NavigationTracker } from "../(utils)/navigationTracker";
import { routing } from "@/i18n/routing";

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = params;

  return {
    title: "Portfolio Alexandre Bonefons",
    description: "description // add a description",
    icons: {
      icon: "/img/logo.svg"
    },
    openGraph: {
      type: "website",
      locale: lang,
      url: "https://www.bonefons.fr",
      siteName: "Portfolio Alexandre Bonefons",
      images: [{ url: "/img/logo.svg", alt: "Portfolio Alexandre Bonefons" }]
    }
  };
}

export default async function LocaleLayout({
  children,
  params: { lang }
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(lang as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();
  return (
    <html lang={lang}>
      <body className="antialiased" suppressHydrationWarning>
        <NavigationTracker />
        <NextIntlClientProvider messages={messages}>
          {children}
          <Toaster richColors position="top-left" duration={2000} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
