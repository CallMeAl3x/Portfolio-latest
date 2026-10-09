"use client";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { EASE, prefersReduced } from "../../(utils)/homeMotion";

// Bouton soleil / lune : bascule entre thème clair et sombre
export default function ThemeToggle({ className = "", size = 24 }: { className?: string; size?: number }) {
  const t = useTranslations("Theme");
  const { resolvedTheme, setTheme } = useTheme();
  // le thème n'est connu qu'au montage : on évite tout écart d'hydratation
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const dark = mounted && resolvedTheme === "dark";

  // le nouveau thème s'ouvre en cercle depuis le bouton (View Transitions),
  // bascule directe si l'API manque ou si l'utilisateur réduit les animations
  const toggle = (button: HTMLElement) => {
    const next = dark ? "light" : "dark";
    if (!document.startViewTransition || prefersReduced()) {
      setTheme(next);
      return;
    }
    const { left, top, width, height } = button.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    const root = document.documentElement;

    root.classList.add("hm-theme-switching");
    const transition = document.startViewTransition(() => {
      // next-themes ne pose la classe qu'après le rendu : on la pose tout de suite pour la capture
      root.classList.remove("light", "dark");
      root.classList.add(next);
      root.style.colorScheme = next;
      setTheme(next);
    });
    transition.ready.then(() => {
      root.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 750, easing: EASE, pseudoElement: "::view-transition-new(root)" }
      );
    });
    transition.finished.finally(() => root.classList.remove("hm-theme-switching"));
  };

  return (
    <button
      type="button"
      aria-label={dark ? t("toLight") : t("toDark")}
      title={dark ? t("toLight") : t("toDark")}
      onClick={(e) => {
        e.stopPropagation();
        toggle(e.currentTarget);
      }}
      className={`flex items-center justify-center rounded-full p-2 ${className}`}
    >
      {dark ? <SunIcon size={size} strokeWidth={1.25} /> : <MoonIcon size={size} strokeWidth={1.25} />}
    </button>
  );
}
