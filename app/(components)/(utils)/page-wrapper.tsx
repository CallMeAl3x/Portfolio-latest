"use client";

import { backAnimation, forwardAnimation } from "@/app/(utils)/(usePageTransition)/animations";
import { usePageAnimationStore } from "@/app/(utils)/(usePageTransition)/usePageAnimationStore";
import useIsMobile from "@/app/(utils)/isMobile";
import { useEffect, useRef } from "react";

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
        backAnimation(transitionRef.current, contentRef.current, setDirection);
      }
    }
  }, [direction, isMobile]);

  return (
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
  );
};
