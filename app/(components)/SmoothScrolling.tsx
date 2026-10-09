"use client";
// SmoothScrolling.tsx
import { ReactLenis, useLenis } from "lenis/react";
import { useEffect } from "react";
import { setLenis } from "../(utils)/scrollBus";

// Lenis ne tourne pas en continu : sa boucle (autoRaf) ne démarre qu'à un geste de défilement ou à
// un scrollTo, et s'arrête dès que le défilement lissé est terminé. Au repos : aucun rappel d'image.
function LenisDriver() {
  const lenis = useLenis();
  useEffect(() => {
    if (!lenis) return;
    setLenis(lenis);
    let raf = 0;
    const tick = (t: number) => {
      lenis.raf(t);
      raf = lenis.isScrolling === "smooth" ? requestAnimationFrame(tick) : 0;
    };
    const kick = () => {
      if (raf) return;
      // le temps repart d'ici : pas de saut après la pause
      lenis.time = performance.now() - 1000 / 60;
      raf = requestAnimationFrame(tick);
    };
    const offVirtual = lenis.on("virtual-scroll", kick);
    const scrollTo = lenis.scrollTo;
    lenis.scrollTo = (...args) => {
      scrollTo.apply(lenis, args);
      kick();
    };
    return () => {
      offVirtual();
      lenis.scrollTo = scrollTo;
      cancelAnimationFrame(raf);
      setLenis(null);
    };
  }, [lenis]);
  return null;
}

function SmoothScrolling({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root options={{ lerp: 0.2, smoothWheel: true, autoRaf: false }}>
      <LenisDriver />
      {children}
    </ReactLenis>
  );
}

export default SmoothScrolling;
