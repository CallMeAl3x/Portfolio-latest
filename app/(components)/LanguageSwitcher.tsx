"use client";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { CheckIcon, ChevronDownIcon, GlobeIcon, XIcon } from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { DialogTitle } from "@radix-ui/react-dialog";

export default function LanguageSwitcher({ className }: { className?: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = pathname.split("/")[1] as "fr" | "en";
  const [isHovered, setIsHovered] = useState(false);

  const switchLanguage = (lng: string) => {
    const newPathname = pathname.replace(`/${currentLocale}`, `/${lng}`);
    router.push(newPathname);
  };

  const flags = {
    fr: "/img/flags/fr.svg",
    en: "/img/flags/usa.svg"
  };

  const nextLocale = currentLocale === "fr" ? "en" : "fr";

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => switchLanguage(nextLocale)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`relative mt-2 flex h-[75%] items-center gap-4 rounded-full border border-gray-300 bg-gray-200 px-5 shadow-[inset_6px_6px_10px_rgba(0,0,0,0.2),inset_-6px_-6px_10px_rgba(255,255,255,0.8)] ${className} hidden overflow-hidden transition-all md:block`}
      >
        <div
          className={`relative flex h-full w-[48px] items-center justify-end gap-2 font-poppins-reg text-base font-medium uppercase text-gray-700`}
        >
          <span
            className={`absolute -left-0.5 top-3 ${isHovered ? "-translate-x-6 opacity-0" : "translate-x-0 opacity-100"} transition-all duration-500 ease-in-out`}
          >
            {currentLocale}
          </span>
          <span
            className={`absolute right-0 top-3 ${isHovered ? "translate-x-0 opacity-100" : "translate-x-6 opacity-0"} transition-all duration-500 ease-in-out`}
          >
            {nextLocale}
          </span>
          <div
            className={`relative flex h-5 w-5 overflow-hidden rounded-full ${isHovered ? "translate-x-[-160%]" : "translate-x-0"} perspective-500 transition-transform duration-700 ease-out`}
          >
            <Image
              src={flags[currentLocale]}
              alt={`${currentLocale} flag`}
              width={20}
              height={20}
              className={`absolute h-5 w-5 transform object-cover transition-transform duration-500 ease-out ${
                isHovered ? "translate-x-[120%]" : "translate-x-0"
              }`}
            />
            <Image
              src={flags[nextLocale]}
              alt={`${nextLocale} flag`}
              width={20}
              height={20}
              className={`absolute h-5 w-5 transform object-cover transition-transform duration-500 ease-out ${
                isHovered ? "translate-x-0" : "translate-x-[-120%]"
              }`}
            />
          </div>
        </div>
      </button>
      <div className="w-0 md:hidden">
        <Drawer open={isOpen} onOpenChange={setIsOpen}>
          <DrawerTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2" onClick={() => setIsOpen(true)}>
              <GlobeIcon className="h-6 w-6" />
              <span>{currentLocale.toUpperCase()}</span>
              <ChevronDownIcon className="h-4 w-4" />
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <div className="grid gap-4 p-4">
              <div className="flex items-center justify-between px-2.5 font-poppins-reg text-lg">
                {/* DialogTitle for accessibility */}
                <DialogTitle>
                  <VisuallyHidden.Root>Select Language</VisuallyHidden.Root>
                </DialogTitle>
                <DrawerClose asChild>
                  <XIcon className="h-6 w-6" />
                </DrawerClose>
              </div>
              <div className="mb-8 mt-4 grid gap-4">
                <Button
                  variant="ghost"
                  onClick={() => switchLanguage("en")}
                  className="justify-start gap-4 py-6 font-poppins-reg text-lg font-medium"
                >
                  <img src={flags.en} alt="English" className="h-6 w-6" />
                  <span>English</span>
                  {currentLocale === "en" && <CheckIcon className="ml-auto h-6 w-6" />}
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => switchLanguage("fr")}
                  className="justify-start gap-4 py-6 font-poppins-reg text-lg font-medium"
                >
                  <img src={flags.fr} alt="Français" className="h-6 w-6" />
                  <span>Français</span>
                  {currentLocale === "fr" && <CheckIcon className="ml-auto h-8 w-8" />}
                </Button>
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </>
  );
}
