import { useEffect, type RefObject } from "react";
import { onFrame, onPointer, pointer } from "./frameLoop";
import { finePointer, prefersReduced } from "./homeMotion";
import { onScroll } from "./scrollBus";

// Au survol de `area`, `moving` suit la souris de quelques px (lissé) ; il revient au repos ensuite.
// La cible se recalcule sur les événements (souris, défilement) ; la boucle partagée n'est abonnée
// que le temps que la valeur rattrape sa cible.
export function useHoverParallax(
  area: RefObject<HTMLElement | null>,
  moving: RefObject<HTMLElement | null>,
  maxX = 7,
  maxY = 4
) {
  useEffect(() => {
    const a = area.current;
    const m = moving.current;
    if (!a || !m || prefersReduced() || !finePointer()) return;
    let x = 0;
    let y = 0;
    let tx = 0;
    let ty = 0;
    let hover = false;
    let stop: (() => void) | undefined;
    let offEvents: (() => void)[] = [];

    // lecture (événements seulement) : cible selon la position de la souris dans la zone
    const retarget = () => {
      if (hover) {
        const r = a.getBoundingClientRect();
        tx = ((pointer.x - r.left) / r.width - 0.5) * 2 * maxX;
        ty = ((pointer.y - r.top) / r.height - 0.5) * 2 * maxY;
        tx = Math.max(-maxX, Math.min(maxX, tx));
        ty = Math.max(-maxY, Math.min(maxY, ty));
      } else {
        tx = 0;
        ty = 0;
      }
      if (!stop) stop = onFrame(step);
    };
    // écriture (image) : rattrape la cible puis s'arrête
    const step = () => {
      x += (tx - x) * 0.1;
      y += (ty - y) * 0.1;
      const done = Math.abs(tx - x) + Math.abs(ty - y) < 0.02;
      if (done) {
        x = tx;
        y = ty;
      }
      const rest = !hover && done;
      m.style.translate = rest ? "" : `${x.toFixed(2)}px ${y.toFixed(2)}px`;
      if (done) {
        stop?.();
        stop = undefined;
      }
    };
    const enter = () => {
      hover = true;
      if (!offEvents.length) offEvents = [onPointer(retarget), onScroll(retarget)];
      retarget();
    };
    const leave = () => {
      hover = false;
      offEvents.forEach((off) => off());
      offEvents = [];
      retarget();
    };
    a.addEventListener("mouseenter", enter);
    a.addEventListener("mouseleave", leave);
    return () => {
      a.removeEventListener("mouseenter", enter);
      a.removeEventListener("mouseleave", leave);
      offEvents.forEach((off) => off());
      stop?.();
      m.style.translate = "";
    };
  }, [area, moving, maxX, maxY]);
}
