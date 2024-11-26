import type { Metadata } from "next";
import "../globals.css";
import { Toaster } from "@/components/ui/sonner";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

export const metadata: Metadata = {
  title: "Portfolio Alexandre Bonefons",
  description: "description // add a description",
  icons: {
    icon: "/img/logo.jpg"
  }
};

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
        {/* suppressHydrationWarning cause it sucks */}
        <NextIntlClientProvider messages={messages}>
          {children}
          <Toaster richColors position="top-left" duration={2000} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
