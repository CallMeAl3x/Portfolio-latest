import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { PageRefs } from "../(types)/pageRef";
import { getStorageValue } from "./(usePageTransition)/storage";
import { ANIMATION_STATES, INITIAL_CONTENT_STATE, VISIBLE_CONTENT_STATE } from "./(usePageTransition)/constant";
import { backAnimation, forwardAnimation } from "./(usePageTransition)/animations";
import { handleScrolling } from "./(usePageTransition)/utils";

export const usePageTransition = (): PageRefs => {
  const pageRef = useRef<HTMLDivElement>(null);
  const transitionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const isFirstTime = getStorageValue("IS_FIRST_TIME");

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const initializeAnimation = () => {
    if (!pageRef.current || !transitionRef.current || !contentRef.current) return;

    const direction = getStorageValue("NAVIGATION_DIRECTION");
    gsap.set(contentRef.current, INITIAL_CONTENT_STATE);

    switch (direction) {
      case ANIMATION_STATES.FORWARD:
        forwardAnimation(transitionRef.current, contentRef.current, isMobile);
        break;
      case ANIMATION_STATES.BACK:
        backAnimation(transitionRef.current, contentRef.current);
        break;
      default:
        break;
    }
  };

  const handleInitialState = () => {
    if (!contentRef.current) return;
    gsap.set(contentRef.current, VISIBLE_CONTENT_STATE);
  };

  useEffect(() => {
    const reloading = getStorageValue("RELOADING");
    const wasAtHome = getStorageValue("WAS_AT_HOME") === "true";
    const isGoingHome = getStorageValue("IS_GOING_HOME") === "true";

    handleScrolling(wasAtHome, isGoingHome);

    if (reloading === "false" && (isFirstTime !== "true" || isFirstTime === null)) {
      initializeAnimation();
    } else if ((isFirstTime === "true" || isFirstTime === null) && reloading === "false") {
      handleInitialState();
    }
  }, []);

  return { pageRef, transitionRef, contentRef };
};
