"use client";
import gsap from "gsap";
import _ScrollTrigger from "gsap/ScrollTrigger";
import React, { useEffect } from "react";
gsap.registerPlugin(_ScrollTrigger);

export default function Circle() {
  useEffect(() => {
    gsap.to(".circle", {
      scale: 10,
      background: "radial-gradient(circle, #B3E5FC 0%, #FFAB91 50%, #545453 100%)", // Dégradé de couleurs
      filter: "blur(0px)", // Suppression du flou
      rotate: 360, // Ajout de la rotation
      opacity: 0, // Ajout de l'opacité pour faire disparaître le cercle
      duration: 2,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: ".test-space", // L'élément déclencheur
        start: "top top",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          if (self.progress > 0.55) {
            gsap.to("body", { backgroundColor: "#ffffff", duration: 1.25 });
          } else {
            gsap.to("body", { backgroundColor: "#0a0a0a", duration: 1.25 });
          }
        }
      }
    });
  }, []);

  return (
    <div className="circle fixed top-1/2 left-1/2 w-[642px] h-[642px] transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0 bg-[radial-gradient(circle,rgba(190,190,255,0.10)_0%,transparent_50%)] blur-[10px] rounded-[50%]"></div>
  );
}
