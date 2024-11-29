import React, { useRef } from "react";
import gsap from "gsap";
import _ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(_ScrollTrigger);
import { useNavbarAnimation } from "../(utils)/useNavbarAnimation";
import LangageSwitcher from "./LangageSwitcher";
import { MenuTabsProps } from "../(types)/menuTab";
import { useMessages, useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import { useCopyToClipboard } from "../(utils)/useCopyToClipboard";

export default function MenuTabs({ isOpen, setIsOpen }: MenuTabsProps) {
  const messages = useMessages();
  const navbarList = Object.entries(messages.NavBar).map(([key, value]) => ({
    href: `#${key.toLowerCase()}`,
    label: value
  }));
  const navbarRef = useRef<HTMLDivElement>(null);
  useNavbarAnimation({ isOpen, setIsOpen, navbarRef });

  const handleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleCopy = useCopyToClipboard("Alexandre.bonefons@outlook.fr");

  const t = useTranslations("Footer");

  return (
    <>
      <div
        id="overlay" // Make the page darker when the menu is open to make the menu more visible
        className="pointer-events-none fixed left-0 top-0 z-[99] flex h-full w-full flex-col overflow-y-auto bg-background p-6 opacity-0"
      ></div>
      <nav
        id="navbar"
        ref={navbarRef}
        className="fixed right-0 z-[100] flex h-screen w-1/3 max-w-screen-md translate-x-full flex-col justify-center overflow-y-auto bg-foreground p-6 will-change-auto max-2xl:w-1/2 max-xl:w-2/3 max-md:w-full"
      >
        <div
          className="z-2 fixed right-3 top-[1.65rem] cursor-pointer px-4 py-2 sm:right-16 md:right-[4.50rem] md:top-8"
          onClick={handleMenu}
        >
          <Image
            src={"/img/close.svg"}
            alt="close"
            width={32}
            height={32}
            className="h-8 w-8 sm:h-12 sm:w-12 md:h-12 md:w-12"
          />
        </div>
        <div className="mb-auto mt-auto px-12 text-background">
          <h3 className="mb-8 font-khula-light text-2xl">Menu</h3>
          <ul className="flex flex-col items-start justify-center gap-2">
            {navbarList.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="relative left-0 text-[2.5rem] transition-[left] duration-300 ease-in-out hover:left-2"
                  onClick={handleMenu}
                >
                  {typeof label === "string" ? label : ""}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="mb-12 items-center justify-center px-1 text-background sm:px-12">
          <LangageSwitcher />
          <p className="text-center font-khula-light text-lg sm:text-left">{t("getInTouch")}</p>
          <div onClick={handleCopy} className="flex cursor-pointer max-sm:items-center max-sm:justify-center">
            <p className="text-center font-khula-regular text-lg sm:text-left sm:text-2xl">
              Alexandre.bonefons@outlook.fr
            </p>
            <Image
              src={"/img/copy.svg"}
              alt="copy"
              className="mb-2 ml-1 fill-foreground sm:ml-2"
              width={24}
              height={24}
            />
          </div>
        </div>
      </nav>
    </>
  );
}
