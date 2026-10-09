"use client";
import { projectKeys } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useProjectTransition } from "../(utils)/(usePageTransition)/useProjectTransition";
import Card from "./(elements)/Card";
import SectionHeader from "./(elements)/SectionHeader";

const FIRST = 4;

export default function Projects() {
  const [showAll, setShowAll] = useState(false);
  const t = useTranslations("CardList");
  const th = useTranslations("HomePage");
  const { openProject } = useProjectTransition();
  const shown = showAll ? projectKeys : projectKeys.slice(0, FIRST);

  return (
    <section className="hm-projects" id="projects">
      <div className="hm-wrap">
        <SectionHeader num="05" title={th("sections.projects")} />
        <div id="projects-list">
          {shown.map((key, i) => (
            <Card
              key={key}
              index={i + 1}
              title={t(`${key}.title`)}
              cardDescription={t(`${key}.cardDescription`)}
              cardImage={t(`${key}.cardImage`)}
              link={t(`${key}.link`)}
              year={t.has(`${key}.year`) ? t(`${key}.year`) : undefined}
              archived={t.has(`${key}.archived`)}
              onOpen={openProject}
            />
          ))}
        </div>
        <button type="button" className="hm-more hm-mono" onClick={() => setShowAll((v) => !v)}>
          {showAll ? th("seeLess") : th("seeMore")}
        </button>
      </div>
    </section>
  );
}
