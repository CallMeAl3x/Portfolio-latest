import { routing } from "@/i18n/routing";
import { dataUrl, ogAsset, ogFonts, OG_SIZE } from "@/lib/og";
import { ImageResponse } from "next/og";

// Image de partage (LinkedIn, X, messageries) : 1200 × 630, une par langue, générée au build
export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Alexandre Bonefons";

export function generateStaticParams() {
  return routing.locales.map((lang) => ({ lang }));
}

export default async function OpengraphImage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const { Metadata } = (await import(`../../messages/${lang}.json`)).default;
  const [fonts, logo, portrait] = await Promise.all([ogFonts(), ogAsset("logo.svg"), ogAsset("og-portrait.png")]);

  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", background: "#0a0a0a", position: "relative" }}>
        {/* les trois lignes verticales du héros */}
        {[300, 600, 900].map((x) => (
          <div key={x} style={{ position: "absolute", left: x, top: 0, width: 1, height: 630, background: "#1f1f1f" }} />
        ))}
        <img
          src={dataUrl(portrait, "image/png")}
          width={504}
          height={630}
          style={{ position: "absolute", right: 24, bottom: 0 }}
          alt=""
        />
        <img src={dataUrl(logo, "image/svg+xml")} width={110} height={110} style={{ position: "absolute", left: 48, top: 40 }} alt="" />
        <div
          style={{
            position: "absolute",
            left: 72,
            bottom: 72,
            display: "flex",
            flexDirection: "column",
            color: "#ededed"
          }}
        >
          <div style={{ fontFamily: "Poppins", fontWeight: 300, fontSize: 24, letterSpacing: 2, color: "#8a8a8a" }}>
            portfolio.bonefons.com
          </div>
          <div style={{ fontFamily: "Poppins", fontWeight: 400, fontSize: 76, lineHeight: 1.05, marginTop: 18 }}>
            Alexandre
          </div>
          <div style={{ fontFamily: "Poppins", fontWeight: 400, fontSize: 76, lineHeight: 1.05 }}>Bonefons</div>
          <div style={{ fontFamily: "Poppins", fontWeight: 300, fontSize: 34, marginTop: 22, color: "#bdbdbd" }}>
            {`${Metadata.jobTitle} · Paris`}
          </div>
        </div>
      </div>
    ),
    { ...size, fonts }
  );
}
