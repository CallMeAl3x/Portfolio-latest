import { useEffect, RefObject } from "react";
import gsap from "gsap";
import useIsMobile from "./isMobile";
interface UseNavbarAnimationProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  navbarRef: RefObject<HTMLDivElement>;
}

export const useNavbarAnimation = ({ isOpen, setIsOpen, navbarRef }: UseNavbarAnimationProps) => {
  const isMobile = useIsMobile();

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

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      gsap.to("#navbar", {
        x: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power1.inOut"
      });
      gsap.to("#overlay", {
        opacity: 0.65,
        duration: 0.5,
        ease: "power1.inOut",
        onComplete: () => {
          document.getElementById("overlay")?.style.setProperty("pointer-events", "auto");
        }
      });
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
      gsap.to("#navbar", {
        x: "100%",
        opacity: 0.25,
        duration: 0.5,
        ease: "power1.inOut"
      });
      gsap.to("#overlay", {
        opacity: 0.001,
        duration: 0.5,
        ease: "power1.inOut",
        onComplete: () => {
          document.getElementById("overlay")?.style.setProperty("pointer-events", "none");
        }
      });
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, setIsOpen, navbarRef, isMobile]);
};
