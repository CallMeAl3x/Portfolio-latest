"use client";
import { useSmoothScroll } from "@/app/(utils)/useSmoothScroll";
import { useArrowAnimation } from "../../(utils)/useArrowAnimation";

export default function Arrows({ startAnimation }: { startAnimation: boolean }) {
  const scrollY = useSmoothScroll();
  useArrowAnimation(startAnimation);

  return (
    <div className="pointer-events-none absolute inset-0 flex justify-center">
      <div className="relative w-full max-w-[1300px]">
        <svg
          width="100%"
          height="80%"
          viewBox="0 0 100 120"
          preserveAspectRatio="none"
          className="pointer-events-none absolute left-0 top-[18%] z-0 will-change-transform"
          style={{
            top: "18%",
            transform: `translateY(${scrollY}px)`
          }}
        >
          <path
            id="left-arrow"
            d="M 25 50 L 50 65 L 50 70 L 25 55 Z"
            stroke="var(--svg-line)"
            strokeWidth="1.5"
            fill="none"
            className="opacity-[0.01=]"
            vectorEffect="non-scaling-stroke"
          />
          <path
            id="right-arrow"
            d="M 75 50 L 50 65 L 50 70 L 75 55 Z"
            stroke="var(--svg-line)"
            strokeWidth="1.5"
            fill="none"
            className="opacity-[0.01=]"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>
    </div>
  );
}
