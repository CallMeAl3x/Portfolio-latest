import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import ExperienceItem from "./(about)/ExperienceItem";
import ToolItem from "./(about)/ToolItem";

export default function About() {
  const t = useTranslations("About");

  const Experiencekeys = ["gcfillon", "penguinworld", "allforweb"] as const;
  return (
    <div className="relative flex h-full w-full items-center justify-center bg-[#EDEDED]">
      <div
        className="mx-auto mt-12 flex min-h-[1330px] min-w-[900px] max-w-[950px] flex-col gap-6 font-poppins-reg text-[#363636]"
        id="about"
      >
        <div className="top-part flex gap-7">
          <div className="bg-bg-box w-1/3 rounded-3xl">
            <Image
              src={"/img/about/profile.png"}
              alt="Alexandre Bonefons"
              width={200}
              height={200}
              className="h-full w-full rounded-3xl object-cover shadow-lg"
            />
          </div>
          <div className="relative flex w-1/3 flex-col items-start justify-start gap-7 overflow-hidden rounded-3xl bg-borderbox p-4">
            <img
              src="/img/about/circle.svg"
              alt="circle"
              className="absolute bottom-[-62%] left-[67%] z-10 h-[166px] w-[180px]"
            />
            <div className="flex gap-2 text-[22px]">
              <p>{t("presentation.hello")}</p>
              <img src="/img/about/hand.svg" alt="hand" />
              <p>{t("presentation.im")}</p>
            </div>
            <div>
              <h1 className="font-poppins-bold text-[26px]">
                {t("presentation.name")} <br /> {t("presentation.surname")}
              </h1>
              <p className="mt-2 text-[19px]">{t("presentation.job")}</p>
            </div>
          </div>

          <div className="relative flex w-2/3 flex-col items-start justify-start gap-7 overflow-hidden rounded-3xl bg-borderbox p-4 font-poppins-bold">
            <img
              src="/img/about/circle.svg"
              alt="circle"
              className="absolute bottom-[-62%] left-[-23%] z-10 h-[166px] w-[180px]"
            />
            <h2 className="text-[26px]">{t("languages.title")}</h2>
            <ul className="flex w-full flex-row justify-between">
              <div className="flex h-full flex-col gap-2 text-[19px]">
                <li>{t("languages.french")}</li>
                <li>{t("languages.english")}</li>
                <li>{t("languages.spanish")}</li>
              </div>
              <div className="flex h-full flex-col gap-2 text-[19px]">
                <img src="/img/about/progress_bar.svg" className="h-[30px]" height="60px" width="100%" alt="" />
                <img src="/img/about/progress_bar.svg" className="h-[30px]" height="60px" width="80%" alt="" />
                <img src="/img/about/progress_bar.svg" className="h-[30px]" height="60px" width="60%" alt="" />
              </div>
            </ul>
          </div>
        </div>
        <div className="middle-part flex gap-6">
          <div className="flex w-[23.3333%] flex-col items-center justify-start gap-6 rounded-2xl bg-borderbox p-4">
            <h2 className="font-poppins-bold text-[26px]">{t("tools.title")}</h2>
            <div className="text-center">
              <span className="rounded-3xl bg-[#2C0505] px-4 py-1 font-poppins-light text-sm text-white">
                {t("tools.frontend.title")}
              </span>
              <ul className="mt-6 flex flex-col gap-4">
                <div className="flex items-center gap-5">
                  <ToolItem name="TanStack" icon="tanstack.svg" />
                  <ToolItem name="VueJS" icon="vuejs.svg" />
                </div>
                <div className="flex items-center gap-6">
                  <ToolItem name="Shadcn" icon="shadcn.svg" />
                  <ToolItem name="Tailwind" icon="tailwind.svg" />
                </div>
              </ul>
            </div>
            <div className="text-center">
              <span className="rounded-3xl bg-[#2C0505] px-4 py-1 font-poppins-light text-sm text-white">
                {t("tools.backend.title")}
              </span>
              <ul className="mt-6 flex flex-col gap-4">
                <div className="flex items-center gap-8">
                  <ToolItem name="SQL" icon="sql.svg" />
                  <ToolItem name="Wordpress" icon="wordpress.svg" />
                </div>
                <div className="flex items-center gap-10">
                  <ToolItem name="Drizzle" icon="drizzle.svg" />
                  <ToolItem name="Zustand" icon="zustand.png" />
                </div>
              </ul>
            </div>
            <div className="text-center">
              <span className="rounded-3xl bg-[#2C0505] px-4 py-1 font-poppins-light text-sm text-white">
                {t("tools.others.title")}
              </span>
              <ul className="mt-6 flex flex-col gap-4">
                <div className="flex items-center gap-8">
                  <ToolItem name="Git" icon="git.svg" />
                  <ToolItem name="Azure" icon="microsoft_azure.svg" />
                </div>
              </ul>
            </div>
          </div>
          <div className="relative flex w-3/4 flex-col items-start justify-start gap-4 overflow-hidden rounded-2xl bg-borderbox p-4">
            <img
              src="/img/about/circle.svg"
              alt="circle"
              className="absolute left-[22%] top-[-9%] z-10 h-[166px] w-[180px]"
            />
            <h2 className="ml-2 font-poppins-bold text-[26px]">{t("experiences.title")}</h2>
            <div className="ml-2 mr-4 flex w-[97%] flex-col gap-4 font-poppins-reg text-[17px]">
              {Experiencekeys.map((key) => {
                const descriptionArray = t(`experiences.items.${key}.description`)
                  .split("|")
                  .map((item) => item.trim());

                return (
                  <ExperienceItem
                    key={key}
                    date={t(`experiences.items.${key}.date`)}
                    title={t(`experiences.items.${key}.title`)}
                    job={t(`experiences.items.${key}.job`)}
                    place={t(`experiences.items.${key}.place`)}
                    description={descriptionArray}
                    compagny={t(`experiences.items.${key}.company`)}
                  />
                );
              })}
            </div>
          </div>
        </div>
        <div className="bottom-part flex w-full gap-6">
          <div className="flex w-1/2 flex-col gap-4">
            <div className="flex flex-col gap-4 rounded-xl bg-borderbox p-4">
              <h2 className="font-poppins-bold text-[26px]">{t("education.title")}</h2>

              <div className="flex w-full flex-row gap-6">
                <div className="w-1/2 rounded-3xl bg-green-500 p-4 font-poppins-bold text-[20px]">
                  <p>2024</p>

                  <p>Bac Informatique</p>
                  <p>
                    <span className="font-poppins-light text-sm">UniversitÃ© du QuÃ©bec Ã Chicoutimi</span>
                  </p>
                </div>

                <div className="w-1/2 rounded-3xl bg-borderbox p-4 font-poppins-bold text-[26px] !shadow-none">
                  <p>2024</p>

                  <p>BUT MMI</p>
                  <p>
                    <span className="font-poppins-light text-sm">I.U.T De VÃ©lizy (France)</span>
                  </p>
                </div>
              </div>
              <div className="flex w-full flex-row gap-6">
                <div className="w-1/2 rounded-3xl bg-borderbox p-4 font-poppins-bold text-[26px] !shadow-none">
                  <p>2024</p>

                  <p>BUT MMI</p>
                  <p>
                    <span className="font-poppins-light text-sm">I.U.T De VÃ©lizy (France)</span>
                  </p>
                </div>
                <div className="w-1/2 rounded-3xl bg-green-500 p-4 font-poppins-bold text-[20px]">
                  <p>2024</p>

                  <p>Bac Informatique</p>
                  <p>
                    <span className="font-poppins-light text-sm">UniversitÃ© du QuÃ©bec Ã Chicoutimi</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex w-1/2 flex-col gap-4">
            <div className="flex flex-col gap-4 rounded-xl bg-borderbox p-4 px-6">
              <h2 className="font-poppins-bold text-[26px]">{t("projects.title")}</h2>

              <div className="flex w-full flex-col gap-6">
                <p className="font-poppins-reg text-xl">{t("projects.description")}</p>
                <Link href="/#projects" className="ml-auto mr-3 mt-[69px] flex flex-row gap-4 pb-1">
                  <p className="font-poppins-reg text-2xl">{t("projects.view")}</p>
                  <img src="/img/about/arrow.svg" height="28px" width="28px" alt="" />
                </Link>
              </div>
            </div>
            <div className="flex flex-col gap-4 rounded-xl border border-black p-4 px-6">
              <h2 className="font-poppins-bold text-[26px]">{t("chat.title")}</h2>

              <div className="flex w-full flex-col gap-6">
                <p className="font-poppins-reg text-[15px]">{t("chat.contact")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
