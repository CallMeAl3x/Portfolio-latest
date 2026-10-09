"use client";

import { enterContent, hideVeil } from "@/app/(utils)/(usePageTransition)/animations";
import { usePageAnimationStore } from "@/app/(utils)/(usePageTransition)/usePageAnimationStore";
import { releaseTransition, useProjectTransition } from "@/app/(utils)/(usePageTransition)/useProjectTransition";
import { Link } from "@/i18n/routing";
import { nextProjectKey, parseProject, type ProjectFigure } from "@/lib/projects";
import { useLenis } from "lenis/react";
import { useLocale, useMessages, useTranslations } from "next-intl";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import CloseLink from "./(elements)/closeLink";

// vrai dès que l'élément entre dans le viewport (une seule fois)
function useInView() {
  const ref = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, seen] as const;
}

function Counter({ figure, active, locale }: { figure: ProjectFigure; active: boolean; locale: string }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!active) return;
    const t0 = performance.now();
    const duration = 1400;
    let raf = 0;
    const step = (t: number) => {
      const k = Math.min(1, (t - t0) / duration);
      setN(figure.value * (1 - Math.pow(1 - k, 4)));
      if (k < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [active, figure.value]);
  return (
    <b>
      {figure.prefix ?? ""}
      {Math.round(n).toLocaleString(locale === "fr" ? "fr-FR" : "en-US")}
    </b>
  );
}

function Figures({ figures, locale }: { figures: ProjectFigure[]; locale: string }) {
  const [ref, seen] = useInView();
  return (
    <div ref={ref} className={`pj-figures pj-reveal${seen ? " in" : ""}`}>
      {figures.map((f) => (
        <div className="pj-fig" key={f.label}>
          <Counter figure={f} active={seen} locale={locale} />
          <span>{f.label}</span>
          {f.note && <small>{f.note}</small>}
        </div>
      ))}
    </div>
  );
}

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const [ref, seen] = useInView();
  return (
    <div ref={ref} className={`pj-reveal ${className}${seen ? " in" : ""}`}>
      {children}
    </div>
  );
}

export default function ProjectView({ projectId }: { projectId: string }) {
  const t = useTranslations("ProjectPage");
  const locale = useLocale();
  const messages = useMessages();
  const lenis = useLenis();
  const lenisRef = useRef(lenis);
  lenisRef.current = lenis;
  const rootRef = useRef<HTMLDivElement>(null);
  const { switchProject } = useProjectTransition();

  const labels = { frontend: t("frontend"), backend: t("backend") };
  const project = parseProject(messages.CardList, projectId, labels);
  const nextKey = nextProjectKey(projectId);
  const next = parseProject(messages.CardList, nextKey, labels);

  // arrivée : hors transition (accès direct) on ne touche à rien
  useLayoutEffect(() => {
    const dir = usePageAnimationStore.getState().direction;
    if (!dir || !rootRef.current) return;
    window.scrollTo(0, 0);
    lenisRef.current?.scrollTo(0, { immediate: true, force: true });
    enterContent(rootRef.current);
    hideVeil();
    releaseTransition();
  }, [projectId]);

  // Lenis remesure la page à l'arrivée (accès direct ou transition)
  useEffect(() => {
    lenis?.resize();
    const id = window.setTimeout(() => lenisRef.current?.resize(), 300);
    return () => window.clearTimeout(id);
  }, [lenis, projectId]);

  const host = project.visitUrl ? new URL(project.visitUrl).hostname.replace(/^www\./, "") : "";

  const handleNext = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    switchProject(`/projects/${nextKey}`);
  };

  return (
    <div className="pj" id="projectpage" ref={rootRef}>
      <CloseLink />
      <div className="pj-wrap">
        <header className="pj-hero">
          <h1 className="pj-title">
            <span>{project.title}</span>
          </h1>
          <p className="pj-pitch pj-st">{project.pitch}</p>
          {project.meta.length > 0 && (
            <div className="pj-meta pj-st">
              {project.meta.map((m) => (
                <div key={m.label}>
                  <p>{m.label}</p>
                  <p>{m.value}</p>
                </div>
              ))}
            </div>
          )}
          {project.visitUrl && (
            <a className="pj-cta pj-st" href={project.visitUrl} target="_blank" rel="noopener noreferrer">
              <span>
                {t("visit")} {host}
              </span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M4 12L12 4M12 4H6M12 4v6" />
              </svg>
            </a>
          )}
          {project.archived && <p className="pj-archived pj-st">{t("archived")}</p>}
        </header>

        <div className="pj-shot pj-st">
          <img src={project.img} alt={project.title} />
        </div>

        {project.figures.length > 0 && <Figures figures={project.figures} locale={locale} />}

        <div className="pj-cols">
          <Reveal>
            <p className="pj-label">{t("project")}</p>
            {project.body.map((p) => (
              <p className="pj-body" key={p}>
                {p}
              </p>
            ))}
          </Reveal>
          <Reveal className="pj-stack">
            <p className="pj-label">{t("stack")}</p>
            {project.stack.map((g) => (
              <div key={g.group}>
                <h4>{g.group}</h4>
                <div className="pj-chips">
                  {g.items.map((x) => (
                    <span key={x}>{x}</span>
                  ))}
                </div>
              </div>
            ))}
          </Reveal>
        </div>

        <Link href={`/projects/${nextKey}`} className="pj-next" onClick={handleNext}>
          <Reveal>
            <p>{t("next")}</p>
            <div className="nt">
              <span>{next.title}</span>
              <svg className="arr" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.2">
                <path d="M6 24h36M30 12l12 12-12 12" />
              </svg>
            </div>
          </Reveal>
        </Link>
      </div>
    </div>
  );
}
