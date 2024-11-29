"use client";
import React, { useEffect, useState } from "react";
import { usePageTransition } from "../../(utils)/usePageTransition";
import Logo from "../(elements)/Logo";

export const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  const { pageRef, transitionRef, contentRef } = usePageTransition();
  const [direction, setDirection] = useState<string | null>(null);

  useEffect(() => {
    const storedDirection = localStorage.getItem("navigation_direction");
    setDirection(storedDirection);
  }, []);

  return (
    <>
      <Logo />
      <div ref={pageRef} className="relative min-h-screen overflow-hidden">
        {direction === "forward" ? (
          <div ref={transitionRef} className="fixed inset-x-0 bottom-0 z-[999] bg-background"></div>
        ) : (
          <div ref={transitionRef} className="fixed inset-x-0 top-0 z-[999] bg-background"></div>
        )}
        <div ref={contentRef} className="opacity-[0.01=] transition-opacity duration-500">
          {children}
        </div>
      </div>
    </>
  );
};
