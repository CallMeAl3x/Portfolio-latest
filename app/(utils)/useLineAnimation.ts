import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const useLineAnimation = (onComplete?: () => void) => {
  useEffect(() => {
    const lines = gsap.utils.toArray<HTMLElement>(".line");

    console.log("Lignes sélectionnées pour l'animation :", lines);

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
          console.log("Animation initiale terminée");
          if (onComplete) {
            setTimeout(onComplete, 200);
          }
        }
      }
    );

    // Animation au scroll
    lines.forEach((line, index) => {
      line.id = `path-${index}`;

      // Définir les positions de départ en fonction de l'ID
      let startOffset;
      if (index === 3 || index === 6) {
        startOffset = 100; // Groupe 1: paths 3 et 6
      } else if (index === 4 || index === 5) {
        startOffset = 0; // Groupe 2: paths 4 et 5
      } else if (index === 0 || index === 2) {
        startOffset = -300; // Groupe 2: paths 0 et 2
      } else if (index === 1) {
        startOffset = -400; // Groupe 3: path 1
      } else {
        startOffset = -400; // Position par défaut
      }

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
            start: () => {
              const condition = window.scrollY > 100;
              console.log("Condition de départ pour ligne", index + 1, ":", condition);
              return `top+=${condition ? startOffset : 0} top`;
            },
            end: () => {
              const condition = window.scrollY > 100;
              return `bottom+=${condition ? startOffset : 0} top`;
            },
            scrub: true,
            invalidateOnRefresh: true, // Pour s'assurer que les positions sont recalculées
            onUpdate: (self) => {
              // console.log(`Progression du scroll pour ligne ${index + 1} : ${self.progress}`);
            }
          }
        }
      );
    });
  }, []);
};
