import { routing } from "@/i18n/routing";
import { SITE_URL } from "@/lib/seo";
import { projectKeys } from "@/lib/utils";
import type { MetadataRoute } from "next";

// accueil + une page par projet, chacune déclinée en fr / en avec ses alternates hreflang
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", ...projectKeys.map((key) => `/projects/${key}`)];
  return paths.flatMap((path) =>
    routing.locales.map((lang) => ({
      url: `${SITE_URL}/${lang}${path}`,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.7,
      alternates: {
        languages: Object.fromEntries(routing.locales.map((l) => [l, `${SITE_URL}/${l}${path}`]))
      }
    }))
  );
}
