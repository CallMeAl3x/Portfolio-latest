import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const projectKeys = [
  "mapguesser",
  "celia-gruss",
  "zenpet",
  "bourse-des-voyages",
  "translate-app",
  "gcfillon",
  // archivés (démo hors ligne) en fin de liste
  "chatbot",
  "auth-template",
  "weather-app"
] as const;
