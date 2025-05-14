import { Link } from "@/i18n/routing";
import Image from "next/image";
import { CardProps } from "../../(types)/card";

export default function Card({ title, cardDescription, index, link, isHovered, cardImage }: CardProps) {
  return (
    <>
      <div className="pcview">
        <Link
          href={"/projects" + link}
          className={`group relative hidden w-full cursor-pointer px-12 font-poppins-extralight text-background after:absolute after:bottom-[12%] after:h-[1.75px] after:w-1/3 after:bg-background/40 after:duration-500 after:ease-in-out after:content-[''] lg:flex lg:py-14 xl:py-16 ${
            isHovered ? "after:h-[1.95px] after:w-[92.5%] after:bg-background/60" : ""
          }`}
          passHref
        >
          <p className={`mr-4 md:text-2xl ${isHovered ? "text-gray-500" : ""}`}>0{index}</p>
          <div className="flex flex-col justify-end gap-3 xl:w-full xl:flex-row xl:justify-between">
            <p
              className={`w-auto text-nowrap font-khula-regular text-6xl transition-all ${isHovered ? "translate-x-4 text-gray-500" : ""}`}
            >
              {title}
            </p>

            <p
              className={`mb-3 mt-auto text-end text-2xl transition-all ${isHovered ? "translate-x-4 text-gray-500" : ""}`}
            >
              {cardDescription}
            </p>
          </div>
        </Link>
      </div>
      <div className="mobileview">
        <Link
          href={"/projects" + link}
          className="group relative flex w-full flex-col items-center justify-center gap-5 font-poppins-extralight text-background lg:hidden"
          passHref
        >
          <div className="h-full w-full px-6">
            <Image
              src={cardImage}
              alt={cardDescription}
              height={200}
              width={385}
              className="ml-auto mr-auto rounded-lg"
            />
          </div>
          <div className="flex flex-col items-center justify-center gap-1">
            <h3 className="text-center font-khula-regular text-4xl md:text-left">{title}</h3>
            <p className="px-1 text-center text-lg">{cardDescription}</p>
          </div>
        </Link>
      </div>
    </>
  );
}
