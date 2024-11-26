"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function NavigationTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // Get navigation history from localStorage
    const navigationHistory = JSON.parse(localStorage.getItem("navigation_history") || "[]");

    // Define the language pattern (e.g., /en/ or /fr/)
    const langPattern = /^\/([a-z]{2})\//; // Matches '/en/', '/fr/', etc.

    // Check if the pathname starts with a language prefix and has something after it
    const match = pathname.match(langPattern);
    const isLangPage = match !== null;
    const hasSubPath = isLangPage && pathname.split("/").length > 3; // Check if there's something after /{lang}/

    console.log("isLangPage:", isLangPage, "hasSubPath:", hasSubPath);

    if (navigationHistory.length > 0 && navigationHistory[navigationHistory.length - 1] !== pathname) {
      // Check if current path exists in previous history
      const isBack = navigationHistory.includes(pathname);

      // Log the direction of navigation
      console.log(isBack ? "back" : "forward");
      localStorage.setItem("navigation_direction", isBack ? "back" : "forward");

      // Update navigation history
      if (!isBack) {
        navigationHistory.push(pathname);
      } else {
        // Remove paths after the current path when going back
        const currentIndex = navigationHistory.lastIndexOf(pathname);
        navigationHistory.splice(currentIndex + 1);
      }
    } else {
      console.log("forward");
      localStorage.setItem("navigation_direction", "forward");

      // Add the first path to history
      navigationHistory.push(pathname);
    }

    // Save updated navigation history
    localStorage.setItem("navigation_history", JSON.stringify(navigationHistory));
  }, [pathname]);

  return null;
}
