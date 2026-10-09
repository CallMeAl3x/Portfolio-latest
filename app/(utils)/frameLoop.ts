// Outils partagés : un seul requestAnimationFrame (abonné seulement le temps d'une animation)
// et un seul écouteur mousemove pour le curseur, les parallaxes et la règle.
export interface PointerState {
  x: number;
  y: number;
  seen: boolean; // la souris a bougé au moins une fois
  inside: boolean; // elle est dans la fenêtre
  target: Element | null;
}
export const pointer: PointerState = { x: 0, y: 0, seen: false, inside: false, target: null };

type FrameFn = (now: number) => void;
const subs = new Set<FrameFn>();
let raf = 0;

const tick = (now: number) => {
  raf = 0;
  subs.forEach((fn) => fn(now));
  if (subs.size && !raf) raf = requestAnimationFrame(tick);
};

// Abonne une fonction à la boucle ; renvoie le désabonnement. À désabonner dès que la valeur a convergé.
export function onFrame(fn: FrameFn) {
  subs.add(fn);
  if (!raf) raf = requestAnimationFrame(tick);
  return () => {
    subs.delete(fn);
    if (!subs.size && raf) {
      cancelAnimationFrame(raf);
      raf = 0;
    }
  };
}

const moves = new Set<() => void>();
let listening = false;

const notify = () => moves.forEach((fn) => fn());
const onMove = (e: MouseEvent) => {
  pointer.x = e.clientX;
  pointer.y = e.clientY;
  pointer.seen = true;
  pointer.inside = true;
  pointer.target = e.target instanceof Element ? e.target : null;
  notify();
};
const onLeave = () => {
  pointer.inside = false;
  notify();
};

// Abonne une fonction aux mouvements (et à la sortie) de la souris ; renvoie le désabonnement
export function onPointer(fn: () => void) {
  moves.add(fn);
  if (!listening) {
    listening = true;
    addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
  }
  return () => {
    moves.delete(fn);
    if (!moves.size) {
      removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      listening = false;
    }
  };
}
