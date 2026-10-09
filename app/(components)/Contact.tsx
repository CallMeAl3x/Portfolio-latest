"use client";
import { EMAIL, GITHUB_URL, LINKEDIN_URL } from "@/lib/contact";
import { useTranslations } from "next-intl";
import { useRef } from "react";
import { useBulgeEdge } from "../(utils)/useBulgeEdge";
import { useCopyToClipboard } from "../(utils)/useCopyToClipboard";
import { useReveal } from "../(utils)/useReveal";
import { useWordParallax } from "../(utils)/useWordParallax";
import Reveal from "./(elements)/Reveal";
import SectionHeader from "./(elements)/SectionHeader";

// Section sombre d'un écran : elle monte sur les projets avec un bord bombé
export default function Contact() {
  const t = useTranslations("HomePage");
  const sectionRef = useRef<HTMLElement>(null);
  const edgeRef = useRef<SVGSVGElement>(null);
  const askRef = useRef<HTMLParagraphElement>(null);
  const mailRowRef = useReveal<HTMLDivElement>();
  const handleCopy = useCopyToClipboard(EMAIL, "email");
  useWordParallax(askRef);
  useBulgeEdge(sectionRef, edgeRef);

  return (
    <footer className="hm-contact" id="contact" ref={sectionRef}>
      <svg className="hm-edge ink" ref={edgeRef} preserveAspectRatio="none" aria-hidden="true">
        <path />
        <path className="hm-edge-line" />
      </svg>
      <div className="hm-wrap">
        <SectionHeader num="06" title={t("sections.contact")} ink />
        <Reveal as="p" className="hm-ask">
          <span ref={askRef}>
            {t("contact.ask")
              .split(" ")
              .map((word, i, arr) => (
                <span key={`${word}-${i}`}>
                  <span className="w">{word}</span>
                  {i < arr.length - 1 ? " " : ""}
                </span>
              ))}
          </span>
        </Reveal>
        <div className="hm-rv hm-mailrow" ref={mailRowRef}>
          <button type="button" className="hm-mail" title={t("contact.copy")} onClick={handleCopy}>
            {EMAIL}
          </button>
          <a className="hm-write hm-mono" href={`mailto:${EMAIL}`}>
            {t("contact.write")} &rarr;
          </a>
        </div>
        <Reveal className="hm-social">
          <a href={LINKEDIN_URL} target="_blank" rel="noreferrer">
            {t("contact.linkedin")}
          </a>
          <a href={GITHUB_URL} target="_blank" rel="noreferrer">
            {t("contact.github")}
          </a>
        </Reveal>
        <Reveal as="p" className="hm-mono hm-foot">
          {t("contact.foot")}
        </Reveal>
      </div>
    </footer>
  );
}
