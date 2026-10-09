import { Toaster } from "@/components/ui/sonner";
import { routing } from "@/i18n/routing";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import Script from "next/script";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { ThemeProvider } from "next-themes";
import { LocaleProvider } from "../(components)/(utils)/locale-provider";
import { alternates, ogLocale, SITE_URL } from "@/lib/seo";
import { EMAIL, GITHUB_URL, LINKEDIN_URL } from "@/lib/contact";
import { PageWrapper } from "../(components)/(utils)/page-wrapper";
import SmoothScrolling from "../(components)/SmoothScrolling";
import "../globals.css";
import "../home.css";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: "Metadata" });
  const title = t("title");
  const description = t("description");

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    alternates: alternates(lang),
    icons: { icon: "/img/logo.svg" },
    openGraph: {
      type: "website",
      locale: ogLocale(lang),
      alternateLocale: routing.locales.filter((l) => l !== lang).map(ogLocale),
      url: `/${lang}`,
      siteName: "Alexandre Bonefons",
      title,
      description
      // image : app/[lang]/opengraph-image.tsx
    },
    twitter: { card: "summary_large_image", title, description }
  };
}

// une page pré-générée par langue au build (sinon l'accueil est rendu à chaque visite)
export function generateStaticParams() {
  return routing.locales.map((lang) => ({ lang }));
}

export default async function LocaleLayout(props: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  const params = await props.params;

  const { children } = props;

  const { lang } = params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(lang as (typeof routing.locales)[number])) {
    notFound();
  }
  // la langue vient du segment d'URL et non des en-têtes : permet le rendu statique
  setRequestLocale(lang);

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();
  const t = await getTranslations({ locale: lang, namespace: "Metadata" });
  // données structurées : relie le site, le nom et les profils pour les moteurs de recherche
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Alexandre Bonefons",
    jobTitle: t("jobTitle"),
    url: `${SITE_URL}/${lang}`,
    email: `mailto:${EMAIL.toLowerCase()}`,
    address: { "@type": "PostalAddress", addressLocality: "Paris", addressCountry: "FR" },
    sameAs: [GITHUB_URL, LINKEDIN_URL],
    knowsAbout: ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL"]
  };
  return (
    <html lang={lang} suppressHydrationWarning>
      <head>
        {/* police du titre de l'accueil : c'est l'élément principal du premier écran */}
        <link rel="preload" href="/fonts/Poppins/Poppins-Regular.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }} />
        <LocaleProvider locale={lang as (typeof routing.locales)[number]} messages={messages}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <SmoothScrolling>
              <PageWrapper>{children}</PageWrapper>
            </SmoothScrolling>
            <Toaster richColors position="top-left" duration={2000} />
          </ThemeProvider>
        </LocaleProvider>
        <SpeedInsights />
        <Analytics />
        {process.env.NEXT_PUBLIC_RYBBIT_SITE_ID && (
          <Script
            id="rybbit-script"
            src={`${process.env.NEXT_PUBLIC_RYBBIT_URL || "https://app.rybbit.io"}/api/script.js`}
            data-site-id={process.env.NEXT_PUBLIC_RYBBIT_SITE_ID}
            data-session-replay="true"
            strategy="lazyOnload"
          />
        )}
      </body>
    </html>
  );
}
