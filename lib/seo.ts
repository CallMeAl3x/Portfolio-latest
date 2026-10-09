import { routing } from "@/i18n/routing";
import type { Metadata } from "next";

export const SITE_URL = "https://portfolio.bonefons.com";

const OG_LOCALE: Record<string, string> = { fr: "fr_FR", en: "en_US" };
export const ogLocale = (lang: string) => OG_LOCALE[lang] ?? lang;

// canonical + hreflang d'une page présente dans chaque langue ; `path` sans préfixe de langue ("" ou "/projects/x")
export function alternates(lang: string, path = ""): Metadata["alternates"] {
  return {
    canonical: `/${lang}${path}`,
    languages: {
      ...Object.fromEntries(routing.locales.map((l) => [l, `/${l}${path}`])),
      "x-default": `/${routing.defaultLocale}${path}`
    }
  };
}
