"use client";
import { useLenis } from "lenis/react";
import { useTranslations } from "next-intl";
import { useEffect, useRef } from "react";
import { layoutTop, watchLayout } from "../../(utils)/layoutWatch";
import { onScroll } from "../../(utils)/scrollBus";
import { clamp, finePointer, prefersReduced } from "../../(utils)/homeMotion";

const SECTIONS = ["about", "career", "tools", "education", "projects", "contact"] as const;
const MINOR = 5; // graduations fines entre deux sections

// Règle graduée sur le bord droit : un repère descend avec le défilement et donne le numéro de section
export default function Ruler() {
  const th = useTranslations("HomePage");
  const lenis = useLenis();
  const lenisRef = useRef(lenis);
  lenisRef.current = lenis;
  const navRef = useRef<HTMLElement>(null);
  const markRef = useRef<HTMLDivElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);
  const ticksRef = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const nav = navRef.current;
    const mark = markRef.current;
    const num = numRef.current;
    if (!nav || !mark || !num || !finePointer()) return;
    let tops: number[] = []; // positions absolues des en-têtes, en cache
    let vh = innerHeight;
    let current = -1;
    let shown = false;
    let last = -1;
    // lecture : positions des en-têtes (au redimensionnement et quand la hauteur du document change)
    const measure = () => {
      const headers = [...document.querySelectorAll<HTMLElement>(".hm-sh")];
      tops = headers.length === SECTIONS.length ? headers.map(layoutTop) : [];
      vh = innerHeight;
    };
    // écriture : tout vient du cache et de scrollY
    const update = () => {
      if (!tops.length) return;
      const y = scrollY;
      const rel = tops.map((t) => t - y);
      // masquée tant que le premier en-tête n'est pas en vue (héros)
      const show = rel[0] < vh * 0.8;
      if (show !== shown) {
        shown = show;
        nav.toggleAttribute("data-show", show);
      }
      // position du repère : on interpole entre les en-têtes autour de la ligne à mi-hauteur
      const line = vh * 0.4;
      let idx = 0;
      for (let i = 0; i < rel.length; i++) if (rel[i] <= line) idx = i;
      const next = rel[idx + 1];
      const frac = next === undefined ? 0 : clamp((line - rel[idx]) / (next - rel[idx]));
      const p = (idx + frac) / (SECTIONS.length - 1);
      if (p !== last) {
        last = p;
        mark.style.transform = `translateY(${(p * 100).toFixed(3)}cqh)`;
      }
      if (idx !== current) {
        current = idx;
        num.textContent = String(idx + 1).padStart(2, "0");
        ticksRef.current.forEach((b, i) => b?.classList.toggle("on", i === idx));
      }
    };
    const offScroll = onScroll(update);
    const offLayout = watchLayout(() => {
      measure();
      update();
    });
    measure();
    update();
    return () => {
      offScroll();
      offLayout();
    };
  }, []);

  const go = (i: number) => {
    const h = document.querySelectorAll<HTMLElement>(".hm-sh")[i];
    if (!h) return;
    // le contenu de l'en-tête (sous son espace haut) se cale à ~90 px du haut
    const pad = parseFloat(getComputedStyle(h).paddingTop) || 0;
    const y = h.getBoundingClientRect().top + scrollY + pad - 90;
    if (lenisRef.current) lenisRef.current.scrollTo(Math.max(0, y), { duration: 1.2, immediate: prefersReduced() });
    else window.scrollTo({ top: Math.max(0, y), behavior: prefersReduced() ? "instant" : "smooth" });
  };

  const total = (SECTIONS.length - 1) * MINOR;
  return (
    <nav className="hm-ruler" ref={navRef} aria-label={th("ruler")}>
      <div className="track">
        <span className="spine" aria-hidden="true" />
        {Array.from({ length: total + 1 }, (_, k) =>
          k % MINOR === 0 ? null : (
            <i key={k} className="minor" style={{ top: `${(k / total) * 100}%` }} aria-hidden="true" />
          )
        )}
        {SECTIONS.map((key, i) => (
          <button
            key={key}
            type="button"
            className="major"
            style={{ top: `${(i / (SECTIONS.length - 1)) * 100}%` }}
            ref={(el) => {
              ticksRef.current[i] = el;
            }}
            aria-label={`${String(i + 1).padStart(2, "0")} ${th(`sections.${key}`)}`}
            onClick={() => go(i)}
          >
            <span className="lbl hm-mono" aria-hidden="true">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="dash" aria-hidden="true" />
          </button>
        ))}
        <div className="mark" ref={markRef} aria-hidden="true">
          <span className="cur hm-mono" ref={numRef}>
            01
          </span>
          <span className="tri" />
        </div>
      </div>
    </nav>
  );
}
