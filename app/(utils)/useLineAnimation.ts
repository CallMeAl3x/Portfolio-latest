import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const useLineAnimation = (onComplete?: () => void) => {
  useEffect(() => {
    const lines = gsap.utils.toArray<HTMLElement>(".line");

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
            trigger: ".test-space",
            start: `top top`,
            end: `bottom top`,
            scrub: true
          }
        }
      );
    });
  }, []);
};
