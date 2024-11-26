import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export const usePageTransition = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const transitionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null); // Référence pour le contenu de la page

  useGSAP(() => {
    const reloading = localStorage.getItem("reloading");
    const wasInLangRoot = localStorage.getItem("wasInLangRoot") === "true";
    const isGoingToLangRoot = localStorage.getItem("isGoingToLangRoot") === "true";

    if (wasInLangRoot === false && isGoingToLangRoot === true) {
      const projectsElement = document.getElementById("projects");
      if (projectsElement) {
        projectsElement.scrollIntoView({ behavior: "smooth" });
      }
    }
    if (pageRef.current && transitionRef.current && contentRef.current && reloading === "false") {
      const direction = localStorage.getItem("navigation_direction");
      const tl = gsap.timeline();

      // Assure-toi que le contenu est caché au départ
      gsap.set(contentRef.current, { opacity: 0, visibility: "hidden" });

      // Set initial background color based on direction
      if (direction === "forward") {
        document.body.style.backgroundColor = "#ededed";
      } else {
        document.body.style.backgroundColor = "#0A0A0A";
      }

      // Handle forward animation
      if (direction === "forward") {
        tl.fromTo(
          transitionRef.current,
          {
            transform: "translateY(100%)",
            clipPath: "inset(90% 0% 0% 0%)", // Clip the bottom part initially
            borderRadius: "50% 50% 0% 0%", // Rounded corners at the bottom
            width: "100%",
            height: "10%",
            opacity: 0
          },
          {
            transform: "translateY(0%)",
            clipPath: "inset(0% 0% 0% 0%)", // Reveal the whole div
            borderRadius: "50% 50% 0% 0%", // Rounded corners at the bottom
            width: "100%",
            height: "100%",
            opacity: 1,
            duration: 0.75,
            ease: "power2.inOut"
          }
        ).to(transitionRef.current, {
          borderRadius: "0% 0% 0% 0%", // Reset border radius to square
          duration: 0.3,
          ease: "power1.inOut",
          onComplete: () => {
            setTimeout(() => {
              transitionRef.current?.remove();
              localStorage.removeItem("navigation_direction");
              document.body.style.backgroundColor = "#0A0A0A";

              // Faire apparaître le contenu après l'animation
              gsap.to(contentRef.current, {
                opacity: 1,
                duration: 0.15,
                onComplete: () => {
                  contentRef.current.style.visibility = "visible"; // Rendre le contenu visible
                }
              });
            }, 300);
          }
        });
      }

      // Handle back animation (completely different effect)
      else if (direction === "back") {
        tl.fromTo(
          transitionRef.current,
          {
            transform: "translateY(100%)", // Start from the top
            clipPath: "inset(0% 0% 90% 0%)", // Clip the top part initially
            borderRadius: "0% 0% 50% 50%", // Rounded corners at the top
            width: "100%",
            height: "10%",
            opacity: 0
          },
          {
            transform: "translateY(0%)", // Slide into position
            clipPath: "inset(0% 0% 0% 0%)", // Reveal the whole div
            borderRadius: "0% 0% 50% 50%", // Rounded corners at the top
            width: "100%",
            height: "100%",
            opacity: 1,
            duration: 0.75,
            ease: "power2.inOut"
          }
        ).to(transitionRef.current, {
          borderRadius: "0% 0% 0% 0%", // Reset border radius after animation
          duration: 0.25,
          onComplete: () => {
            setTimeout(() => {
              transitionRef.current?.remove();
              localStorage.removeItem("navigation_direction");

              // Faire apparaître le contenu après l'animation
              gsap.to(contentRef.current, {
                opacity: 1,
                duration: 0.15,
                onComplete: () => {
                  contentRef.current.style.visibility = "visible"; // Rendre le contenu visible
                }
              });
            }, 100);
          }
        });
      }
    } else {
      gsap.set(contentRef.current, { opacity: 1, visibility: "visible", duration: 1 });
    }
  }, []);

  return { pageRef, transitionRef, contentRef };
};
