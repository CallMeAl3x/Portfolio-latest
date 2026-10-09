// Transition accueil <-> projet : un calque SVG de la couleur de la page projet, sans changement de couleur (aucun flash)
export const VEIL_ID = "page-veil";
export const INK = "#0a0a0a";

const EASE_OUT = "cubic-bezier(.76,0,.24,1)";
const EASE_SOFT = "cubic-bezier(.2,.7,.2,1)";

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// quart in-out, très doux aux extrémités
const inOut = (t: number) => (t < 0.5 ? 8 * t ** 4 : 1 - (-2 * t + 2) ** 4 / 2);

const getVeil = () => {
  const veil = document.getElementById(VEIL_ID);
  const path = veil?.querySelector("path");
  return veil && path ? { veil, path } : null;
};

export const hideVeil = () => {
  const v = getVeil();
  if (v) v.veil.style.display = "none";
};

// calque plein écran immédiat
export const showFullVeil = () => {
  const v = getVeil();
  if (!v) return;
  const W = window.innerWidth;
  const H = window.innerHeight;
  v.veil.setAttribute("viewBox", `0 0 ${W} ${H}`);
  v.path.setAttribute("d", `M0 0H${W}V${H}H0Z`);
  v.veil.style.display = "block";
};

// edge "top" : le calque monte depuis le bas, son bord haut est bombé
// edge "bottom" : le calque se retire vers le haut, son bord bas est bombé
export const sweep = (edge: "top" | "bottom", from: number, to: number, duration: number) =>
  new Promise<void>((done) => {
    const v = getVeil();
    if (!v) {
      done();
      return;
    }
    const W = window.innerWidth;
    const H = window.innerHeight;
    const bulge = Math.min(W, H) * (W < 760 ? 0.28 : 0.2);
    v.veil.setAttribute("viewBox", `0 0 ${W} ${H}`);
    v.veil.style.display = "block";
    const t0 = performance.now();
    const frame = (now: number) => {
      const k = Math.min(1, (now - t0) / duration);
      const p = from + (to - from) * inOut(k);
      const d = Math.sin(Math.PI * p) * bulge; // courbe max au milieu, plate aux deux bouts
      const y = H * (1 - p);
      v.path.setAttribute(
        "d",
        edge === "top"
          ? `M0 ${H} L0 ${y} Q${W / 2} ${y - d} ${W} ${y} L${W} ${H}Z`
          : `M0 0 L${W} 0 L${W} ${H - y} Q${W / 2} ${H - y + d} 0 ${H - y}Z`
      );
      if (k < 1) requestAnimationFrame(frame);
      else done();
    };
    requestAnimationFrame(frame);
  });

export const fadeOut = (selector: string, ms = 250): Promise<void> =>
  Promise.all(
    Array.from(document.querySelectorAll<HTMLElement>(selector)).map(
      (el) =>
        el.animate([{ opacity: 1 }, { opacity: 0, transform: "translateY(-12px)" }], {
          duration: ms,
          easing: "ease-in",
          fill: "forwards"
        }).finished
    )
  ).then(() => undefined);

// entrée échelonnée du contenu de la page projet
export const enterContent = (root: ParentNode, delay = 0) => {
  root.querySelector(".pj-title span")?.animate([{ transform: "translateY(105%)" }, { transform: "none" }], {
    duration: 900,
    delay,
    easing: EASE_OUT,
    fill: "both"
  });
  root.querySelectorAll(".pj-st").forEach((el, i) =>
    el.animate(
      [
        { opacity: 0, transform: "translateY(24px)" },
        { opacity: 1, transform: "none" }
      ],
      { duration: 800, delay: delay + 120 + i * 70, easing: EASE_SOFT, fill: "both" }
    )
  );
  root.querySelector(".pj-shot img")?.animate([{ transform: "scale(1.08)" }, { transform: "scale(1)" }], {
    duration: 1600,
    delay: delay + 200,
    easing: EASE_SOFT,
    fill: "both"
  });
};
