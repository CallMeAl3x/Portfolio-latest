"use client";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { hasSeenIntro, markIntroSeen } from "../(utils)/homeMotion";
import { useHomeScroll } from "../(utils)/useHomeScroll";

// Héros : halo, 3 lignes verticales qui poussent, titre dont chaque mot sort d'un léger flou
export default function Hero() {
  const t = useTranslations("HomePage");
  const lines = t.raw("titleLines") as string[];
  const rootRef = useRef<HTMLElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  useHomeScroll(copyRef);

  // l'entrée (halo, lignes, mots, sous-titre) est en CSS pour démarrer dès le premier rendu,
  // sans attendre l'hydratation : le titre est l'élément le plus large de l'écran (LCP)
  const [seen] = useState(hasSeenIntro);
  useEffect(() => markIntroSeen(), []);
  let word = 0;

  return (
    <section className={`hm-hero${seen ? " is-seen" : ""}`} id="home" ref={rootRef}>
      <div className="hm-halo" />
      <div className="hm-lines">
        <div className="frame">
          {[25, 50, 75].map((x) => (
            // ordre d'apparition : milieu, gauche, droite
            <span key={x} className="hm-vl" style={{ left: `${x}%`, ["--o" as string]: [1, 0, 2][[25, 50, 75].indexOf(x)] }} />
          ))}
        </div>
      </div>
      <div className="hm-copy" ref={copyRef}>
        <div>
          <h1 className="hm-h1">
            {lines.map((line) => (
              <span className="ln" key={line}>
                {line.split(" ").map((w, i, arr) => (
                  <span key={`${w}-${i}`}>
                    <span className="wd" style={{ ["--i" as string]: word++ }}>{w}</span>
                    {i < arr.length - 1 ? " " : ""}
                  </span>
                ))}
              </span>
            ))}
          </h1>
          <p className="hm-sub">{t("description")}</p>
        </div>
      </div>
    </section>
  );
}
