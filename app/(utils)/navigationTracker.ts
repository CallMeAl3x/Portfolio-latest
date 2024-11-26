"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function NavigationTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // Get navigation history from localStorage
    const navigationHistory = JSON.parse(localStorage.getItem("navigation_history") || "[]");

    const previousPath = navigationHistory[navigationHistory.length - 1] || "";
    // Check if the user was in `/{lang}` or `/{lang}/` and not `/{lang}/[projectId]`
    const wasInLangRoot = /^\/[a-z]{2}(\/)?$/.test(previousPath);
    const isGoingToLangRoot = /^\/[a-z]{2}(\/)?$/.test(pathname);

    localStorage.setItem("wasInLangRoot", wasInLangRoot.toString());
    localStorage.setItem("isGoingToLangRoot", isGoingToLangRoot.toString());

    if (wasInLangRoot && isGoingToLangRoot) {
      localStorage.setItem("reloading", "true");
    } else {
      localStorage.setItem("reloading", "false");
    }

    if (navigationHistory.length > 0 && navigationHistory[navigationHistory.length - 1] !== pathname) {
      // Check if current path exists in previous history
      const isBack = navigationHistory.includes(pathname);

      // Log the direction of navigation
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
      localStorage.setItem("navigation_direction", "forward");

      // Add the first path to history
      navigationHistory.push(pathname);
    }

    // Save updated navigation history
    localStorage.setItem("navigation_history", JSON.stringify(navigationHistory));
  }, [pathname]);

  return null;
}
