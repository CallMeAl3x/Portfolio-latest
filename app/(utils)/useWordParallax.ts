import { useEffect, type RefObject } from "react";
import { onFrame, onPointer, pointer } from "./frameLoop";
import { finePointer, prefersReduced } from "./homeMotion";

// Parallaxe douce par mot : chaque `.w` de `host` bouge selon la position de la souris dans la fenêtre,
// avec une profondeur propre. Actif seulement quand `host` est à l'écran ; la boucle n'est abonnée
// que le temps que les mots rattrapent leur cible (souris, entrée ou sortie de l'écran).
export function useWordParallax(host: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = host.current;
    if (!el || prefersReduced() || !finePointer()) return;
    const words = [...el.querySelectorAll<HTMLElement>(".w")];
    const pos = words.map(() => ({ x: 0, y: 0 }));
    let visible = false;
    let nx = 0;
    let ny = 0;
    let stop: (() => void) | undefined;

    const step = () => {
      let done = true;
      words.forEach((w, i) => {
        // profondeur alternée par mot : les mots ne bougent pas à l'unisson
        const depth = 0.55 + ((i * 37) % 7) / 7;
        const p = pos[i];
        const tx = nx * 26 * depth;
        const ty = ny * 14 * depth;
        p.x += (tx - p.x) * 0.07;
        p.y += (ty - p.y) * 0.07;
        if (Math.abs(tx - p.x) + Math.abs(ty - p.y) < 0.02) {
          p.x = tx;
          p.y = ty;
        } else done = false;
        if (Math.abs(p.x) + Math.abs(p.y) < 0.02 && nx === 0 && ny === 0) {
          p.x = 0;
          p.y = 0;
          w.style.translate = "";
        } else w.style.translate = `${p.x.toFixed(2)}px ${p.y.toFixed(2)}px`;
      });
      if (done) {
        stop?.();
        stop = undefined;
      }
    };
    const retarget = () => {
      const on = pointer.inside && visible;
      const tx = on ? pointer.x / innerWidth - 0.5 : 0;
      const ty = on ? pointer.y / innerHeight - 0.5 : 0;
      if (tx === nx && ty === ny) return;
      nx = tx;
      ny = ty;
      if (!stop) stop = onFrame(step);
    };
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => (visible = e.isIntersecting));
      retarget();
    });
    io.observe(el);
    const offPointer = onPointer(retarget);
    return () => {
      io.disconnect();
      offPointer();
      stop?.();
      words.forEach((w) => (w.style.translate = ""));
    };
  }, [host]);
}
