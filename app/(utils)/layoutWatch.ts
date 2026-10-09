// Appelle `fn` quand la mise en page peut avoir changé (redimensionnement, hauteur du document,
// chargement, polices) : sert à rafraîchir les positions mises en cache.
export function watchLayout(fn: () => void) {
  let alive = true;
  const run = () => alive && fn();
  addEventListener("resize", run);
  addEventListener("load", run);
  const ro = new ResizeObserver(run);
  ro.observe(document.body);
  ro.observe(document.documentElement);
  document.fonts?.ready.then(run);
  return () => {
    alive = false;
    removeEventListener("resize", run);
    removeEventListener("load", run);
    ro.disconnect();
  };
}

// Position absolue (dans le document) du haut d'un élément, à la position de défilement courante
export const docTop = (el: Element) => el.getBoundingClientRect().top + scrollY;

// Idem, mais insensible aux transformations (révélations) : somme des décalages de mise en page
export function layoutTop(el: HTMLElement) {
  let y = 0;
  for (let n: HTMLElement | null = el; n; n = n.offsetParent as HTMLElement | null) y += n.offsetTop;
  return y;
}
