"use client";
import { useTranslations } from "next-intl";
import { useId, type CSSProperties } from "react";
import Reveal from "../(elements)/Reveal";

interface TimelineEvent {
  key: "allforweb" | "penguinworld" | "gcfillon" | "cashnow" | "mapguesser";
  from: number;
  to: number;
  row: 0 | 1;
  now?: boolean;
}

// Positions en années décimales : hachuré pour les stages, plein pour ce qui est en cours
const EVENTS: TimelineEvent[] = [
  { key: "allforweb", from: 2022.0, to: 2022.5, row: 0 },
  { key: "penguinworld", from: 2023.0, to: 2023.5, row: 1 },
  { key: "gcfillon", from: 2023.5, to: 2023.67, row: 0 },
  { key: "cashnow", from: 2025.67, to: 2027.6, row: 1, now: true },
  { key: "mapguesser", from: 2025.9, to: 2027.6, row: 0, now: true }
];
const Y0 = 2022;
const Y1 = 2027.6;
const AXIS_Y = 40;
const pct = (v: number) => ((v - Y0) / (Y1 - Y0)) * 100;
const YEARS = [2022, 2023, 2024, 2025, 2026, 2027];

// Frise graduée 2022 → 2027 (empilée sur mobile)
export default function Timeline() {
  const t = useTranslations("About.timeline.items");
  const uid = useId();
  return (
    <Reveal className="hm-tl">
      <svg className="hm-tl-svg" aria-hidden="true">
        <line className="axis" x1="0" y1={AXIS_Y} x2="100%" y2={AXIS_Y} />
        {YEARS.map((yr) => (
          <g key={yr}>
            <line className="tick" x1={`${pct(yr)}%`} y1={AXIS_Y - 6} x2={`${pct(yr)}%`} y2={AXIS_Y + 6} />
            <text x={`${pct(yr)}%`} dx="4" y={AXIS_Y - 12}>
              {yr}
            </text>
          </g>
        ))}
      </svg>
      <div className="hm-tl-items">
        {EVENTS.map((e, i) => {
          const cardId = `${uid}-${e.key}`;
          const points = t(`${e.key}.description`)
            .split("|")
            .map((s) => s.trim())
            .filter(Boolean);
          return (
            <div
              key={e.key}
              className={["hm-ev", e.now ? "now" : "", pct(e.from) > 55 ? "end" : ""].join(" ").trim()}
              // survol ou focus clavier : la fiche s'ouvre ; la description reste lisible au lecteur d'écran
              tabIndex={0}
              role="group"
              aria-label={t(`${e.key}.name`)}
              aria-describedby={cardId}
              style={
                {
                  left: `${pct(e.from)}%`,
                  top: AXIS_Y + 30 + e.row * 110,
                  width: `${Math.max(0.3, pct(e.to) - pct(e.from))}%`,
                  "--d": `${i * 0.15}s`
                } as CSSProperties
              }
            >
              <div className="bar" />
              <div className="lab">
                <b>{t(`${e.key}.name`)}</b>
                <span>{t(`${e.key}.what`)}</span>
              </div>
              <div className="card" id={cardId}>
                <p className="hm-mono">{t(`${e.key}.date`)}</p>
                <p className="role">{t(`${e.key}.role`)}</p>
                <ul>
                  {points.map((pt) => (
                    <li key={pt}>{pt}</li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </Reveal>
  );
}
