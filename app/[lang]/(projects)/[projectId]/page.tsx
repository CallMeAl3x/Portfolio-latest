import { notFound } from "next/navigation";
import { cardList } from "@/app/(data)/cardList";
import Link from "next/link";
import { PageWrapper } from "@/app/(components)/(utils)/page-wrapper";
import ArrowUp from "@/app/(components)/(elements)/ArrowUp";
import CloseIcon from "@/app/(components)/(elements)/CloseIcon";

export async function generateStaticParams() {
  return cardList.map((project) => ({
    projectId: project.id.toString()
  }));
}

export default function ProjectPage({ params }: { params: { projectId: string } }) {
  const project = cardList.find((p) => p.id === params.projectId);

  if (!project) {
    notFound();
  }

  return (
    <PageWrapper>
      <div className="relative">
        <div
          data-lenis-prevent="true"
          className="text-white inset-0 overflow-y-scroll overflow-x-hidden fixed max-h-[100vh] px-4 w-full flex justify-center pb-12"
        >
          <div style={{ marginTop: "20vh" }} className="max-w-[1000px] w-full">
            <div className="flex flex-row items-center justify-between w-full mb-[4vh] pr-12">
              <h1 className="khula-regular max-sm:text-[12vw] text-8xl tracking-[calc(6rem*0.03)]">{project.title}</h1>
              <a
                href={project.link}
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
                    {project.description}
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
                      {project.technologies?.frontend?.join(", ")}
                    </p>
                    <p className="flex gap-x-1 items-center">
                      <span className="khula-light">Backend:</span>
                      {project.technologies?.backend.join(", ")}
                    </p>
                  </div>
                </div>
              </div>
              <img
                className="w-full object-cover object-top rounded-2xl select-none mb-12"
                style={{ border: "1px solid rgb(255, 255, 255)" }}
                src={project.img}
                alt={project.title}
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

// Optional: Metadata generation
export async function generateMetadata({ params }: { params: { projectId: string } }) {
  const project = cardList.find((p) => p.id === params.projectId);

  return {
    title: project ? `${project.title} | Your Portfolio` : "Project Not Found",
    description: project?.description || "Project details"
  };
}
