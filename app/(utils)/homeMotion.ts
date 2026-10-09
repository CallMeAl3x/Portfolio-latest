// Petits outils d'animation partagés par l'accueil (même courbes que la maquette)
export const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
export const smooth = (p: number, a: number, b: number) => {
  const t = clamp((p - a) / (b - a));
  return t * t * (3 - 2 * t);
};
// cubique in-out
export const io = (t: number) => (t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2);

export const EASE = "cubic-bezier(.22,1,.36,1)";

export const prefersReduced = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// L'intro ne se joue qu'une fois par visite : changement de langue ou retour d'un projet remontent
// l'accueil, on le montre alors directement dans son état final.
let introSeen = false;
export const hasSeenIntro = () => introSeen;
// différé d'un instant pour que le double montage du mode strict ne la considère pas déjà vue
export const markIntroSeen = () => {
  const id = window.setTimeout(() => {
    introSeen = true;
  }, 150);
  return () => window.clearTimeout(id);
};

// Souris réelle (pas de tactile) : survols et curseur custom n'ont de sens que là
export const finePointer = () =>
  typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;
