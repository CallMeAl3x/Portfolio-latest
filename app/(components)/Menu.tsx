"use client";
import { useState } from "react";
import MenuTabs from "./MenuTabs";
import OpenIcon from "./(elements)/OpenIcon";

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
            className={`fixed top-7 sm:right-[7.65rem] md:right-[8.35rem] md:top-9 z-[11] px-4 py-2 sm:text-3xl  font-poppins-reg hidden flex-row gap-x-2 items-center text-foreground sm:flex`}
          >
            menu
          </button>
          <button className="fixed top-[1.65rem] right-4 sm:right-16 z-[11] px-4 py-2 text-light text-xl font-poppins-reg flex flex-row gap-x-2 items-center">
            <OpenIcon />
          </button>
        </>
      </div>
      <MenuTabs isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}
