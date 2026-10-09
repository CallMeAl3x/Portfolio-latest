import { useEffect, type RefObject } from "react";
import { clamp, hasSeenIntro, io, prefersReduced, smooth } from "./homeMotion";

const NS = "http://www.w3.org/2000/svg";
const DURATION = 1300;

interface WirePart {
  p: SVGPathElement;
  delay: number;
}

// Plan fil de fer de la section À propos : se dessine sur les vrais éléments [data-wire] quand le bloc
// arrive à l'écran (~1,3 s), puis le vrai contenu le remplace.
export function useWirePlan(pinRef: RefObject<HTMLElement | null>, wireRef: RefObject<SVGSVGElement | null>) {
  useEffect(() => {
    const pin = pinRef.current;
    const wire = wireRef.current;
    if (!pin || !wire) return;
    const reduced = prefersReduced();
    if (reduced) return; // contenu directement visible (CSS)

    const targets = [...pin.querySelectorAll<HTMLElement>("[data-wire]")];
    let parts: WirePart[] = [];
    let start = hasSeenIntro() ? -DURATION * 2 : 0;

    const build = () => {
      const ar = pin.getBoundingClientRect();
      // les éléments sont mesurés sans le léger décalage de l'animation
      const saved = targets.map((el) => el.style.transform);
      targets.forEach((el) => (el.style.transform = "none"));
      wire.setAttribute("viewBox", `0 0 ${ar.width} ${ar.height}`);
      wire.replaceChildren();
      parts = [];
      const add = (d: string, delay: number) => {
        const p = document.createElementNS(NS, "path");
        p.setAttribute("d", d);
        p.setAttribute("pathLength", "1");
        p.style.strokeDasharray = "1 1";
        wire.appendChild(p);
        parts.push({ p, delay });
      };
      targets.forEach((el, i) => {
        const r = el.getBoundingClientRect();
        const x = r.left - ar.left;
        const y = r.top - ar.top;
        const w = r.width;
        const h = r.height;
        const kind = el.dataset.wire;
        const base = i * 0.08;
        if (kind === "img") {
          const imgEl = el.querySelector("img");
          if (!imgEl) return;
          const img = imgEl.getBoundingClientRect();
          const ix = img.left - ar.left;
          const iy = img.top - ar.top;
          add(`M${ix} ${iy} H${ix + img.width} V${iy + img.height} H${ix} Z`, base);
          add(
            `M${ix} ${iy} L${ix + img.width} ${iy + img.height} M${ix + img.width} ${iy} L${ix} ${iy + img.height}`,
            base + 0.1
          );
        } else if (kind === "text") {
          const lh = parseFloat(getComputedStyle(el).lineHeight) || 50;
          const n = Math.max(1, Math.round(h / lh));
          for (let k = 0; k < n; k++)
            add(
              `M${x} ${y + lh * (k + 0.55)} H${x + w * (k === n - 1 ? 0.55 : 0.92 - (k % 2) * 0.08)}`,
              base + k * 0.05
            );
        } else if (kind === "rows") {
          el.querySelectorAll("div").forEach((row, k) => {
            const rr = row.getBoundingClientRect();
            const rx = rr.left - ar.left;
            const ry = rr.top - ar.top;
            add(`M${rx} ${ry + rr.height} H${rx + rr.width}`, base + k * 0.04);
            add(`M${rx} ${ry + 20} H${rx + 50} M${rx} ${ry + 44} H${rx + rr.width * 0.55}`, base + k * 0.04 + 0.03);
          });
        } else {
          add(`M${x} ${y + h / 2} H${x + w}`, base);
        }
      });
      targets.forEach((el, i) => (el.style.transform = saved[i]));
      // les nouveaux tracés repartent de l'état courant de l'animation
      apply(performance.now());
    };

    // état de l'animation à l'instant `now`, écrit sur les tracés et les éléments (renvoie son avancement)
    const apply = (now: number) => {
      const wireT = start ? clamp((now - start) / DURATION) : 0;
      const draw = smooth(wireT, 0, 0.6);
      const live = smooth(wireT, 0.55, 1);
      parts.forEach(({ p, delay }) => {
        const t = clamp((draw - delay * 0.6) / 0.55);
        p.style.strokeDashoffset = String(1 - io(t));
        p.style.opacity = String(1 - live);
      });
      targets.forEach((el) => {
        el.style.opacity = String(live);
        el.style.transform = live >= 1 ? "" : `translateY(${(1 - live) * 10}px)`;
      });
      return wireT;
    };

    // la boucle ne tourne que pendant les ~1,3 s du tracé, puis s'arrête d'elle-même
    let raf = 0;
    const frame = (now: number) => {
      raf = apply(now) < 1 ? requestAnimationFrame(frame) : 0;
    };
    const io2 = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (!e.isIntersecting || start) return;
          start = performance.now();
          if (!raf) raf = requestAnimationFrame(frame);
        }),
      { threshold: 0.35 }
    );
    io2.observe(pin);

    build();
    addEventListener("resize", build);
    addEventListener("load", build);
    document.fonts?.ready.then(build);
    return () => {
      cancelAnimationFrame(raf);
      io2.disconnect();
      removeEventListener("resize", build);
      removeEventListener("load", build);
      targets.forEach((el) => {
        el.style.opacity = "";
        el.style.transform = "";
      });
    };
  }, [pinRef, wireRef]);
}
