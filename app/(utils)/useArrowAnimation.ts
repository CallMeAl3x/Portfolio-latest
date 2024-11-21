// useArrowAnimation.ts
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const useArrowAnimation = (start: boolean) => {
  useEffect(() => {
    if (!start) return;

    const calculateProgressColor = (progress: number) => {
      const red = Math.round(44 + (255 - 44) * progress);
      const green = Math.round(44 + (255 - 44) * progress);
      const blue = Math.round(44 + (255 - 44) * progress);
      return `rgb(${red}, ${green}, ${blue})`;
    };

    const animateArrowDrawing = (arrowId: string) => {
      gsap.set(arrowId, { opacity: 1 });

      const tl = gsap.timeline();

      tl.fromTo(
        arrowId,
        {
          strokeDasharray: 2000,
          strokeDashoffset: 2000,
          fillOpacity: 0
        },
        {
          strokeDashoffset: 1.5,
          duration: 3,
          ease: "power1.in"
        }
      )
        .to(arrowId, {
          fillOpacity: 1,
          duration: 0.25
        })
        .to(arrowId, {
          y: 300,
          duration: 3,
          ease: "power1.inOut",
          onUpdate: function () {
            const progress = this.progress();
            const color = calculateProgressColor(progress);
            gsap.set(arrowId, {
              stroke: color,
              fill: color
            });
          },
          onComplete: () => {
            gsap.set(arrowId, { y: 0 });
            initScrollColorAnimation();
          }
        });
    };

    const initScrollColorAnimation = () => {
      gsap.fromTo(
        "#left-arrow, #right-arrow",
        {
          stroke: "var(--svg-line)",
          fill: "var(--svg-line)"
        },
        {
          stroke: "#ffffff",
          fill: "#ffffff",
          scrollTrigger: {
            trigger: ".test-space",
            start: "top top",
            end: "bottom top",
            scrub: true,
            onUpdate: (self) => {
              const color = calculateProgressColor(self.progress);
              gsap.to("#left-arrow, #right-arrow", {
                stroke: color,
                fill: color,
                duration: 0.1
              });
            }
          }
        }
      );
    };

    animateArrowDrawing("#right-arrow");
    animateArrowDrawing("#left-arrow");
  }, [start]);
};
