// Lecture typée des projets dans les messages (CardList), avec repli pour les projets sans les nouveaux champs
import { projectKeys } from "./utils";

export interface ProjectMeta {
  label: string;
  value: string;
}
export interface ProjectFigure {
  value: number;
  prefix?: string;
  label: string;
  note?: string;
}
export interface ProjectStackGroup {
  group: string;
  items: string[];
}
export interface ProjectData {
  key: string;
  title: string;
  visitUrl: string;
  archived: boolean; // démo hors ligne : plus de lien, mention « archivé »
  img: string;
  pitch: string;
  meta: ProjectMeta[];
  figures: ProjectFigure[];
  body: string[];
  stack: ProjectStackGroup[];
}

const isRecord = (v: unknown): v is Record<string, unknown> => typeof v === "object" && v !== null && !Array.isArray(v);
const str = (v: unknown) => (typeof v === "string" ? v : "");
const list = (v: unknown): unknown[] => (Array.isArray(v) ? v : []);

const splitTech = (v: unknown) =>
  str(v)
    .split(", ")
    .map((s) => s.trim())
    .filter((s) => s && s.toUpperCase() !== "N/A");

export function parseProject(
  cardList: unknown,
  key: string,
  labels: { frontend: string; backend: string }
): ProjectData {
  const raw = isRecord(cardList) && isRecord(cardList[key]) ? cardList[key] : {};
  const description = str(raw.description);

  const meta = list(raw.meta).flatMap((m) =>
    isRecord(m) && str(m.label) ? [{ label: str(m.label), value: str(m.value) }] : []
  );
  const figures = list(raw.figures).flatMap((f) =>
    isRecord(f) && typeof f.value === "number"
      ? [
          {
            value: f.value,
            prefix: str(f.prefix) || undefined,
            label: str(f.label),
            note: str(f.note) || undefined
          }
        ]
      : []
  );
  const body = list(raw.body).map(str).filter(Boolean);
  let stack = list(raw.stack).flatMap((g) =>
    isRecord(g) && str(g.group) ? [{ group: str(g.group), items: list(g.items).map(str).filter(Boolean) }] : []
  );
  if (stack.length === 0) {
    const tech = isRecord(raw.technologies) ? raw.technologies : {};
    stack = [
      { group: labels.frontend, items: splitTech(tech.frontend) },
      { group: labels.backend, items: splitTech(tech.backend) }
    ].filter((g) => g.items.length > 0);
  }

  return {
    key,
    title: str(raw.title),
    visitUrl: str(raw.visitUrl),
    archived: raw.archived === true,
    img: str(raw.img),
    pitch: str(raw.pitch) || description,
    meta,
    figures,
    body: body.length > 0 ? body : [description],
    stack
  };
}

// projet suivant dans l'ordre de projectKeys, en boucle
export const nextProjectKey = (key: string) => {
  const i = projectKeys.findIndex((k) => k === key);
  return projectKeys[(i + 1) % projectKeys.length];
};
