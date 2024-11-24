"use client";
import gsap from "gsap";
import _ScrollTrigger from "gsap/ScrollTrigger";
import React, { useEffect } from "react";
gsap.registerPlugin(_ScrollTrigger);

export default function Circle() {
  useEffect(() => {
    gsap.to(".circle", {
      scale: 10,
      background: "radial-gradient(circle, #B3E5FC 0%, #FFAB91 50%, #545453 100%)",
      filter: "blur(0px)",
      rotate: 360,
      opacity: 0,
      duration: 1.5,
      ease: "power1.inOut",
      transformOrigin: "50% 50%", // Spécifie un centre de transformation optimal
      willChange: "transform, opacity", // Indique à Chrome que ces propriétés vont changer
      scrollTrigger: {
        trigger: ".test-space",
        start: "top top",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          if (self.progress > 0.6) {
            gsap.to("body", { backgroundColor: "#ededed", duration: 1.25 });
            gsap.to("#menutitle", { color: "#000000", duration: 1.25 });
            gsap.to("#menuicon", { stroke: "#000000", duration: 1.25, overwrite: true });
          } else {
            gsap.to("body", { backgroundColor: "#0a0a0a", duration: 1.25 });
            gsap.to("#menutitle", { color: "#ededed", duration: 1.25 });
            gsap.to("#menuicon", { stroke: "#ededed", duration: 1.25, overwrite: true });
          }
        }
      }
    });
  }, []);

  return (
    <div className="circle fixed top-1/2 left-1/2 w-[642px] h-[642px] transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0 bg-[radial-gradient(circle,rgba(190,190,255,0.10)_0%,transparent_50%)] blur-[10px] rounded-[50%]"></div>
  );
}
