"use client";
import React, { useState } from "react";
import Lines from "./(components)/Lines";
import Circle from "./(components)/Circle";
import Arrows from "./(components)/Arrows";
export default function Test() {
  const [startArrowAnimation, setStartArrowAnimation] = useState(false);

  return (
    <>
      <div className="w-screen md:h-[130vh] h-screen relative test-space bg-gradient-c">
        <div className="md:h-[125vh] h-screen overflow-hidden relative">
          <Arrows startAnimation={startArrowAnimation} />
          <div className="h-screen overflow-hidden w-screen relative flex flex-col justify-center items-center">
            <Circle />
            <div className="flex justify-center items-center relative z-10 flex-col mt-8">
              <h1 className="md:text-[80px] max-sm:text-[10vw] sm:text-[10vw] max-sm:max-w-sm max-sm:leading-tight text-light khula-extrabold w-[732px] text-center leading-[85px]">
                Turning ideas into <span>creative</span> solutions.
              </h1>
              <p className="poppins-regular text-lg mt-4 max-w-[390px] text-gray-2 max-sm:text-[4vw] px-4 text-center leading-[123%]">
                Innovative web developer crafting unique user experiences.
              </p>
            </div>
          </div>
        </div>
        <Lines onAnimationComplete={() => setStartArrowAnimation(true)} />
      </div>
      {/* Div de test pour simuler du scroll */}
      <div className="h-[100vh]"></div>
      <h2 className="text-black">Votre sous-titre</h2>
      <div className="h-[100vh]"></div>
    </>
  );
}
