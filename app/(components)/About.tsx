"use client";
import { EMAIL } from "@/lib/contact";
import { useTranslations } from "next-intl";
import { useRef } from "react";
import { useBulgeEdge } from "../(utils)/useBulgeEdge";
import { useWirePlan } from "../(utils)/useWirePlan";
import Education from "./(about)/Education";
import Timeline from "./(about)/Timeline";
import Tools from "./(about)/Tools";
import SectionHeader from "./(elements)/SectionHeader";

const SPECS = [
  ["role", "roleValue"],
  ["current", "currentValue"],
  ["languages", "languagesValue"],
  ["contact", null]
] as const;

export default function About() {
  const t = useTranslations("About");
  const th = useTranslations("HomePage.sections");
  const sectionRef = useRef<HTMLElement>(null);
  const edgeRef = useRef<SVGSVGElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const wireRef = useRef<SVGSVGElement>(null);
  useBulgeEdge(sectionRef, edgeRef, { alive: true });
  useWirePlan(pinRef, wireRef);

  return (
    <section className="hm-about" id="about" ref={sectionRef}>
      <svg className="hm-edge" ref={edgeRef} preserveAspectRatio="none" aria-hidden="true">
        <path />
        <path className="hm-edge-line" />
      </svg>
      <div className="hm-about-body">
        <div className="hm-pin-in" ref={pinRef}>
          <svg className="hm-wire" ref={wireRef} aria-hidden="true" />
          <div className="hm-wrap hm-about-in">
            <SectionHeader num="01" title={th("about")} reveal={false} />
            <div className="hm-intro">
              <figure className="hm-photo" data-wire="img">
                <span className="hm-crop tl" />
                <span className="hm-crop tr" />
                <span className="hm-crop bl" />
                <span className="hm-crop br" />
                <img src="/img/about/profile.webp" alt={t("photoAlt")} />
                <figcaption className="hm-mono">{t("fig")}</figcaption>
              </figure>
              <div className="hm-statement">
                <p className="hm-big" data-wire="text">
                  {t("statement")}
                </p>
                <dl className="hm-specs hm-mono" data-wire="rows">
                  {SPECS.map(([label, value]) => (
                    <div key={label}>
                      <dt>{t(`specs.${label}`)}</dt>
                      <dd>{value ? t(`specs.${value}`) : EMAIL}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="hm-wrap">
          <SectionHeader num="02" title={th("career")} />
          <Timeline />
          <SectionHeader num="03" title={th("tools")} />
          <Tools />
          <SectionHeader num="04" title={th("education")} />
          <Education />
        </div>
      </div>
    </section>
  );
}
