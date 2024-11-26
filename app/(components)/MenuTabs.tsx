"use client";
import gsap from "gsap";
import _ScrollTrigger from "gsap/ScrollTrigger";
import { toast } from "sonner";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
gsap.registerPlugin(_ScrollTrigger);

interface MenuTabsProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function MenuTabs({ isOpen, setIsOpen }: MenuTabsProps) {
  const navbarList = [
    { href: "#aboutme", label: "About me" },
    { href: "#projects", label: "Projects" },
    { href: "#contact", label: "Contact" }
  ];
  const navbarRef = useRef<HTMLDivElement>(null);

  const handleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleCopy = (() => {
    let clickData = { count: 0, lastTime: 0 };

    return (e: React.MouseEvent<HTMLElement>) => {
      // Copie le texte
      const textToCopy = e.currentTarget.textContent || "";
      navigator.clipboard.writeText(textToCopy);

      const currentTime = Date.now();

      if (currentTime - clickData.lastTime > 2000) {
        clickData = { count: 0, lastTime: 0 };
      }

      clickData.count++;
      clickData.lastTime = currentTime;

      if (clickData.count === 1) {
        toast.success("L'adresse a été copiée dans le presse-papier");
      } else if (clickData.count === 2) {
        toast.info("Tu as cliqué deux fois, continue comme ça !");
      } else if (clickData.count === 3) {
        toast.warning("Tu vas user ton curseur à force de cliquer !");
      } else if (clickData.count >= 4) {
        toast.error("C'est bon, laisse moi tranquille maintenant !");
      }
    };
  })();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const toastElement = document.querySelector("[itemID='copy-email']");
      if (
        navbarRef.current &&
        !navbarRef.current.contains(event.target as Node) &&
        !(toastElement && toastElement.contains(event.target as Node))
      ) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      gsap.to("#navbar", {
        x: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power1.inOut"
      });
      gsap.to("#overlay", {
        opacity: 0.65,
        duration: 0.5,
        ease: "power1.inOut"
      });
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
      gsap.to("#navbar", {
        x: "100%",
        opacity: 0.25,
        duration: 0.5,
        ease: "power1.inOut"
      });
      gsap.to("#overlay", {
        opacity: 0,
        duration: 0.5,
        ease: "power1.inOut"
      });
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      <div
        id="overlay" // Make the page darker when the menu is open
        className="fixed bg-black z-50 left-0 w-2/3 max-2xl:w-1/2 max-xl:w-2/3 h-screen opacity-0 pointer-events-none"
      ></div>
      <nav
        id="navbar"
        ref={navbarRef}
        className="fixed right-0 h-screen w-1/3 max-2xl:w-1/2 max-xl:w-2/3 max-md:w-full z-[100] flex flex-col p-4 sm:p-6 max-w-screen-md bg-foreground overflow-y-auto will-change-auto translate-x-full"
      >
        <div
          className="fixed top-[1.65rem] right-3 sm:right-16 md:right-[4.50rem] z-2 py-2 px-4 md:top-8 cursor-pointer"
          onClick={handleMenu}
        >
          <Image
            src={"/img/close.svg"}
            alt="close"
            width={32}
            height={32}
            className="w-8 h-8 sm:w-12 sm:h-12 md:w-12 md:h-12"
          />
        </div>
        <div className="text-black px-12 mt-auto mb-auto">
          <h3 className="text-2xl font-khula-light mb-8">Menu</h3>
          <ul className="flex flex-col items-start justify-center gap-2">
            {navbarList.map(({ href, label }) => (
              <li key={href}>
                <a
                  href={href}
                  className="text-[2.5rem] hover:left-2 left-0 relative transition-[left] duration-300 ease-in-out"
                  onClick={handleMenu}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="mb-12 text-black sm:px-12 px-1">
          <p className="font-khula-light text-lg sm:text-left text-center">Get in touch</p>
          <div onClick={handleCopy} className="flex items-center cursor-pointer">
            <p className="font-khula-regular sm:text-2xl text-lg">Alexandre.bonefons@outlook.fr</p>
            <Image
              src={"/img/copy.svg"}
              alt="copy"
              className="fill-foreground ml-1 sm:ml-2 mb-2"
              width={24}
              height={24}
            />
          </div>
        </div>
      </nav>
    </>
  );
}
