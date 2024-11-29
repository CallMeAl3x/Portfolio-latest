"use client";
import gsap from "gsap";
import _ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Logo from "./Logo";

gsap.registerPlugin(_ScrollTrigger);

export default function Circle() {
  useGSAP(() => {
    gsap.to(".circle", {
      scale: 10,
      background: "radial-gradient(circle, #B3E5FC 0%, #FFAB91 50%, #545453 100%)",
      filter: "blur(0px)",
      rotate: 360,
      opacity: 0.001,
      duration: 1.5,
      ease: "power1.inOut",
      transformOrigin: "50% 50%", // Spécifie un centre de transformation optimal
      willChange: "transform, opacity", // Indique à Chrome que ces propriétés vont changer
      scrollTrigger: {
        trigger: ".LandingSpace",
        start: "top top",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          if (self.progress > 0.6) {
            gsap.to("#logo", { fill: "#1a1c1b", duration: 0 });
            gsap.to("body", { backgroundColor: "#ededed", duration: 0 });
            gsap.to("#menutitle", { color: "#000000", duration: 1.25 });
            gsap.to("#menuicon", { stroke: "#000000", duration: 1.25, overwrite: true });
          } else {
            gsap.to("#logo", { fill: "#F0EDF2", duration: 0 });
            gsap.to("body", { backgroundColor: "#0a0a0a", duration: 0 });
            gsap.to("#menutitle", { color: "#ededed", duration: 1.25 });
            gsap.to("#menuicon", { stroke: "#ededed", duration: 1.25, overwrite: true });
          }
        }
      }
    });

    return () => {
      gsap.to("#menutitle", { color: "", duration: 0 });
      gsap.to("#menuicon", { stroke: "", duration: 0 });
    };
  }, []);

  return (
    <>
      <Logo />
      <div className="circle pointer-events-none fixed left-1/2 top-1/2 z-0 h-[642px] w-[642px] -translate-x-1/2 -translate-y-1/2 transform rounded-[50%] bg-[radial-gradient(circle,rgba(190,190,255,0.10)_0%,transparent_50%)] blur-[10px]"></div>
    </>
  );
}
