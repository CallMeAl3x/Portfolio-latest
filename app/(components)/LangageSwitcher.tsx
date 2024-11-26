"use client";
import React from "react";
import { usePathname, useRouter } from "next/navigation";

const availableLocales = ["en", "fr"]; // Define your available locales here

export default function LangageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = pathname.split("/")[1]; // Extract the current locale from the pathname

  const switchLanguage = (lng: string) => {
    const newPathname = pathname.replace(`/${currentLocale}`, `/${lng}`);
    router.push(newPathname);
  };

  return (
    <div>
      {availableLocales.map((lng) => (
        <button
          key={lng}
          onClick={() => switchLanguage(lng)}
          disabled={lng === currentLocale}
          className={`px-4 py-2 ${lng === currentLocale ? "bg-gray-300" : "bg-blue-500 text-white"}`}
        >
          {lng}
        </button>
      ))}
    </div>
  );
}
