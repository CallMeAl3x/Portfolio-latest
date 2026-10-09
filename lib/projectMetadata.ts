import { Metadata } from "next";
import { notFound } from "next/navigation";
import { alternates, ogLocale, SITE_URL } from "./seo";
import { projectKeys } from "./utils";

// Fonction pour récupérer les métadonnées du projet
export async function getProjectMetadata(projectId: string, lang: string): Promise<Metadata> {
  // Charger les traductions dynamiquement
  const messages = await import(`/messages/${lang}.json`);

  // Vérification : Si le projet n'existe pas, retourner une 404
  const projectList = projectKeys;
  if (!projectList.includes(projectId as (typeof projectKeys)[number])) {
    notFound();
  }

  // Récupérer les métadonnées du projet dans `CardList`
  const projectData = messages.CardList[projectId];
  if (!projectData) {
    notFound();
  }

  const title = `${projectData.title} · Alexandre Bonefons`;
  // le pitch est la phrase d'accroche courte ; à défaut, la première phrase de la description longue
  const description: string = projectData.pitch || String(projectData.description).split(/(?<=\.)\s/)[0];
  const path = `/projects/${projectId}`;

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    alternates: alternates(lang, path),
    openGraph: {
      type: "article",
      locale: ogLocale(lang),
      url: `/${lang}${path}`,
      siteName: "Alexandre Bonefons",
      title,
      description
      // image : app/[lang]/projects/[projectId]/opengraph-image.tsx
    },
    twitter: { card: "summary_large_image", title, description }
  };
}
