"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function NavigationTracker() {
  const pathname = usePathname();

  useEffect(() => {
    const navigationHistory = JSON.parse(localStorage.getItem("navigation_history") || "[]");
    const previousPath = navigationHistory[navigationHistory.length - 1] || "";

    const wasAtHome = /^\/[a-z]{2}(\/)?$/.test(previousPath) || navigationHistory.length === 0;
    const isGoingHome = /^\/[a-z]{2}(\/)?$/.test(pathname);

    const isFirstTime = navigationHistory.length < 0 || navigationHistory === "null";
    localStorage.setItem("isFirstTime", isFirstTime.toString());
    localStorage.setItem("reloading", (wasAtHome && isGoingHome).toString());
    localStorage.setItem("wasAtHome", wasAtHome.toString());
    localStorage.setItem("isGoingHome", isGoingHome.toString());

    let navigationDirection = "";
    if (!wasAtHome && isGoingHome) {
      navigationDirection = "back";
    } else if (wasAtHome && !isGoingHome) {
      navigationDirection = "forward";
    } else if (isGoingHome && wasAtHome) {
      navigationDirection = "back";
    } else if (!isGoingHome && !wasAtHome) {
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
    } else if (isFirstTime) {
      navigationHistory.push(pathname);
    }

    localStorage.setItem("navigation_history", JSON.stringify(navigationHistory));
  }, [pathname]);

  return null;
}
