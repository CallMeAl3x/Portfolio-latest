import { routing } from "@/i18n/routing";
import { dataUrl, ogAsset, ogFonts, OG_SIZE } from "@/lib/og";
import { projectKeys } from "@/lib/utils";
import { ImageResponse } from "next/og";

// Image de partage d'un projet : titre à gauche, capture à droite.
// La capture vient de assets/projects/<clé>.jpg, déjà recadrée aux proportions du cadre (576 × 502) depuis
// le coin haut gauche : le moteur de rendu ne lit pas le WebP du site et ignore objectPosition.
export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Alexandre Bonefons";

export function generateStaticParams() {
  return routing.locales.flatMap((lang) => projectKeys.map((projectId) => ({ lang, projectId })));
}

export default async function ProjectOpengraphImage({
  params
}: {
  params: Promise<{ lang: string; projectId: string }>;
}) {
  const { lang, projectId } = await params;
  const messages = (await import(`../../../../messages/${lang}.json`)).default;
  const project = messages.CardList[projectId];
  const index = projectKeys.findIndex((k) => k === projectId) + 1;
  const [fonts, logo, shot] = await Promise.all([
    ogFonts(),
    ogAsset("logo.svg"),
    ogAsset(`projects/${projectId}.jpg`)
  ]);
  const label = messages.HomePage.fig.replace("{n}", String(index).padStart(2, "0"));
  const long = project.title.length > 14;

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          background: "#0a0a0a",
          position: "relative",
          fontFamily: "Poppins",
          color: "#ededed"
        }}
      >
        <img src={dataUrl(logo, "image/svg+xml")} width={88} height={88} style={{ position: "absolute", left: 44, top: 36 }} alt="" />
        <div
          style={{
            position: "absolute",
            left: 64,
            top: 150,
            width: 470,
            height: 416,
            display: "flex",
            flexDirection: "column"
          }}
        >
          <div style={{ fontWeight: 300, fontSize: 22, letterSpacing: 1.5, color: "#8a8a8a" }}>
            {`${label} · ${project.cardDescription}`}
          </div>
          <div style={{ fontWeight: 400, fontSize: long ? 54 : 72, lineHeight: 1.08, marginTop: 18 }}>{project.title}</div>
          {project.archived && (
            <div style={{ display: "flex", alignItems: "center", marginTop: 22, fontWeight: 300, fontSize: 22, color: "#bdbdbd" }}>
              <div style={{ width: 10, height: 10, borderRadius: 5, background: "#e5484d", marginRight: 12 }} />
              {messages.HomePage.archivedBanner}
            </div>
          )}
          <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", fontWeight: 300, fontSize: 22 }}>
            <div style={{ color: "#bdbdbd" }}>Alexandre Bonefons</div>
            <div style={{ color: "#8a8a8a" }}>portfolio.bonefons.com</div>
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            left: 576,
            top: 64,
            width: 576,
            height: 502,
            display: "flex",
            borderRadius: 14,
            overflow: "hidden",
            border: "1px solid #2c2c2c"
          }}
        >
          <img
            src={dataUrl(shot, "image/jpeg")}
            width={576}
            height={502}
            alt=""
          />
        </div>
      </div>
    ),
    { ...size, fonts }
  );
}
