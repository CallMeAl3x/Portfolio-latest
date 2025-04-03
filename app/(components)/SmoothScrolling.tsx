"use client";
// SmoothScrolling.tsx
import { ReactLenis, useLenis } from "lenis/react";
import { useEffect } from "react";

function SmoothScrolling({ children }: { children: React.ReactNode }) {
  const lenis = useLenis(() => {
    // called every scroll
  });

  useEffect(() => {
    if (lenis) {
      lenis.options.prevent = (node) => node.id === "chat-interface";
    }
  }, [lenis]);

  return (
    <ReactLenis root options={{ lerp: 0.2, smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
}

export default SmoothScrolling;
