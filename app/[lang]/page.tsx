"use client";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import Arrows from "../(components)/(elements)/Arrows";
import Circle from "../(components)/(elements)/Circle";
import Lines from "../(components)/(elements)/Lines";
import About from "../(components)/About";
import Footer from "../(components)/Footer";
import Menu from "../(components)/Menu";
import Projects from "../(components)/Projects";
import { usePageAnimationStore } from "../(utils)/(usePageTransition)/usePageAnimationStore";

export default function Homepage() {
  const [startArrowAnimation, setStartArrowAnimation] = useState(false);
  const t = useTranslations("HomePage");
  const direction = usePageAnimationStore((state) => state.direction);

  useEffect(() => {
    if (direction === "backward") {
      const scrollToProjects = () => {
        const projectsSection = document.getElementById("projects");
        if (projectsSection) {
          window.scrollTo({
            top: projectsSection.offsetTop,
            behavior: "instant"
          });
        }
      };

      const projectsSection = document.getElementById("projects");
      if (projectsSection) {
        scrollToProjects();
      }
    }
  }, [direction]);

  return (
    <>
      <main id="mainpage">
        <Menu />
        <div className="LandingSpace bg-gradient-c relative h-screen w-screen md:h-[130vh]" id="home">
          <div className="relative h-screen overflow-hidden md:h-[125vh]">
            <Arrows startAnimation={startArrowAnimation} />
            <div
              className="relative flex h-screen w-screen flex-col items-center justify-center overflow-hidden bg-background"
              id="landing"
            >
              <Circle />
              <div className="relative z-10 mt-8 flex flex-col items-center justify-center">
                <h1 className="text-light font-khula-extrabold w-[732px] text-center leading-[85px] max-sm:max-w-sm max-sm:text-[10vw] max-sm:leading-tight sm:text-[10vw] md:text-[80px]">
                  {t("title")}
                </h1>
                <p className="text-gray-2 mt-4 max-w-[390px] px-4 text-center font-poppins-reg text-lg leading-[123%] max-sm:text-[4vw]">
                  {t("description")}
                </p>
              </div>
            </div>
          </div>
          <Lines onAnimationComplete={() => setStartArrowAnimation(true)} />
        </div>
        {/* Div de test pour simuler du scroll */}
        <div className="h-[35vh]"></div>
        <About />
        <Projects />
        <Footer />
      </main>
    </>
  );
}
