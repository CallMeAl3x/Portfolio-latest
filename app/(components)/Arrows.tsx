// Arrows.tsx
import React from "react";
import { useSmoothScroll } from "../(utils)/useSmoothScroll";
import { useArrowAnimation } from "../(utils)/useArrowAnimation";

interface ArrowsProps {
  startAnimation: boolean;
}

export default function Arrows({ startAnimation }: ArrowsProps) {
  const scrollY = useSmoothScroll();
  useArrowAnimation(startAnimation);

  return (
    <div className="absolute inset-0 flex justify-center pointer-events-none">
      <div className="w-full max-w-[1300px] relative">
        <svg
          width="100%"
          height="80%"
          viewBox="0 0 100 120"
          preserveAspectRatio="none"
          className="absolute left-0 z-0 will-change-transform top-[18%] pointer-events-none"
          style={{
            top: "18%",
            transform: `translateY(${scrollY}px)`,
          }}>
          <path
            id="left-arrow"
            d="M 25 50 L 50 65 L 50 70 L 25 55 Z"
            stroke="var(--svg-line)"
            strokeWidth="1.5"
            fill="none"
            className="opacity-0"
            vectorEffect="non-scaling-stroke"
          />
          <path
            id="right-arrow"
            d="M 75 50 L 50 65 L 50 70 L 75 55 Z"
            stroke="var(--svg-line)"
            strokeWidth="1.5"
            fill="none"
            className="opacity-0"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>
    </div>
  );
}
