import { useEffect, useRef, useState } from "react";

export function useSmoothScroll() {
  const [scrollY, setScrollY] = useState(0);
  const targetScrollY = useRef(0);
  const currentScrollY = useRef(0);

  useEffect(() => {
    const isFirefox = navigator.userAgent.toLowerCase().indexOf("firefox") > -1;
    const lerpFactor = isFirefox ? 0.05 : 0.25;

    const lerp = (start: number, end: number) => {
      return start * (1 - lerpFactor) + end * lerpFactor;
    };

    const smoothScroll = () => {
      targetScrollY.current = window.scrollY;
      currentScrollY.current = lerp(currentScrollY.current, targetScrollY.current);
      const roundedScroll = Math.round(currentScrollY.current * 100) / 100;
      setScrollY(roundedScroll);
      requestAnimationFrame(smoothScroll);
    };

    const rafId = requestAnimationFrame(smoothScroll);
    return () => {
      cancelAnimationFrame(rafId);
    };
  }, []);

  return scrollY;
}
