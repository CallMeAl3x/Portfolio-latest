import type Lenis from "lenis";

// Bus de défilement : un seul point d'écoute pour tout ce qui dépend de la position de la page.
// Il suit l'événement « scroll » de Lenis, avec repli sur l'événement natif si Lenis est absent.
type Fn = () => void;
const subs = new Set<Fn>();
let lenis: Lenis | null = null;
let native = false;

const emit = () => subs.forEach((fn) => fn());

const sync = () => {
  const want = subs.size > 0 && !lenis;
  if (want && !native) addEventListener("scroll", emit, { passive: true });
  else if (!want && native) removeEventListener("scroll", emit);
  native = want;
};

// Appelé par SmoothScrolling quand l'instance Lenis apparaît ou disparaît
export function setLenis(next: Lenis | null) {
  lenis?.off("scroll", emit);
  lenis = next;
  lenis?.on("scroll", emit);
  sync();
}

// Abonne une fonction au défilement ; renvoie le désabonnement
export function onScroll(fn: Fn) {
  subs.add(fn);
  sync();
  return () => {
    subs.delete(fn);
    sync();
  };
}
