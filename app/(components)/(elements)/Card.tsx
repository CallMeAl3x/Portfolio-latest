import Image from "next/image";
import React from "react";
import { Link } from "@/i18n/routing";
import { CardProps } from "../../(types)/card";

export default function Card({ title, cardDescription, index, link, isHovered, cardImage, isLaptop }: CardProps) {
  return (
    <>
      {isLaptop ? (
        // Desktop view
        <Link
          href={"/projects" + link}
          className={`group relative hidden w-full cursor-pointer px-12 py-12 font-poppins-extralight text-background after:absolute after:bottom-[12%] after:h-[1.75px] after:w-1/3 after:bg-background/40 after:duration-500 after:ease-in-out after:content-[''] lg:flex ${
            isHovered ? "after:h-[1.95px] after:w-[90%] after:bg-background/60" : ""
          }`}
          passHref
        >
          <p className={`mr-4 md:text-2xl ${isHovered ? "text-gray-500" : ""}`}>0{index}</p>
          <h4
            className={`font-khula-regular text-6xl transition-all ${isHovered ? "translate-x-4 text-gray-500" : ""}`}
          >
            {title}
          </h4>
          <p
            className={`mb-3 ml-auto mt-auto text-2xl transition-all ${
              isHovered ? "-translate-x-4 text-gray-500" : ""
            }`}
          >
            {cardDescription}
          </p>
        </Link>
      ) : (
        // Mobile view
        <Link
          href={link}
          className="group relative flex w-full flex-col items-center justify-center gap-5 font-poppins-extralight text-background lg:hidden"
          passHref
        >
          <div className="h-full w-full px-6">
            <Image src={cardImage} alt={cardDescription} height={200} width={385} className="ml-auto mr-auto" />
          </div>
          <div className="flex flex-col items-center justify-center gap-1">
            <h4 className="font-khula-regular text-4xl">{title}</h4>
            <p className="text-center text-lg">{cardDescription}</p>
          </div>
        </Link>
      )}
    </>
  );
}
