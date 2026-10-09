"use client";

import { useRouter } from "@/i18n/routing";
import { useCallback } from "react";
import { fadeOut, hideVeil, prefersReducedMotion, showFullVeil, sweep } from "./animations";
import { usePageAnimationStore } from "./usePageAnimationStore";

// verrou : une seule transition à la fois (levé à l'arrivée de la page cible)
let busy = false;

export const releaseTransition = () => {
  busy = false;
  usePageAnimationStore.getState().setDirection(null);
};

export const useProjectTransition = () => {
  const router = useRouter();

  // filet de sécurité si la page cible ne se monte jamais
  const guard = () =>
    window.setTimeout(() => {
      if (busy) {
        hideVeil();
        releaseTransition();
      }
    }, 8000);

  const start = useCallback(
    async (
      dir: "forward" | "backward" | "switch",
      href: string,
      prepare: () => Promise<void>,
      onBeforePush?: () => void
    ) => {
      if (busy) return;
      busy = true;
      usePageAnimationStore.getState().setDirection(dir);
      if (prefersReducedMotion()) {
        usePageAnimationStore.getState().setDirection(null);
        router.push(href);
        busy = false;
        return;
      }
      await prepare();
      onBeforePush?.();
      router.push(href);
      guard();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router]
  );

  // accueil vers projet : le calque monte, puis la page est montée dessous
  const openProject = useCallback((href: string) => start("forward", href, () => sweep("top", 0, 1, 1100)), [start]);

  // projet vers accueil : le contenu s'efface, le calque couvre, l'accueil se révèle derrière
  const closeProject = useCallback(
    (href: string) => start("backward", href, () => fadeOut("#projectpage .pj-wrap, #project-close"), showFullVeil),
    [start]
  );

  // projet suivant : pas de calque, seulement un fondu du contenu
  const switchProject = useCallback(
    (href: string) => start("switch", href, () => fadeOut("#projectpage .pj-wrap", 350)),
    [start]
  );

  return { openProject, closeProject, switchProject };
};
