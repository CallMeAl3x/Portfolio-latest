"use client";
import { createElement, type HTMLAttributes, type ReactNode } from "react";
import { useReveal } from "../../(utils)/useReveal";

interface RevealProps extends HTMLAttributes<HTMLElement> {
  as?: "div" | "header" | "p" | "table";
  children?: ReactNode;
}

// Élément qui apparaît (fondu + léger glissement) quand il arrive à l'écran
export default function Reveal({ as = "div", className = "", children, ...rest }: RevealProps) {
  const ref = useReveal<HTMLElement>();
  return createElement(as, { ref, className: `hm-rv ${className}`.trim(), ...rest }, children);
}
