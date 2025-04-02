import ArrowUp from "@/app/(components)/(elements)/ArrowUp";
import CloseLink from "@/app/(components)/(elements)/closeLink";
import { routing } from "@/i18n/routing";
import { getProjectMetadata } from "@/lib/projectMetadata";
import { projectKeys } from "@/lib/utils";
import { Metadata } from "next";
import { useTranslations } from "next-intl";
import Link from "next/link";
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
  const { projectId } = params;
  const t = useTranslations("CardList");

  // Server-side validation: Check if the `projectId` from the URL is a valid project key. Else show a 404 error.
  if (!projectKeys.includes(projectId as (typeof projectKeys)[number])) {
    notFound();
  }

  return (
    <>
      <div className="relative" id="projectpage">
        <div className="flex min-h-[100vh] w-full justify-center px-4 pb-12 text-white">
          <div className="mt-[8.5vh] w-full max-w-[1000px]">
            <div className="mb-[4vh] flex w-full flex-row items-center pr-4 sm:gap-4 xl:justify-between">
              <h1 className="khula-regular text-7xl tracking-[calc(6rem*0.03)] max-sm:text-[11.5vw] lg:text-8xl">
                {t(`${projectId}.title`)}
              </h1>
              <a
                href={t(`${projectId}.visitUrl`)}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:bg-light hover:text-dark size-12 cursor-pointer rounded-full transition-colors duration-300 ease-in"
                title="Project Link"
              >
                <ArrowUp />
              </a>
            </div>
            <div className="flex flex-col">
              <div className="flex flex-col gap-x-12 sm:flex-row">
                <div>
                  <p className="khula-light text-gray-1 text-sm uppercase tracking-[calc(0.875rem*0.05)]">
                    Description
                  </p>
                  <hr className="border-gray-2 mt-2 w-[350px]" />
                  <p className="poppins-regular text-gray-1 mb-[4vh] mt-8 w-full max-w-[500px] overflow-y-auto overflow-x-hidden text-base">
                    {t(`${projectId}.description`)}
                  </p>
                </div>
                <div>
                  <p className="khula-light text-gray-1 text-sm uppercase tracking-[calc(0.875rem*0.05)]">
                    Technologies
                  </p>
                  <hr className="border-gray-2 mt-2 w-[350px]" />
                  <div className="poppins-regular text-gray-1 mb-[4vh] mt-8 w-full max-w-[500px] text-base">
                    <p className="flex items-center gap-x-1">
                      <span className="khula-light">Frontend:</span>
                      <span>{t(`${projectId}.technologies.frontend`)}</span>
                    </p>
                    <p className="flex items-center gap-x-1">
                      <span className="khula-light">Backend:</span>
                      <span>{t(`${projectId}.technologies.backend`)}</span>
                    </p>
                  </div>
                </div>
              </div>
              <Link
                href={t(`${projectId}.visitUrl`)}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-auto mr-auto"
              >
                <img
                  className="mb-12 h-auto w-auto select-none rounded-2xl border border-solid border-white object-cover object-top"
                  height="100%"
                  width="100%"
                  src={t(`${projectId}.img`)}
                  alt={t(`${projectId}.title`)}
                />
              </Link>
            </div>
          </div>
        </div>
        <CloseLink />
      </div>
    </>
  );
}
