"use client";
import { useTranslations } from "next-intl";
import Reveal from "../(elements)/Reveal";

const KEYS = ["YNOV-PARIS", "YNOV-LILLE", "BUT-MMI", "BAC-INFO"] as const;

// Tableau des formations, repère « actuel » sur la première ligne
export default function Education() {
  const t = useTranslations("About.education");
  return (
    <Reveal as="table" className="hm-spec">
      {/* en-têtes pour les lecteurs d'écran, le tableau reste visuellement sans en-tête */}
      <thead className="sr-only">
        <tr>
          <th scope="col">{t("columns.dates")}</th>
          <th scope="col">{t("columns.degree")}</th>
          <th scope="col">{t("columns.school")}</th>
          <th scope="col">{t("columns.status")}</th>
        </tr>
      </thead>
      <tbody>
        {KEYS.map((key, i) => (
          <tr key={key}>
            <td className="hm-mono">{t(`formations.${key}.date`)}</td>
            <td>{t(`formations.${key}.title`)}</td>
            <td className="hm-mono">{t(`formations.${key}.school`)}</td>
            <td className="tag">{i === 0 ? t("current") : ""}</td>
          </tr>
        ))}
      </tbody>
    </Reveal>
  );
}
