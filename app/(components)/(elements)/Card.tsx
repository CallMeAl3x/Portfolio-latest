"use client";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { useRef } from "react";
import { CardProps } from "../../(types)/card";
import { useHoverParallax } from "../../(utils)/useHoverParallax";
import { useReveal } from "../../(utils)/useReveal";

// Croquis fil de fer de la vignette, tracé avant que la capture ne le remplisse
const WIRE_PATH =
  "M0 8 H160 M10 22 H70 M10 30 H58 M10 42 H64 M10 54 H40 M84 18 H150 V78 H84 Z M84 18 L150 78 M150 18 L84 78";

// Ligne de projet : texte à gauche, grande capture à droite
export default function Card({ index, title, cardDescription, cardImage, link, year, archived, onOpen }: CardProps) {
  const t = useTranslations("HomePage");
  const ref = useReveal<HTMLAnchorElement>();
  const imgRef = useRef<HTMLImageElement>(null);
  useHoverParallax(ref, imgRef);
  const href = "/projects" + link;
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    onOpen(href);
  };
  const fig = [t("fig", { n: String(index).padStart(2, "0") }), year, archived && t("archived")]
    .filter(Boolean)
    .join(" · ");

  return (
    <Link href={href} onClick={handleClick} className={`hm-prow hm-rv${archived ? " is-archived" : ""}`} ref={ref}>
      <div className="info">
        <p className="num hm-mono">{fig}</p>
        <span className="t">{title}</span>
        <span className="k hm-mono">{cardDescription}</span>
        <span className="go hm-mono">{t("viewProject")}</span>
      </div>
      <div className="hm-thumb">
        <svg viewBox="0 0 160 100" preserveAspectRatio="none" aria-hidden="true">
          <path pathLength="1" d={WIRE_PATH} />
        </svg>
        <img src={cardImage} alt="" loading="lazy" ref={imgRef} />
        {archived && <span className="hm-archived hm-mono">{t("archivedBanner")}</span>}
      </div>
    </Link>
  );
}
