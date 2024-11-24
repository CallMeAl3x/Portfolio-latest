import React, { useState } from "react";
import MenuTabs from "./MenuTabs";

export default function Menu() {
  const [isOpen, setIsOpen] = useState(false);

  const handleMenu = () => {
    console.log(isOpen);
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              id="menuicon"
              className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" x2="19" y1="9" y2="9"></line>
              <line x1="5" x2="19" y1="15" y2="15"></line>
            </svg>
          </button>
        </>
      </div>
      <MenuTabs isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}
