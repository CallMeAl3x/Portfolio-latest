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
        <div className="text-white inset-0 overflow-y-scroll overflow-x-hidden fixed max-h-[100vh] px-4 w-full flex justify-center pb-12">
          <div className="max-w-[1000px] w-full mt-[20vh]">
            <div className="flex flex-row items-center justify-between w-full mb-[4vh] pr-12">
              <h1 className="khula-regular max-sm:text-[12vw] text-8xl tracking-[calc(6rem*0.03)]">
                {t(`${projectId}.title`)}
              </h1>
              <a
                href={t(`${projectId}.link`)}
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer hover:bg-light hover:text-dark rounded-full size-12 transition-colors ease-in duration-300"
                title="Project Link"
              >
                <ArrowUp />
              </a>
            </div>
            <div className="flex flex-col">
              <div className="flex flex-row gap-x-12">
                <div>
                  <p className="khula-light text-sm tracking-[calc(0.875rem*0.05)] uppercase text-gray-1">
                    Description
                  </p>
                  <hr className="w-[350px] border-gray-2 mt-2" />
                  <p className="poppins-regular text-base text-gray-1 overflow-y-auto overflow-x-hidden mt-8 mb-[4vh] max-w-[500px] w-full">
                    {t(`${projectId}.description`)}
                  </p>
                </div>
                <div>
                  <p className="khula-light text-sm tracking-[calc(0.875rem*0.05)] uppercase text-gray-1">
                    Technologies
                  </p>
                  <hr className="w-[350px] border-gray-2 mt-2" />
                  <div className="poppins-regular text-base text-gray-1 mt-8 mb-[4vh] max-w-[500px] w-full">
                    <p className="flex gap-x-1 items-center">
                      <span className="khula-light">Frontend:</span>
                      <span>{t(`${projectId}.technologies.frontend`)}</span>
                    </p>
                    <p className="flex gap-x-1 items-center">
                      <span className="khula-light">Backend:</span>
                      <span>{t(`${projectId}.technologies.backend`)}</span>
                    </p>
                  </div>
                </div>
              </div>
              <img
                className="w-full object-cover object-top rounded-2xl select-none mb-12"
                style={{ border: "1px solid rgb(255, 255, 255)" }}
                src={t(`${projectId}.img`)}
                alt={t(`${projectId}.title`)}
              />
            </div>
          </div>
        </div>
        <Link
          href="/"
          className="fixed z-[9999] top-6 right-6 px-4 py-2 text-light text-xl poppins-regular flex flex-row gap-x-2 items-center"
        >
          <CloseIcon />
        </Link>
      </div>
    </PageWrapper>
  );
}
