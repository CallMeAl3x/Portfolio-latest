"use client";

import { useProjectTransition } from "@/app/(utils)/(usePageTransition)/useProjectTransition";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { useEffect } from "react";

// Bouton rond de fermeture : retour à l'accueil avec la transition
export default function CloseLink() {
  const t = useTranslations("ProjectPage");
  const { closeProject } = useProjectTransition();

  // Échap ferme aussi le projet
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape" || e.repeat || e.metaKey || e.ctrlKey || e.altKey) return;
      closeProject("/");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeProject]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    closeProject("/");
  };

  return (
    <Link
      href="/"
      id="project-close"
      className="pj-close"
      title={t("close")}
      aria-label={t("close")}
      onClick={handleClick}
    >
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M2 2l14 14M16 2L2 16" />
      </svg>
    </Link>
  );
}
