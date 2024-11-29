"use client";
import { useState } from "react";
import MenuTabs from "./MenuTabs";
import OpenIcon from "./(elements)/OpenIcon";
import Image from "next/image";
import Logo from "./(elements)/Logo";

export default function Menu() {
  const [isOpen, setIsOpen] = useState(false);

  const handleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div
        className={`flex items-center transition-opacity ${!isOpen ? "opacity-100" : "opacity-0"}`}
        onClick={handleMenu}
      >
        <>
          <button
            id="menutitle"
            className={`fixed top-7 z-[11] hidden flex-row items-center gap-x-2 px-4 py-2 font-poppins-reg text-foreground sm:right-[7.65rem] sm:flex sm:text-3xl md:right-[8.35rem] md:top-9`}
          >
            menu
          </button>
          <button className="text-light fixed right-4 top-[1.65rem] z-[11] flex flex-row items-center gap-x-2 px-4 py-2 font-poppins-reg text-xl sm:right-16">
            <OpenIcon />
          </button>
        </>
      </div>
      <MenuTabs isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}
