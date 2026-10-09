"use client";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { onFrame, onPointer, pointer } from "../../(utils)/frameLoop";
import { finePointer, prefersReduced } from "../../(utils)/homeMotion";
import { onScroll } from "../../(utils)/scrollBus";

type CursorState = "" | "link" | "native";

const stateOf = (el: Element | null): CursorState => {
  if (!el) return "";
  if (el.closest('input, textarea, select, [contenteditable="true"]')) return "native";
  if (el.closest('a, button, [role="button"], summary, label')) return "link";
  return "";
};

// Curseur « schéma » : réticule fin qui grossit sur les éléments cliquables (souris seulement)
export default function Cursor() {
  const [on, setOn] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (finePointer() && !prefersReduced()) setOn(true);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!on || !el) return;
    const root = document.documentElement;
    root.classList.add("hm-has-cursor");
    let x = 0;
    let y = 0;
    let started = false;
    let state: CursorState = "";
    let lastTarget: Element | null = null;
    let stopLoop: (() => void) | undefined;
    const draw = () => (el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`);
    // la croix rattrape la souris ; la boucle s'arrête dès qu'elle l'a rejointe
    const step = () => {
      x += (pointer.x - x) * 0.6;
      y += (pointer.y - y) * 0.6;
      if (Math.abs(pointer.x - x) + Math.abs(pointer.y - y) < 0.05) {
        x = pointer.x;
        y = pointer.y;
        stopLoop?.();
        stopLoop = undefined;
      }
      draw();
    };
    // état (lien, champ de saisie) et visibilité : calculés sur les événements, pas à chaque image
    const sync = (target: Element | null) => {
      if (target !== lastTarget) {
        lastTarget = target;
        const next = stateOf(target);
        if (next !== state) {
          state = next;
          el.dataset.state = next;
        }
      }
      const visible = pointer.inside && state !== "native";
      if (visible !== el.hasAttribute("data-on")) el.toggleAttribute("data-on", visible);
    };
    const offPointer = onPointer(() => {
      if (!started) {
        x = pointer.x;
        y = pointer.y;
        started = true;
        draw();
      }
      if (!stopLoop && (x !== pointer.x || y !== pointer.y)) stopLoop = onFrame(step);
      sync(pointer.target);
    });
    // le défilement change l'élément sous la souris sans qu'elle bouge
    const offScroll = onScroll(() => {
      if (!started || !pointer.inside) return;
      sync(document.elementFromPoint(pointer.x, pointer.y) ?? pointer.target);
    });
    return () => {
      offPointer();
      offScroll();
      stopLoop?.();
      root.classList.remove("hm-has-cursor");
    };
  }, [on]);

  if (!on) return null;
  return createPortal(
    <div className="hm-cur" ref={ref} aria-hidden="true">
      <span className="cross" />
    </div>,
    document.body
  );
}
