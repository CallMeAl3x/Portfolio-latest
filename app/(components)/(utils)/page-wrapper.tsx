"use client";

import { backAnimation, forwardAnimation, resetAnimation } from "@/app/(utils)/(usePageTransition)/animations";
import { usePageAnimationStore } from "@/app/(utils)/(usePageTransition)/usePageAnimationStore";
import useIsMobile from "@/app/(utils)/userDevice";
import { useEffect, useRef } from "react";
import Logo from "../(elements)/Logo";

export const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  const transitionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const direction = usePageAnimationStore((state) => state.direction);
  const setDirection = usePageAnimationStore((state) => state.setDirection);

  const isMobile = useIsMobile();

  useEffect(() => {
    if (transitionRef.current && contentRef.current) {
      if (direction === "forward") {
        forwardAnimation(transitionRef.current, contentRef.current, isMobile, setDirection);
      } else if (direction === "backward") {
        contentRef.current.style.visibility = "hidden";
        setTimeout(() => {
          if (transitionRef.current && contentRef.current) {
            return backAnimation(transitionRef.current, contentRef.current, setDirection);
          }
        }, 100);
      } else if (direction === null && (window.location.pathname === "/en" || window.location.pathname === "/fr")) {
        scrollBy(0, 1);
        setTimeout(() => {
          scrollBy(0, -1); // Reset animation of the circle
        }, 100);
      } else if (window.location.pathname.includes("projects") && direction === null) {
        resetAnimation(transitionRef.current, contentRef.current, false, setDirection);
      } else {
        resetAnimation(transitionRef.current, contentRef.current, true, setDirection);
      }
    }
  }, [direction, isMobile, setDirection]);

  return (
    <>
      <Logo />
      <div className="relative min-h-screen" id="pagebackground">
        {direction === "forward" ? (
          <div ref={transitionRef} className="fixed inset-x-0 bottom-0 z-[999] bg-background"></div>
        ) : (
          <div ref={transitionRef} className="fixed inset-x-0 top-0 z-[999] bg-background"></div>
        )}
        <div ref={contentRef} className={`transition-opacity duration-500`}>
          {children}
        </div>
      </div>
    </>
  );
};
