"use client";
import { useLenis } from "lenis/react";
import { useEffect, useRef } from "react";
import About from "../(components)/About";
import Contact from "../(components)/Contact";
import Cursor from "../(components)/(elements)/Cursor";
import Grid from "../(components)/(elements)/Grid";
import Ruler from "../(components)/(elements)/Ruler";
import Hero from "../(components)/Hero";
import Menu from "../(components)/Menu";
import Projects from "../(components)/Projects";
import { hideVeil, sweep } from "../(utils)/(usePageTransition)/animations";
import { usePageAnimationStore } from "../(utils)/(usePageTransition)/usePageAnimationStore";
import { releaseTransition } from "../(utils)/(usePageTransition)/useProjectTransition";

export default function Homepage() {
  const lenis = useLenis();
  const lenisRef = useRef(lenis);
  lenisRef.current = lenis;

  // retour d'un projet : le calque couvre encore l'écran, on cale la liste puis on le retire vers le haut
  useEffect(() => {
    if (usePageAnimationStore.getState().direction !== "backward") return;
    const list = document.getElementById("projects-list");
    if (list) {
      const rect = list.getBoundingClientRect();
      const top = Math.max(0, rect.top + window.scrollY - Math.max(0, (window.innerHeight - rect.height) / 2));
      window.scrollTo({ top, behavior: "instant" });
      // Lenis connaît encore la hauteur de la page projet : on la lui fait relire avant de caler
      lenisRef.current?.resize();
      lenisRef.current?.scrollTo(top, { immediate: true, force: true });
    }
    releaseTransition();
    sweep("bottom", 1, 0, 1200).then(hideVeil);
  }, []);

  return (
    <main id="mainpage" className="hm-main">
      <Menu />
      <Hero />
      <About />
      <Projects />
      <Contact />
      <Grid />
      <Ruler />
      <Cursor />
    </main>
  );
}
