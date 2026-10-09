import { useEffect, type RefObject } from "react";
import { onFrame } from "./frameLoop";
import { prefersReduced } from "./homeMotion";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/\\_-+<>#";
const DURATION = 520;

// « Déchiffre » le texte des éléments quand leur parent arrive à l'écran : les caractères sont brouillés
// puis se fixent de gauche à droite. Seul le nœud texte change, React garde la main dessus.
export function useScramble(targets: RefObject<HTMLElement | null>[]) {
  useEffect(() => {
    // l'en-tête qui contient les éléments sert de déclencheur
    const el = targets[0]?.current?.parentElement;
    if (!el || prefersReduced()) return;
    let stop: (() => void) | undefined;
    const obs = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        obs.disconnect();
        const items = targets
          .map((r) => r.current?.firstChild)
          .filter((n): n is Text => n instanceof Text)
          .map((node) => ({ node, final: node.nodeValue ?? "" }));
        const t0 = performance.now();
        stop = onFrame((now) => {
          const p = Math.min(1, (now - t0) / DURATION);
          items.forEach(({ node, final }) => {
            const fixed = Math.floor(p * final.length * 1.15);
            node.nodeValue = [...final]
              .map((c, i) => (c === " " || i < fixed ? c : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]))
              .join("");
          });
          if (p >= 1) {
            items.forEach(({ node, final }) => (node.nodeValue = final));
            stop?.();
          }
        });
      },
      { threshold: 0.18 }
    );
    obs.observe(el);
    return () => {
      obs.disconnect();
      stop?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
