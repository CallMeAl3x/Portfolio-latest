"use client";
import { useState } from "react";
import OpenIcon from "./(elements)/OpenIcon";
import ThemeToggle from "./(elements)/ThemeToggle";
import MenuTabs from "./MenuTabs";

export default function Menu() {
  const [isOpen, setIsOpen] = useState(false);

  const handleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div
        className={`hm-menu fixed right-4 top-[1.4rem] z-[11] flex items-center transition-opacity sm:right-16 md:top-7 ${!isOpen ? "opacity-100" : "pointer-events-none opacity-[0.01]"}`}
      >
        <ThemeToggle className="hm-themebtn" />
        <button
          id="menutitle"
          className="hidden px-3 py-2 font-poppins-reg text-foreground sm:block sm:text-3xl md:py-0"
          onClick={handleMenu}
        >
          menu
        </button>
        <button aria-label="menu" className="px-2 py-2 font-poppins-reg text-xl sm:px-4" onClick={handleMenu}>
          <OpenIcon />
        </button>
      </div>
      <MenuTabs isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}
