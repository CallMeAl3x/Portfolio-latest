"use client";

import { INK, VEIL_ID } from "@/app/(utils)/(usePageTransition)/animations";
import Logo from "../(elements)/Logo";

export const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Logo />
      <div className="relative min-h-screen" id="pagebackground">
        {children}
      </div>
      {/* Calque de transition : même couleur que la page projet, piloté par animations.ts */}
      <svg
        id={VEIL_ID}
        className="pointer-events-none fixed inset-0 z-[1000] h-full w-full"
        style={{ display: "none" }}
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path fill={INK} />
      </svg>
    </>
  );
};
