import Image from "next/image";
import Link from "next/link";
import React from "react";

interface CardProps {
  title: string;
  description: string;
  index: number;
  link: string;
  img: string;
  isHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export default function Card({ title, description, index, link, isHovered, img }: CardProps) {
  return (
    <>
      {/* Desktop */}
      <Link
        href={link}
        className={`lg:flex group hidden font-poppins-extralight relative after:-bottom-[75%] after:h-[1.75px] after:bg-black/40 after:content-[''] after:w-1/3 after:ease-in-out after:duration-500 after:absolute text-black w-full cursor-pointer ${
          isHovered ? "after:w-full after:h-[1.95px] after:bg-black/60" : ""
        }`}
        passHref
      >
        <p className={`mr-3 md:text-2xl ${isHovered ? "text-gray-500" : ""}`}>0{index}</p>
        <h4 className={`font-khula-regular text-6xl transition-all ${isHovered ? "text-gray-500 translate-x-4" : ""}`}>
          {title}
        </h4>
        <p
          className={`ml-auto mt-auto mb-3 text-2xl transition-all ${isHovered ? "text-gray-500 -translate-x-4" : ""}`}
        >
          {description}
        </p>
      </Link>

      {/* Mobile */}
      <Link
        href={link}
        className="lg:hidden group flex flex-col font-poppins-extralight justify-center items-center relative text-black w-full cursor-pointer gap-5"
        passHref
      >
        <div className="px-6 h-full w-full">
          <Image src={img} alt={description} height={200} width={385} className="ml-auto mr-auto" />
        </div>
        <div className="flex flex-col gap-1 justify-center items-center">
          <h4 className="font-khula-regular text-4xl">{title}</h4>
          <p className="text-lg text-center">{description}</p>
        </div>
      </Link>
    </>
  );
}
