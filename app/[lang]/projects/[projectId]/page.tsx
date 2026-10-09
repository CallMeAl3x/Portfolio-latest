import ProjectView from "@/app/(components)/ProjectView";
import { routing } from "@/i18n/routing";
import { getProjectMetadata } from "@/lib/projectMetadata";
import { projectKeys } from "@/lib/utils";
import { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { use } from "react";

export const dynamicParams = true;
// to get the list of languages
const { locales } = routing;

export async function generateMetadata(props: {
  params: Promise<{ projectId: string; lang: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const { projectId, lang } = params;

  try {
    // Appeler la fonction pour obtenir les métadonnées du projet
    const metadata = await getProjectMetadata(projectId, lang);

    return metadata;
  } catch (error) {
    console.error("Error generating metadata:", error);
    notFound();
  }
}

// List of project keys that are used in the URL path.
export async function generateStaticParams() {
  // Generate all routes for all projects in all languages

  return locales.flatMap((lang) =>
    projectKeys.map((projectId) => ({
      lang, // The language
      projectId // The project ID
    }))
  );
}

export default function ProjectPage(props: { params: Promise<{ projectId: string; lang: string }> }) {
  const params = use(props.params);
  const { projectId, lang } = params;
  setRequestLocale(lang);

  // Server-side validation: Check if the `projectId` from the URL is a valid project key. Else show a 404 error.
  if (!projectKeys.includes(projectId as (typeof projectKeys)[number])) {
    notFound();
  }

  return <ProjectView key={projectId} projectId={projectId} />;
}
