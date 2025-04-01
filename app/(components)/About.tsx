import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { useIsLaptop } from "../(utils)/userDevice";
import ExperienceItem from "./(about)/ExperienceItem";
import ToolItem from "./(about)/ToolItem";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const t = useTranslations("About");
  const ExperienceKeys = ["gcfillon", "penguinworld", "allforweb"] as const;

  const aboutRef = useRef<HTMLDivElement>(null);

  const isLaptop = useIsLaptop();

  useEffect(() => {
    const circles = document.querySelectorAll(".box-effect");
    let activeCircle: HTMLElement | null = null;

    const handleMouseMove = (e: MouseEvent) => {
      if (activeCircle) {
        const rect = activeCircle.getBoundingClientRect();
        const circleCenterX = rect.left + rect.width / 2;
        const circleCenterY = rect.top + rect.height / 2;
        const distanceX = (e.clientX - circleCenterX) * 0.015;
        const distanceY = (e.clientY - circleCenterY) * 0.015;

        gsap.to(activeCircle, {
          x: distanceX,
          y: distanceY,
          duration: 0.5,
          ease: "power3.out"
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    circles.forEach((circle) => {
      circle.addEventListener("mouseenter", () => {
        activeCircle = circle as HTMLElement;
      });
      circle.addEventListener("mouseleave", () => {
        activeCircle = null;
        gsap.to(circle, { x: 0, y: 0, duration: 0.5, ease: "power3.out" });
      });
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    if (!aboutRef.current || !document.querySelector(".ringImage")) return;
    const rings = document.querySelectorAll(".ringImage") as NodeListOf<HTMLElement>;
    let globalOffsetX = 0;
    let globalOffsetY = 0;

    const pointerMoveHandler = (e: PointerEvent) => {
      globalOffsetX += e.movementX;
      globalOffsetY += e.movementY;
      rings.forEach((ring) => {
        ring.style.transform = `translate(${globalOffsetX}px, ${globalOffsetY}px)`;
      });
    };

    rings.forEach((ring) => {
      ring.style.transition = "transform 0.2s ease-out";
    });

    return () => {
      document.removeEventListener("pointermove", pointerMoveHandler);
    };
  }, [isLaptop]);

  useEffect(() => {
    if (!aboutRef.current) return;

    // Create a timeline with ScrollTrigger
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: aboutRef.current,
        start: "top bottom",
        end: "58% top", // End the animation earlier in the scroll
        scrub: 1 // Adding a small value for smoother scrubbing
      }
    });

    // First step: Start to middle with smoother transition
    tl.fromTo(".ringImage", { x: -547, y: -600 }, { x: 0, y: 0, duration: 0.8, ease: "power2.out" });

    // Second step: Pause briefly at middle (add a slight rotation)
    tl.to(".ringImage", { rotation: 0, scale: 1, duration: 0.3, ease: "power1.inOut" });

    // Third step: Middle to end (make it smaller and fade out earlier)
    tl.to(".ringImage", {
      x: 400,
      y: 800,
      rotation: 90,
      scale: 0.55,
      opacity: 0, // Add fade out
      duration: 0.5, // Reduce duration to make it disappear faster
      ease: "power1.in"
    });

    return () => {
      if (tl.scrollTrigger) {
        tl.scrollTrigger.kill();
      }
      tl.kill();
    };
  }, [isLaptop]);
  return (
    <>
      {isLaptop ? (
        <div className="relative hidden h-full w-full items-center justify-center bg-[#EDEDED] pt-[20vh] md:flex">
          <div
            className="mx-auto mt-12 flex min-h-[1330px] min-w-[800px] max-w-[950px] flex-col gap-6 font-poppins-reg text-[#363636]"
            id="about"
            ref={aboutRef}
          >
            <div className="top-part flex gap-7">
              <div className="bg-bg-box box-image relative w-1/3 overflow-hidden rounded-3xl">
                <Image
                  src={"/img/about/profile.png"}
                  alt="Alexandre Bonefons"
                  width={200}
                  height={200}
                  className="h-full w-full rounded-3xl object-cover shadow-lg"
                />
                <img
                  src="/img/about/ring.svg"
                  alt="ring"
                  className="ringImage absolute z-10 h-[914px] w-[845px]"
                  style={{
                    top: "116px",
                    left: "363px"
                  }}
                />
              </div>
              <div className="box-effect box-profile relative flex w-1/3 flex-col items-start justify-start gap-7 overflow-hidden rounded-3xl bg-borderbox p-4">
                <img
                  src="/img/about/ring.svg"
                  alt="ring"
                  className="ringImage absolute z-10 h-[914px] w-[845px] transition-transform duration-200 ease-out"
                  style={{
                    top: "114px",
                    left: "117px"
                  }}
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

              <div className="box-effect box-languages relative flex w-2/3 flex-col items-start justify-start gap-7 overflow-hidden rounded-3xl bg-borderbox p-4 font-poppins-bold">
                <img
                  src="/img/about/ring.svg"
                  alt="ring"
                  className="ringImage absolute z-10 h-[914px] w-[845px]"
                  style={{
                    top: "114px",
                    left: "-140px"
                  }}
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
              <div className="box-effect box-tools relative flex w-[23.3333%] flex-col items-center justify-start gap-6 overflow-hidden rounded-2xl bg-borderbox p-4">
                <img
                  src="/img/about/ring.svg"
                  alt="ring"
                  className="ringImage absolute z-10 h-[914px] w-[845px]"
                  style={{
                    top: "-118px",
                    left: "363px"
                  }}
                />
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
              <div className="box-effect box-experiences relative flex w-3/4 flex-col items-start justify-start gap-4 overflow-hidden rounded-2xl bg-borderbox p-4">
                <img
                  src="/img/about/ring.svg"
                  alt="ring"
                  className="ringImage absolute z-10 h-[914px] w-[845px]"
                  style={{
                    left: "117px",
                    top: "-118px"
                  }}
                />
                <h2 className="ml-2 font-poppins-bold text-[26px]">{t("experiences.title")}</h2>
                <div className="ml-2 mr-4 flex w-[97%] flex-col gap-4 font-poppins-reg text-[17px]">
                  {ExperienceKeys.map((key) => {
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
                <div className="box-effect box-education relative flex flex-col gap-4 overflow-hidden rounded-xl bg-borderbox p-4 px-6">
                  <img
                    src="/img/about/ring.svg"
                    alt="ring"
                    className="ringImage absolute z-10 h-[914px] w-[845px]"
                    style={{
                      top: "-821px",
                      left: "362px"
                    }}
                  />
                  <h2 className="font-poppins-bold text-[26px]">{t("education.title")}</h2>

                  <div className="flex w-full flex-row gap-6">
                    <div className="w-1/2 rounded-3xl bg-[#7FC3EC] p-4 font-poppins-bold text-[20px] text-white">
                      <p>{t("education.formations.BUT-MMI.date")}</p>
                      <p>{t("education.formations.BUT-MMI.title")}</p>
                      <p>
                        <span className="font-poppins-light text-sm">{t("education.formations.BUT-MMI.school")}</span>
                      </p>
                    </div>

                    <div className="box-effect border-1 w-1/2 rounded-3xl border bg-borderbox p-4 font-poppins-bold text-[20px] !shadow-none">
                      <p>{t("education.formations.BAC-INFO.date")}</p>
                      <p>{t("education.formations.BAC-INFO.title")}</p>
                      <p>
                        <span className="font-poppins-light text-sm">{t("education.formations.BAC-INFO.school")}</span>
                      </p>
                    </div>
                  </div>
                  <div className="flex w-full flex-row gap-6">
                    <div className="box-effect border-1 rounded-3xl border bg-borderbox p-4 font-poppins-bold text-[26px] !shadow-none">
                      <p>{t("education.formations.BAC-STI2D.date")}</p>
                      <p>{t("education.formations.BAC-STI2D.title")}</p>
                      <p>
                        <span className="font-poppins-light text-sm">{t("education.formations.BAC-STI2D.school")}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex w-1/2 flex-col gap-4">
                <div className="box-effect box-projects relative flex flex-col gap-4 overflow-hidden rounded-xl bg-borderbox p-4 px-6">
                  <img
                    src="/img/about/ring.svg"
                    alt="ring"
                    className="ringImage absolute z-10 h-[914px] w-[845px]"
                    style={{
                      top: "-819px",
                      left: "-123px"
                    }}
                  />
                  <h2 className="font-poppins-bold text-[26px]">{t("projects.title")}</h2>

                  <div className="flex w-full flex-col gap-6">
                    <p className="font-poppins-reg text-xl">{t("projects.description")}</p>
                    <Link href="/#projects" className="ml-auto mr-3 mt-[30px] flex flex-row gap-4 pb-1">
                      <p className="font-poppins-reg text-2xl">{t("projects.view")}</p>
                      <img src="/img/about/arrow.svg" height="28px" width="28px" alt="" />
                    </Link>
                  </div>
                </div>
                <div className="box-effect relative flex flex-col gap-4 overflow-hidden rounded-xl border border-black p-4 px-6">
                  <img
                    src="/img/about/ring.svg"
                    alt="ring"
                    className="ringImage absolute z-10 h-[914px] w-[845px]"
                    style={{
                      top: "-1138px",
                      left: "-124px"
                    }}
                  />
                  <h2 className="font-poppins-bold text-[26px]">{t("chat.title")}</h2>

                  <div className="flex w-full flex-col gap-6">
                    <p className="font-poppins-reg text-[15px]">{t("chat.contact")}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          className="mobile-view relative mx-4 flex h-full flex-col items-center justify-center overflow-hidden pt-[20vh] text-[#363636] md:mx-auto md:hidden md:max-w-[600px]"
          id="about"
        >
          <div className="flex w-full flex-col gap-0 md:flex-row md:gap-2">
            <div className="relative h-[310px] w-full md:h-[290px] md:w-1/2">
              <Image
                src={"/img/about/profile.png"}
                alt="Alexandre Bonefons"
                width={180}
                height={180}
                className="absolute left-0 top-0 h-[180px] w-[180px] rounded-3xl object-cover shadow-lg"
              />
              <div className="absolute left-1/4 top-1/4 flex h-[180px] w-[180px] flex-col gap-3 rounded-3xl bg-[#FEFFF8] bg-borderbox p-3 shadow-lg">
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
            </div>

            <div className="box-languages relative mx-auto flex w-full max-w-[400px] flex-col items-start justify-start gap-7 rounded-3xl bg-borderbox p-5 font-poppins-bold md:h-fit md:w-1/2 md:max-w-none">
              <h2 className="text-[26px]">{t("languages.title")}</h2>
              <ul className="flex w-full flex-col gap-4">
                <li className="flex w-full items-center gap-2 text-[19px]">
                  <span className="whitespace-nowrap">{t("languages.french")}</span>
                  <div className="ml-2.5 h-[12px] w-full rounded-lg bg-blue-300" />
                </li>
                <li className="flex w-full items-center gap-2 text-[19px]">
                  <span className="whitespace-nowrap">{t("languages.english")}</span>
                  <div className="ml-2 h-[12px] w-[60%] rounded-lg bg-blue-300" />
                </li>
                <li className="flex w-full items-center gap-2 text-[19px]">
                  <span className="whitespace-nowrap">{t("languages.spanish")}</span>
                  <div className="h-[12px] w-[40%] rounded-lg bg-blue-300" />
                </li>
              </ul>
            </div>
          </div>

          <div className="box-tools relative mt-5 flex w-full max-w-[400px] flex-col items-center justify-start gap-5 rounded-2xl bg-borderbox p-3 pb-5 md:max-w-none md:justify-center">
            <h2 className="font-poppins-bold text-[26px]">{t("tools.title")}</h2>
            <div className="flex flex-col items-start gap-6 md:mx-6 md:flex md:flex-row md:gap-12">
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
                  <div className="flex items-center gap-10">
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
                  <div className="flex items-center gap-10">
                    <ToolItem name="Git" icon="git.svg" />
                    <ToolItem name="Azure" icon="microsoft_azure.svg" />
                  </div>
                </ul>
              </div>
            </div>
          </div>

          <div className="box-education mt-4 flex w-full max-w-[400px] flex-col gap-4 overflow-hidden rounded-3xl bg-borderbox p-4 md:max-w-none">
            <img
              src="/img/about/ring.svg"
              alt="ring"
              className="ringImage absolute z-10 h-[914px] w-[845px]"
              style={{
                top: "-821px",
                left: "362px"
              }}
            />
            <h2 className="text-center font-poppins-bold text-[26px]">{t("education.title")}</h2>
            <div className="flex w-full flex-row gap-6 text-white">
              <div className="w-full rounded-3xl bg-[#7FC3EC] p-4 font-poppins-bold text-[23px]">
                <p>{t("education.formations.BUT-MMI.date")}</p>
                <p>{t("education.formations.BUT-MMI.title")}</p>
                <p>
                  <span className="font-poppins-light text-sm">{t("education.formations.BUT-MMI.school")}</span>
                </p>
              </div>
            </div>
            <div className="flex w-full flex-col gap-6">
              <div className="box-effect rounded-3xl border bg-borderbox p-4 font-poppins-bold text-[23px] !shadow-none">
                <p>{t("education.formations.BAC-INFO.date")}</p>
                <p>{t("education.formations.BAC-INFO.title")}</p>
                <p>
                  <span className="font-poppins-light text-sm">{t("education.formations.BAC-INFO.school")}</span>
                </p>
              </div>
              <div className="rounded-3xl border p-4 font-poppins-bold text-[23px]">
                <p>{t("education.formations.BAC-STI2D.date")}</p>
                <p>{t("education.formations.BAC-STI2D.title")}</p>
                <p>
                  <span className="font-poppins-light text-sm">{t("education.formations.BAC-STI2D.school")}</span>
                </p>
              </div>
            </div>
          </div>

          <div className="box-effect box-projects mt-3 flex max-w-[400px] flex-col gap-4 overflow-hidden rounded-xl bg-borderbox p-4 px-6 md:max-w-none">
            <h2 className="font-poppins-bold text-[26px]">{t("projects.title")}</h2>

            <div className="flex h-full w-full flex-col">
              <p className="font-poppins-reg text-xl">{t("projects.description")}</p>
              <Link href="/#projects" className="ml-auto mr-3 mt-[30px] flex flex-row gap-4 pb-1">
                <p className="font-poppins-reg text-2xl">{t("projects.view")}</p>
                <img src="/img/about/arrow.svg" height="28px" width="28px" alt="" />
              </Link>
            </div>
          </div>

          <div className="box-effect box-contact relative mt-6 flex w-full max-w-[400px] flex-col gap-4 overflow-hidden rounded-xl border border-black p-4 px-4 md:max-w-none">
            <img
              src="/img/about/ring.svg"
              alt="ring"
              className="ringImage absolute z-10 h-[914px] w-[845px]"
              style={{
                top: "-1138px",
                left: "-124px"
              }}
            />
            <h2 className="font-poppins-bold text-[23px]">{t("chat.title")}</h2>

            <div className="flex w-full flex-col gap-6">
              <p className="font-poppins-reg text-[15px]">{t("chat.contact")}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
