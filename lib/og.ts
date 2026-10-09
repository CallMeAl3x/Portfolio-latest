import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Outils communs aux images de partage (next/og) : fichiers de assets/, polices, data URL
export const OG_SIZE = { width: 1200, height: 630 };

export const ogAsset = (file: string) => readFile(join(process.cwd(), "assets", file));

export const dataUrl = (data: Buffer, type: string) => `data:${type};base64,${data.toString("base64")}`;

// Poppins en TTF : le moteur de rendu ne lit pas le woff2 du site
export async function ogFonts() {
  const [regular, light] = await Promise.all([ogAsset("fonts/Poppins-Regular.ttf"), ogAsset("fonts/Poppins-Light.ttf")]);
  return [
    { name: "Poppins", data: regular, weight: 400 as const, style: "normal" as const },
    { name: "Poppins", data: light, weight: 300 as const, style: "normal" as const }
  ];
}
