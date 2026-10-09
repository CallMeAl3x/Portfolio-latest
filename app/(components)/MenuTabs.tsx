import LenisLink from "@/app/(components)/LenisLink";
import { EMAIL } from "@/lib/contact";
import { useMessages, useTranslations } from "next-intl";
import Image from "next/image";
import { useRef } from "react";
import { MenuTabsProps } from "../(types)/menuTab";
import { useCopyToClipboard } from "../(utils)/useCopyToClipboard";
import { useNavbarAnimation } from "../(utils)/useNavbarAnimation";
import ThemeToggle from "./(elements)/ThemeToggle";
import LanguageSwitcher from "./LanguageSwitcher";

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

  const handleCopy = useCopyToClipboard(EMAIL, "email");

  const t = useTranslations("Footer");

  return (
    <>
      <div
        id="overlay" // Make the page darker when the menu is open to make the menu more visible
        className="pointer-events-none fixed left-0 top-0 z-[99] flex h-full w-full flex-col overflow-y-auto bg-background p-6 opacity-[0.01]"
      ></div>
      <nav
        id="navbar"
        ref={navbarRef}
        className="fixed right-0 z-[9999] flex h-screen w-1/3 max-w-screen-md translate-x-full flex-col justify-center overflow-y-auto bg-foreground p-6 will-change-auto dark:border-l dark:border-white/10 dark:bg-[var(--hm-bg)] max-2xl:w-1/2 max-xl:w-2/3 max-md:w-full"
      >
        <div className="mt-2 flex items-center justify-between px-8">
          <div className="flex items-center gap-3 self-stretch">
            <LanguageSwitcher />
            <ThemeToggle className="mt-2 text-background dark:text-foreground" size={26} />
          </div>
          <div className="cursor-pointer px-2 py-2" onClick={handleMenu}>
            <Image
              src={"/img/close.svg"}
              alt="close"
              width={28}
              height={28}
              className="h-7 w-7 dark:invert sm:h-12 sm:w-12 md:h-12 md:w-12"
            />
          </div>
        </div>
        <div className="mb-auto mt-auto px-12 text-background dark:text-foreground">
          <p className="mb-8 font-khula-light text-2xl">Menu</p>
          <ul className="flex flex-col items-start justify-center gap-2">
            {navbarList.map(({ href, label }) => (
              <li key={href} onClick={handleMenu}>
                <LenisLink
                  href={href}
                  className="relative left-0 text-[2.5rem] transition-[left] duration-300 ease-in-out hover:left-2"
                >
                  {typeof label === "string" ? label : ""}
                </LenisLink>
              </li>
            ))}
          </ul>
        </div>
        <div className="mb-12 items-center justify-center px-1 text-background dark:text-foreground sm:px-12">
          <p className="text-center font-khula-light text-lg sm:text-left">{t("getInTouch")}</p>
          <div onClick={handleCopy} className="flex cursor-pointer max-sm:items-center max-sm:justify-center">
            <p className="text-center font-khula-regular text-lg sm:text-left sm:text-2xl">
              {EMAIL}
            </p>
            <Image
              src={"/img/copy.svg"}
              alt="copy"
              className="mb-2 ml-1 fill-foreground dark:invert sm:ml-2"
              width={24}
              height={24}
            />
          </div>
        </div>
      </nav>
    </>
  );
}
