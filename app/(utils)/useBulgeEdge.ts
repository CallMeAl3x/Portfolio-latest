import { useEffect, type RefObject } from "react";
import { docTop, watchLayout } from "./layoutWatch";
import { clamp, hasSeenIntro, io, prefersReduced, smooth } from "./homeMotion";
import { onScroll } from "./scrollBus";

interface BulgeOptions {
  // true : le bord monte pendant l'intro puis respire et penche vers la souris (bord du héros)
  alive?: boolean;
}

const INTRO_DELAY = 900;
const INTRO_MS = 1400;
const FRAME_MS = 1000 / 60;

// Bord bombé posé au-dessus d'une section : il s'aplatit à mesure qu'elle monte.
// Il se redessine au défilement et au redimensionnement (positions en cache). Une boucle d'image
// ne tourne que pour le bord vivant : pendant l'intro, puis tant qu'il respire (page en haut,
// bord visible, onglet affiché).
export function useBulgeEdge(
  sectionRef: RefObject<HTMLElement | null>,
  svgRef: RefObject<SVGSVGElement | null>,
  { alive = false }: BulgeOptions = {}
) {
  useEffect(() => {
    const section = sectionRef.current;
    const svg = svgRef.current;
    const path = svg?.querySelector("path");
    const line = svg?.querySelector<SVGPathElement>("path.hm-edge-line");
    if (!section || !svg || !path) return;

    const reduced = prefersReduced();
    const skipIntro = reduced || hasSeenIntro();
    const edgeT0 = performance.now() + INTRO_DELAY;
    const animated = alive && !reduced;
    let mouseX = 0.5;
    let leanX = 0.5;
    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX / innerWidth;
    };
    if (animated) addEventListener("mousemove", onMove, { passive: true });

    // positions en cache (recalculées au redimensionnement et quand le document change de hauteur)
    let secTop = 0;
    let h = 0;
    let W = innerWidth;
    let vh = innerHeight;
    let docH = 0;
    let lastP = 1;
    let lastD = "";
    let lastLine = "";
    const measure = () => {
      secTop = docTop(section);
      h = svg.getBoundingClientRect().height;
      W = innerWidth;
      vh = innerHeight;
      docH = document.documentElement.scrollHeight;
      svg.setAttribute("viewBox", `0 0 ${W} ${h}`);
      lastD = "";
    };

    const render = (now: number) => {
      const y = scrollY;
      const top = secTop - y;
      // 0 quand la section entre par le bas, 1 quand son haut atteint le haut de l'écran
      // (ou le plus haut qu'il puisse monter, si la page s'arrête avant)
      const docEnd = docH - y - vh;
      const reach = Math.max(1, Math.min(vh, vh - (top - docEnd)));
      const p = clamp((vh - top) / reach);
      lastP = p;
      let b = (1 - io(p)) * h * 0.9;
      let ax = W / 2;
      if (alive) {
        const edgeIn = skipIntro ? 1 : io(clamp((now - edgeT0) / INTRO_MS));
        // respiration douce, qui s'éteint dès qu'on commence à défiler
        const calm = 1 - smooth(p, 0, 0.15);
        const breath = reduced ? 1 : 1 + Math.sin(now / 1100) * 0.06 * calm;
        b *= edgeIn * breath;
        ax = W * (0.5 + (leanX - 0.5) * 0.18 * calm);
      }
      const d = `M0 ${h + 1} L0 ${h} Q${ax} ${h - 2 * b} ${W} ${h} L${W} ${h + 1} Z`;
      if (d !== lastD) {
        lastD = d;
        path.setAttribute("d", d);
      }
      const l = `M0 ${h} Q${ax} ${h - 2 * b} ${W} ${h}`;
      if (l !== lastLine) {
        lastLine = l;
        line?.setAttribute("d", l);
      }
    };

    // --- boucle de respiration (bord vivant seulement) ---
    let raf = 0;
    let inView = false;
    let lastT = 0;
    const needLoop = (now: number) =>
      animated && inView && !document.hidden && (lastP < 0.15 || (!skipIntro && now < edgeT0 + INTRO_MS));
    const frame = (now: number) => {
      // l'inclinaison rattrape la souris à chaque image ; après une pause, on rattrape les images manquées
      const dt = lastT ? now - lastT : FRAME_MS;
      lastT = now;
      const n = dt > 2.5 * FRAME_MS ? Math.round(dt / FRAME_MS) : 1;
      leanX = mouseX + (leanX - mouseX) * 0.96 ** n;
      render(now);
      raf = needLoop(now) ? requestAnimationFrame(frame) : 0;
    };
    const wake = () => {
      if (!raf && needLoop(performance.now())) raf = requestAnimationFrame(frame);
    };

    const refresh = () => {
      render(performance.now());
      wake();
    };
    const offScroll = onScroll(refresh);
    const offLayout = watchLayout(() => {
      measure();
      refresh();
    });
    measure();
    render(performance.now());

    let obs: IntersectionObserver | undefined;
    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
        raf = 0;
      } else wake();
    };
    if (animated) {
      obs = new IntersectionObserver((es) => {
        inView = es[es.length - 1].isIntersecting;
        if (inView) wake();
      });
      obs.observe(svg);
      document.addEventListener("visibilitychange", onVisibility);
    }
    return () => {
      cancelAnimationFrame(raf);
      obs?.disconnect();
      offScroll();
      offLayout();
      document.removeEventListener("visibilitychange", onVisibility);
      removeEventListener("mousemove", onMove);
    };
  }, [sectionRef, svgRef, alive]);
}
