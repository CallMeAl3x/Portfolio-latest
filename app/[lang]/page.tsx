"use client";
import React, { useState } from "react";
import Lines from "../(components)/Lines";
import Circle from "../(components)/Circle";
import Arrows from "../(components)/Arrows";
import Menu from "../(components)/Menu";
import Projects from "../(components)/Projects";
import { useTranslations } from "next-intl";

export default function Homepage() {
  const [startArrowAnimation, setStartArrowAnimation] = useState(false);
  const t = useTranslations("HomePage");

  return (
    <>
      <Menu />
      <div className="w-screen md:h-[130vh] h-screen relative LandingSpace bg-gradient-c">
        <div className="md:h-[125vh] h-screen overflow-hidden relative">
          <Arrows startAnimation={startArrowAnimation} />
          <div className="h-screen overflow-hidden w-screen relative flex flex-col justify-center items-center">
            <Circle />
            <div className="flex justify-center items-center relative z-10 flex-col mt-8">
              <h1 className="md:text-[80px] max-sm:text-[10vw] sm:text-[10vw] max-sm:max-w-sm max-sm:leading-tight text-light font-khula-extrabold w-[732px] text-center leading-[85px]">
                {t("title")}
              </h1>
              <p className="font-poppins-reg text-lg mt-4 max-w-[390px] text-gray-2 max-sm:text-[4vw] px-4 text-center leading-[123%]">
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
      <h2 className="text-background">Votre sous-titre</h2>
      <div className="h-[100vh]"></div>
    </>
  );
}
