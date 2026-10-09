import { useEffect, type RefObject } from "react";
import { docTop, watchLayout } from "./layoutWatch";
import { clamp, prefersReduced, smooth } from "./homeMotion";
import { onScroll } from "./scrollBus";

// Pilote ce qui dépend de la position de défilement :
// - le titre du héros recule quand « À propos » monte ;
// - html[data-over-paper] : logo et menu passent en sombre sur les sections claires ;
// - html[data-on-paper] : la grille des 3 lignes apparaît sur les sections claires.
// Calcul sur l'événement de défilement, avec les positions des sections en cache.
export function useHomeScroll(copyRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = document.documentElement;
    const reduced = prefersReduced();
    let overPaper = false;
    let onPaper = false;
    let aboutTop = 0;
    let contactTop = 0;
    let vh = innerHeight;
    let ready = false;
    let lastOpacity = "";
    let lastTransform = "";

    // lecture seule : positions absolues des sections
    const measure = () => {
      const about = document.getElementById("about");
      const contact = document.getElementById("contact");
      ready = !!about && !!contact;
      if (!about || !contact) return;
      vh = innerHeight;
      aboutTop = docTop(about);
      contactTop = docTop(contact);
    };

    // écriture seule : tout vient du cache et de scrollY
    const update = () => {
      if (!ready) return;
      const y = scrollY;
      const aTop = aboutTop - y;
      const cTop = contactTop - y;
      const q = clamp(1 - aTop / vh);
      const copy = copyRef.current;
      if (copy && !reduced) {
        const opacity = String(1 - smooth(q, 0.1, 0.6));
        const transform = `translateY(${-q * 120}px)`;
        if (opacity !== lastOpacity) copy.style.opacity = lastOpacity = opacity;
        if (transform !== lastTransform) copy.style.transform = lastTransform = transform;
      }
      const paper = q > 0.9;
      const nextOn = paper && cTop > vh * 0.3;
      const nextOver = paper && aTop < 110 && cTop > 60;
      if (nextOn !== onPaper) {
        onPaper = nextOn;
        root.toggleAttribute("data-on-paper", nextOn);
      }
      if (nextOver !== overPaper) {
        overPaper = nextOver;
        root.toggleAttribute("data-over-paper", nextOver);
      }
    };

    const offScroll = onScroll(update);
    const offLayout = watchLayout(() => {
      measure();
      update();
    });
    measure();
    update();
    return () => {
      offScroll();
      offLayout();
      // le logo est fixe et survit à l'accueil : le repasser en clair pour la page projet
      root.removeAttribute("data-on-paper");
      root.removeAttribute("data-over-paper");
    };
  }, [copyRef]);
}
