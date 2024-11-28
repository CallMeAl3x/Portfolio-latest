import { notFound } from "next/navigation";
import { useTranslations } from "next-intl";
import ArrowUp from "@/app/(components)/(elements)/ArrowUp";
import CloseIcon from "@/app/(components)/(elements)/CloseIcon";
import { PageWrapper } from "@/app/(components)/(utils)/page-wrapper";
import Link from "next/link";
import { routing } from "@/i18n/routing";

export const dynamicParams = true;
// to get the list of languages
const { locales } = routing;

// List of project keys that are used in the URL path.
const projectKeys = ["weather-app", "web-documentary", "data-visualization", "translate-app"] as const;

export async function generateStaticParams() {
  // Get the locales list from the routing configuration

  // `flatMap` is used to combine the language and project keys into a single array of objects.
  // Each object contains the `lang` (language) and `projectId` (project key),
  // which are passed to the page component as dynamic parameters.
  return locales.flatMap((lang) =>
    projectKeys.map((projectId) => ({
      lang, // The language
      projectId // The project ID (e.g., 'meetmate', 'meetmate2')
    }))
  );
}

export default function ProjectPage({ params }: { params: { projectId: string } }) {
  const { projectId } = params; // Extract the `projectId` from the URL parameters.

  const t = useTranslations("CardList");

  // Server-side validation: Check if the `projectId` from the URL is a valid project key. Else show a 404 error.
  if (!projectKeys.includes(projectId as (typeof projectKeys)[number])) {
    notFound();
  }

  return (
    <PageWrapper>
      <div className="relative">
        <div className="fixed inset-0 flex max-h-[100vh] w-full justify-center overflow-x-hidden overflow-y-scroll px-4 pb-12 text-white">
          <div className="mt-[20vh] w-full max-w-[1000px]">
            <div className="mb-[4vh] flex w-full flex-row items-center justify-between pr-12">
              <h1 className="khula-regular text-8xl tracking-[calc(6rem*0.03)] max-sm:text-[12vw]">
                {t(`${projectId}.title`)}
              </h1>
              <a
                href={t(`${projectId}.link`)}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:bg-light hover:text-dark size-12 cursor-pointer rounded-full transition-colors duration-300 ease-in"
                title="Project Link"
              >
                <ArrowUp />
              </a>
            </div>
            <div className="flex flex-col">
              <div className="flex flex-row gap-x-12">
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
              <img
                className="mb-12 w-full select-none rounded-2xl object-cover object-top"
                style={{ border: "1px solid rgb(255, 255, 255)" }}
                src={t(`${projectId}.img`)}
                alt={t(`${projectId}.title`)}
              />
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
