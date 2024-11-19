import React from "react";

export default function Test() {
  return (
    <>
      <div className="w-screen overflow-hidden h-screen flex flex-col justify-center items-center relative">
        <div className="absolute top-1/2 left-1/2 w-[642px] h-[642px] transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0 bg-[radial-gradient(circle,rgba(190,190,255,0.06)_0%,transparent_50%)] opacity-100"></div>
        <div className="w-screen overflow-hidden h-screen flex flex-col justify-center items-center relative">
          {/* // Lines */}
          <hr className="h-[100lvh] bg-[#2c2c2c] w-[2px] absolute left-[15%]" />
          <hr className="h-[100lvh] bg-[#2c2c2c] w-[2px] absolute left-[40%] hidden sm:block" />
          <hr className="h-[100lvh] bg-[#2c2c2c] w-[2px] absolute left-[43.5%] hidden sm:block" />
          <hr className="h-[100lvh] bg-[#2c2c2c] w-[2px] absolute left-[50%]" />
          <hr className="h-[100lvh] bg-[#2c2c2c] w-[2px] absolute left-[60%] hidden sm:block" />
          <hr className="h-[100lvh] bg-[#2c2c2c] w-[2px] absolute left-[63.5%] hidden sm:block" />
          <hr className="h-[100lvh] bg-[#2c2c2c] w-[2px] absolute left-[82.5%]" />
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
      <div className="h-screen"></div>
    </>
  );
}
