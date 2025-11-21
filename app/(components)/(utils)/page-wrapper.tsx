"use client";

import { backAnimation, forwardAnimation, resetAnimation } from "@/app/(utils)/(usePageTransition)/animations";
import { usePageAnimationStore } from "@/app/(utils)/(usePageTransition)/usePageAnimationStore";
import useIsMobile from "@/app/(utils)/userDevice";
import { usePathname } from "@/i18n/routing";
import { useEffect, useLayoutEffect, useRef } from "react";
import Logo from "../(elements)/Logo";

type AnimationTimeline =
  | ReturnType<typeof forwardAnimation>
  | ReturnType<typeof backAnimation>
  | ReturnType<typeof resetAnimation>;

const useIsomorphicLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

export const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  const transitionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const direction = usePageAnimationStore((state) => state.direction);
  const setDirection = usePageAnimationStore((state) => state.setDirection);
  const pathname = usePathname();

  const isMobile = useIsMobile();
  const animationRef = useRef<AnimationTimeline | null>(null);
  const pendingFrameRef = useRef<number | null>(null);
  const scrollResetTimeoutRef = useRef<number | null>(null);
  const isMobileRef = useRef(isMobile);

  useEffect(() => {
    isMobileRef.current = isMobile;
  }, [isMobile]);

  useIsomorphicLayoutEffect(() => {
    const cleanup = () => {
      if (animationRef.current) {
        animationRef.current.kill();
        animationRef.current = null;
      }
      if (pendingFrameRef.current !== null) {
        cancelAnimationFrame(pendingFrameRef.current);
        pendingFrameRef.current = null;
      }
      if (scrollResetTimeoutRef.current !== null) {
        window.clearTimeout(scrollResetTimeoutRef.current);
        scrollResetTimeoutRef.current = null;
      }
    };

    cleanup();

    const transitionElement = transitionRef.current;
    const contentElement = contentRef.current;

    if (!transitionElement || !contentElement || typeof window === "undefined") {
      return cleanup;
    }

    const currentPath = pathname || window.location.pathname;
    const isHomePath = currentPath === "/en" || currentPath === "/fr";
    const isProjectsPath = currentPath.includes("projects");

    if (direction === "forward") {
      animationRef.current = forwardAnimation(transitionElement, contentElement, isMobileRef.current, setDirection);

      return cleanup;
    }

    if (direction === "backward") {
      contentElement.style.visibility = "hidden";
      pendingFrameRef.current = requestAnimationFrame(() => {
        pendingFrameRef.current = null;
        if (!transitionRef.current || !contentRef.current) {
          return;
        }
        animationRef.current = backAnimation(transitionRef.current, contentRef.current, setDirection);
      });

      return cleanup;
    }

    if (isHomePath) {
      pendingFrameRef.current = requestAnimationFrame(() => {
        pendingFrameRef.current = null;
        window.scrollBy(0, 1);
        scrollResetTimeoutRef.current = window.setTimeout(() => {
          window.scrollBy(0, -1);
          scrollResetTimeoutRef.current = null;
        }, 100);
      });

      return cleanup;
    }

    animationRef.current = resetAnimation(transitionElement, contentElement, !isProjectsPath, setDirection);

    return cleanup;
  }, [direction, pathname, setDirection]);

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
