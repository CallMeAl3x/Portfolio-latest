"use client";
import { useRef } from "react";
import { useScramble } from "../../(utils)/useScramble";
import Reveal from "./Reveal";

interface SectionHeaderProps {
  num: string;
  title: string;
  ink?: boolean; // variante sur fond noir
  reveal?: boolean;
}

// « 01 ─── À propos » : numéro et titre se déchiffrent, le trait se trace
export default function SectionHeader({ num, title, ink, reveal = true }: SectionHeaderProps) {
  const cls = ["hm-sh", ink ? "ink" : ""].join(" ").trim();
  const numRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLSpanElement>(null);
  useScramble([numRef, titleRef]);
  const inner = (
    <>
      <span className="hm-mono" ref={numRef}>
        {num}
      </span>
      <span className="rule" />
      <span className="hm-mono" ref={titleRef}>
        {title}
      </span>
    </>
  );
  return reveal ? (
    <Reveal as="header" className={cls}>
      {inner}
    </Reveal>
  ) : (
    <header className={cls} data-wire="rule">
      {inner}
    </header>
  );
}
