import { Metadata } from "next";
import { notFound } from "next/navigation";
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

  // Retourner les métadonnées du projet
  return {
    title: projectData.title,
    description: projectData.description,
    openGraph: {
      title: projectData.title,
      description: projectData.description,
      images: projectData.img,
      siteName: projectData.title,
      url: projectData.visitUrl
    },
    twitter: {
      card: "summary_large_image",
      title: projectData.title,
      description: projectData.description,
      images: [{ url: projectData.img, alt: projectData.title }],
      creator: "@alexandrebonefons"
    }
  };
}
