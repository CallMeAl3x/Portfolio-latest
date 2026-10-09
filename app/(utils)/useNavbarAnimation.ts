import { useEffect, useRef, RefObject } from "react";
import useIsMobile from "./userDevice";
interface UseNavbarAnimationProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  navbarRef: RefObject<HTMLDivElement>;
}

const DURATION = 500;
const EASING = "cubic-bezier(0.455, 0.03, 0.515, 0.955)"; // équivalent de power1.inOut
const running = new WeakMap<Element, Animation>();

interface Target {
  opacity: string;
  transform?: string;
}

// Anime un élément vers `to` depuis son état courant (même en plein vol), puis fige l'état final en style.
// `immediate` : pose l'état final sans animation (premier affichage).
function tween(el: HTMLElement | null, to: Target, immediate: boolean, onDone?: () => void) {
  if (!el) return;
  const cs = getComputedStyle(el);
  const from: Keyframe = { opacity: cs.opacity };
  if (to.transform) from.transform = cs.transform;
  running.get(el)?.cancel();
  const commit = () => {
    el.style.opacity = to.opacity;
    if (to.transform) el.style.transform = to.transform;
    onDone?.();
  };
  if (immediate) {
    running.delete(el);
    commit();
    return;
  }
  const anim = el.animate([from, { ...to }], { duration: DURATION, easing: EASING, fill: "forwards" });
  running.set(el, anim);
  anim.onfinish = () => {
    commit();
    anim.cancel();
    running.delete(el);
  };
}

export const useNavbarAnimation = ({ isOpen, setIsOpen, navbarRef }: UseNavbarAnimationProps) => {
  const isMobile = useIsMobile();
  const first = useRef(true);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const toastElement = document.querySelector("[itemID='copy-email']");
      if (
        navbarRef.current &&
        !navbarRef.current.contains(event.target as Node) &&
        !(toastElement && toastElement.contains(event.target as Node)) &&
        !isMobile
      ) {
        setIsOpen(false);
      }
    };

    // au premier affichage (menu fermé) : état posé sans animation
    const immediate = first.current && !isOpen;
    first.current = false;
    const navbar = document.getElementById("navbar");
    const overlay = document.getElementById("overlay");

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      tween(navbar, { transform: "translateX(0px)", opacity: "1" }, immediate);
      tween(overlay, { opacity: "0.65" }, immediate, () => overlay?.style.setProperty("pointer-events", "auto"));
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
      tween(navbar, { transform: "translateX(100%)", opacity: "0.25" }, immediate);
      tween(overlay, { opacity: "0.001" }, immediate, () => overlay?.style.setProperty("pointer-events", "none"));
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, setIsOpen, navbarRef, isMobile]);
};
