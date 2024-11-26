import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export const usePageTransition = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const transitionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const reloading = localStorage.getItem("reloading");
    const wasInLangRoot = localStorage.getItem("wasInLangRoot") === "true";
    const isGoingToLangRoot = localStorage.getItem("isGoingToLangRoot") === "true";

    if (wasInLangRoot === false && isGoingToLangRoot === true) {
      // Scroll to the projects section if the user is was in projects
      const projectsElement = document.getElementById("projects");
      if (projectsElement) {
        projectsElement.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // Scroll to the top of the page if the user was in the root already
      document.body.style.backgroundColor = "#0A0A0A";
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
      });
    }

    if (pageRef.current && transitionRef.current && contentRef.current && reloading === "false") {
      const direction = localStorage.getItem("navigation_direction");
      const tl = gsap.timeline();

      // Assure-toi que le contenu est caché au départ
      gsap.set(contentRef.current, { opacity: 0, visibility: "hidden" });

      if (direction === "forward") {
        document.body.style.backgroundColor = "#ededed";
        tl.fromTo(
          transitionRef.current,
          {
            transform: "translateY(100%)",
            clipPath: "inset(90% 0% 0% 0%)",
            borderRadius: "50% 50% 0% 0%",
            width: "100%",
            height: "10%",
            opacity: 0
          },
          {
            transform: "translateY(0%)",
            clipPath: "inset(0% 0% 0% 0%)",
            borderRadius: "50% 50% 0% 0%",
            width: "100%",
            height: "100%",
            opacity: 1,
            duration: 0.75,
            ease: "power3.inOut",
            onComplete: () => {
              setTimeout(() => {
                gsap.to(contentRef.current, {
                  opacity: 1,
                  onComplete: () => {
                    if (contentRef.current) {
                      contentRef.current.style.visibility = "visible";
                    }
                  }
                });
              }, 250);
            }
          }
        ).to(transitionRef.current, {
          borderRadius: "0% 0% 0% 0%",
          duration: 0.3,
          ease: "power1.inOut",
          onComplete: () => {
            transitionRef.current?.remove();
            localStorage.removeItem("navigation_direction");

            document.body.style.backgroundColor = "#0A0A0A";
          }
        });
      } else if (direction === "back") {
        tl.fromTo(
          transitionRef.current,
          {
            transform: "translateY(0%)",
            clipPath: "inset(0% 0% 0% 0%)",
            borderRadius: "0% 0% 50% 50%",
            width: "100%",
            height: "100%",
            opacity: 1
          },
          {
            transform: "translateY(-10%)",
            clipPath: "inset(0% 0% 0% 0%)",
            borderRadius: "0% 0% 65% 65%",
            width: "100%",
            height: "45%",
            opacity: 1,
            duration: 1.25,
            ease: "power3.inOut",
            onComplete: () => {
              setTimeout(() => {
                gsap.to(contentRef.current, {
                  opacity: 1,
                  duration: 0.15,
                  onComplete: () => {
                    if (contentRef.current) {
                      contentRef.current.style.visibility = "visible";
                    }
                  }
                });
              }, 350);
            }
          }
        )
          .to(transitionRef.current, {
            transform: "translateY(-81%)",
            clipPath: "inset(0% 0% 0% 0%)",
            borderRadius: "0% 0% 85% 85%",
            width: "100%",
            height: "35%",
            opacity: 1,
            duration: 1.5,
            ease: "power3.inOut"
          })
          .to(transitionRef.current, {
            duration: 0.3,
            ease: "power1.inOut",
            onComplete: () => {
              transitionRef.current?.remove();
              localStorage.removeItem("navigation_direction");
            }
          });
      }
    } else {
      gsap.set(contentRef.current, { opacity: 1, visibility: "visible" });
    }
  }, []);

  return { pageRef, transitionRef, contentRef };
};
