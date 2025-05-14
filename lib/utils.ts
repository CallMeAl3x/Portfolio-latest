import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const projectKeys = [
  "zenpet",
  "bourse-des-voyages",
  "chatbot",
  "auth-template",
  "weather-app",
  "gcfillon",
  "translate-app"
] as const;
