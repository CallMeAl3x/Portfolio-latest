"use client";

import { backAnimation, forwardAnimation, resetAnimation } from "@/app/(utils)/(usePageTransition)/animations";
import { usePageAnimationStore } from "@/app/(utils)/(usePageTransition)/usePageAnimationStore";
import { useEffect, useRef, useState } from "react";

export const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  const transitionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const direction = usePageAnimationStore((state) => state.direction);
  const [opacity, setOpacity] = useState<number>(0.01);

  useEffect(() => {
    if (transitionRef.current && contentRef.current) {
      if (direction === "forward") {
        setOpacity(0.01);
        forwardAnimation(transitionRef.current, contentRef.current, window.innerWidth <= 768);
      } else if (direction === "backward") {
        setOpacity(0.01);
        backAnimation(transitionRef.current, contentRef.current);
      } else if (direction === null && (window.location.pathname === "/en" || window.location.pathname === "/fr")) {
        scrollBy(0, 1);
        setOpacity(1);
      } else if (window.location.pathname.includes("projects") && direction === null) {
        resetAnimation(transitionRef.current, contentRef.current, false);
      } else {
        resetAnimation(transitionRef.current, contentRef.current, true);
      }
    }
  }, [direction]);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {direction === "forward" ? (
        <div ref={transitionRef} className="fixed inset-x-0 bottom-0 z-[999] bg-background"></div>
      ) : (
        <div ref={transitionRef} className="fixed inset-x-0 top-0 z-[999] bg-background"></div>
      )}
      <div ref={contentRef} className={`transition-opacity duration-500`} style={{ opacity }}>
        {children}
      </div>
    </div>
  );
};
