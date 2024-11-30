import { getStorageValue } from "./storage";

export const handleScrolling = (wasAtHome: boolean, isGoingHome: boolean) => {
  const isFirstTime = getStorageValue("IS_FIRST_TIME") === "true";

  if (!isFirstTime && wasAtHome === false && isGoingHome === true) {
    // Scroll to the projects section if the user was in projects
    const projectsElement = document.getElementById("projects");
    if (
      projectsElement ||
      window.location.pathname === "/" ||
      (window.location.hash === "#projects" && window.innerWidth > 1024)
    ) {
      projectsElement?.scrollIntoView({ behavior: "smooth" });
    }
  } else if (wasAtHome === true && isGoingHome === true && window.location.hash !== "#projects") {
    // Scroll to the top of the page if the user was in the root already
    document.body.style.backgroundColor = "#0A0A0A";
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  }
};
