"use client";
import React from "react";
import { useLineAnimation } from "../../(utils)/useLineAnimation";

const additionalLinePositions = ["20", "30", "70", "80"];

export default function Lines({ onAnimationComplete }: { onAnimationComplete: () => void }) {
  useLineAnimation(onAnimationComplete);

  return (
    <div className="pointer-events-none absolute inset-0 flex justify-center">
      <div className="relative w-full max-w-[1300px]">
        {/* Main Vertical Lines */}
        <svg
          id="vertical-lines"
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute left-0 top-0 h-screen overflow-hidden md:h-[125vh]"
        >
          {["25", "50", "75"].map((x) => (
            <path
              key={x}
              d={`M ${x} 0 L ${x} 100`}
              stroke="var(--svg-line)"
              strokeWidth="1.5"
              fill="none"
              className="line"
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </svg>
      </div>
      {/* Additional Lines for larger screens */}
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute left-0 top-0 hidden 2xl:block"
      >
        {additionalLinePositions.map((x) => (
          <path
            key={x}
            d={`M ${x} 0 L ${x} 100`}
            stroke="var(--svg-line)"
            strokeWidth="1.5"
            fill="none"
            className="line"
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>
    </div>
  );
}
