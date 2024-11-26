"use client";
import React, { useEffect, useState } from "react";
import { usePageTransition } from "../(utils)/usePageTransition";

export const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  const { pageRef, transitionRef, contentRef } = usePageTransition(); // Assure-toi d'avoir contentRef ici
  const [direction, setDirection] = useState<string | null>(null);

  useEffect(() => {
    // Access localStorage only on the client side
    const storedDirection = localStorage.getItem("navigation_direction");
    setDirection(storedDirection);
  }, []);

  return (
    <div ref={pageRef} className="relative overflow-hidden min-h-screen">
      <div
        ref={transitionRef}
        className="fixed inset-x-0 z-50 bg-background"
        style={{
          [direction === "forward" ? "bottom" : "top"]: 0
        }}
      ></div>
      <div ref={contentRef} className="transition-opacity duration-500 opacity-0">
        {children} {/* Contenu qui sera animé */}
      </div>
    </div>
  );
};
