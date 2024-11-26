export const handleScrolling = (wasAtHome: boolean, isGoingHome: boolean) => {
  if (
    (wasAtHome === false && isGoingHome === true && window.location.pathname === "/") ||
    window.location.hash === "#projects"
  ) {
    // Scroll to the projects section if the user was in projects
    const projectsElement = document.getElementById("projects");
    if (projectsElement) {
      projectsElement?.scrollIntoView({ behavior: "smooth" });
    }
  } else if (wasAtHome === true && isGoingHome === true && window.location.hash !== "#projects") {
    console.log("scrolling to the top");
    // Scroll to the top of the page if the user was in the root already
    document.body.style.backgroundColor = "#0A0A0A";
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  }
};
