"use client";
import { useState } from "react";
import Lines from "../(components)/(elements)/Lines";
import Circle from "../(components)/(elements)/Circle";
import Arrows from "../(components)/(elements)/Arrows";
import Menu from "../(components)/Menu";
import Projects from "../(components)/Projects";
import { useTranslations } from "next-intl";
import { PageWrapper } from "../(components)/(utils)/page-wrapper";
import Footer from "../(components)/Footer";
import Logo from "../(components)/(elements)/Logo";

export default function Homepage() {
  const [startArrowAnimation, setStartArrowAnimation] = useState(false);
  const t = useTranslations("HomePage");

  return (
    <>
      <PageWrapper>
        <Logo />
        <Menu />
        <div className="LandingSpace bg-gradient-c relative h-screen w-screen md:h-[130vh]" id="home">
          <div className="relative h-screen overflow-hidden md:h-[125vh]">
            <Arrows startAnimation={startArrowAnimation} />
            <div className="relative flex h-screen w-screen flex-col items-center justify-center overflow-hidden">
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
        <div className="h-[100vh]"></div>
        <Projects />
        <Footer />
      </PageWrapper>
    </>
  );
}
