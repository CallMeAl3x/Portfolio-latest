"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function NavigationTracker() {
  const pathname = usePathname();

  useEffect(() => {
    const navigationHistory = JSON.parse(localStorage.getItem("navigation_history") || "[]");
    const previousPath = navigationHistory[navigationHistory.length - 1] || "";

    const wasInLangRoot = /^\/[a-z]{2}(\/)?$/.test(previousPath);
    const isGoingToLangRoot = /^\/[a-z]{2}(\/)?$/.test(pathname);

    localStorage.setItem("wasInLangRoot", wasInLangRoot.toString());
    localStorage.setItem("isGoingToLangRoot", isGoingToLangRoot.toString());
    localStorage.setItem("reloading", (wasInLangRoot && isGoingToLangRoot).toString());

    let navigationDirection = "";
    if (!wasInLangRoot && isGoingToLangRoot) {
      navigationDirection = "back";
    } else if (wasInLangRoot && !isGoingToLangRoot) {
      navigationDirection = "forward";
    } else if (isGoingToLangRoot && wasInLangRoot) {
      navigationDirection = "back";
    } else if (!isGoingToLangRoot && !wasInLangRoot) {
      navigationDirection = "forward";
    }
    localStorage.setItem("navigation_direction", navigationDirection);

    if (navigationHistory.length > 0 && navigationHistory[navigationHistory.length - 1] !== pathname) {
      const isBack = navigationHistory.includes(pathname);

      if (!isBack) {
        navigationHistory.push(pathname);
      } else {
        const currentIndex = navigationHistory.lastIndexOf(pathname);
        navigationHistory.splice(currentIndex + 1);
      }
    }

    localStorage.setItem("navigation_history", JSON.stringify(navigationHistory));
  }, [pathname]);

  return null;
}
