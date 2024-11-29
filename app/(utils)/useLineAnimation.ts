import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const useLineAnimation = (onComplete?: () => void) => {
  useGSAP(() => {
    const lines = gsap.utils.toArray<HTMLElement>(".line");

    setTimeout(() => {
      // Animation initiale
      gsap.fromTo(
        lines,
        {
          scaleY: 0,
          transformOrigin: "center center"
        },
        {
          scaleY: 1,
          duration: 1.5,
          ease: "power1.inOut",
          stagger: {
            each: 0.1,
            from: "center",
            amount: 0.2
          },
          onComplete: () => {
            if (onComplete) {
              setTimeout(onComplete, 200);
            }
          }
        }
      );
    }, 100);

    // Animation au scroll
    lines.forEach((line, index) => {
      line.id = `path-${index}`;

      gsap.fromTo(
        line,
        {
          y: 0
        },
        {
          y: 100,
          duration: 1,
          ease: "power1.out",
          scrollTrigger: {
            trigger: ".LandingSpace",
            start: `top top`,
            end: `bottom top`,
            scrub: true
          }
        }
      );
    });
  }, []);
};
