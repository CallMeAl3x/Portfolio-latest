import { notFound } from "next/navigation";
import { useTranslations } from "next-intl";
import ArrowUp from "@/app/(components)/(elements)/ArrowUp";
import CloseIcon from "@/app/(components)/(elements)/CloseIcon";
import { PageWrapper } from "@/app/(components)/(utils)/page-wrapper";
import Link from "next/link";
import { routing } from "@/i18n/routing";
import { Metadata } from "next";
import { getProjectMetadata } from "@/lib/projectMetadata";
import { projectKeys } from "@/lib/utils";

export const dynamicParams = true;
// to get the list of languages
const { locales } = routing;

export async function generateMetadata({ params }: { params: { projectId: string; lang: string } }): Promise<Metadata> {
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

export default function ProjectPage({ params }: { params: { projectId: string; lang: string } }) {
  const { projectId } = params;

  const t = useTranslations("CardList");

  // Server-side validation: Check if the `projectId` from the URL is a valid project key. Else show a 404 error.
  if (!projectKeys.includes(projectId as (typeof projectKeys)[number])) {
    notFound();
  }

  return (
    <PageWrapper>
      <div className="relative">
        <div className="fixed inset-0 flex max-h-[100vh] w-full justify-center overflow-x-hidden overflow-y-scroll px-4 pb-12 text-white">
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
              <Link href={t(`${projectId}.visitUrl`)} target="_blank" rel="noopener noreferrer">
                <img
                  className="mb-12 h-auto max-h-[700px] w-auto select-none rounded-2xl border border-solid border-white object-cover object-top"
                  height="100%"
                  width="100%"
                  src={t(`${projectId}.img`)}
                  alt={t(`${projectId}.title`)}
                />
              </Link>
            </div>
          </div>
        </div>
        <Link
          href="/"
          className="text-light poppins-regular fixed right-6 top-6 z-[9999] flex flex-row items-center gap-x-2 px-4 py-2 text-xl"
        >
          <CloseIcon />
        </Link>
      </div>
    </PageWrapper>
  );
}
