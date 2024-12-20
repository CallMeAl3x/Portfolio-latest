import gsap from "gsap";

export const forwardAnimation = (
  transitionRef: HTMLDivElement,
  contentRef: HTMLDivElement,
  isMobile: boolean,
  setDirection: (dir: "forward" | "backward" | null) => void
) => {
  const tl = gsap.timeline();

  const body = document.querySelector("body");

  gsap.set(body, {
    backgroundColor: "#ededed"
  });
  gsap.set(transitionRef, {
    transform: "translateY(100%)",
    clipPath: isMobile ? "inset(70% 0% 0% 0%)" : "inset(60% 0% 0% 0%)",
    borderRadius: isMobile ? "50% 50% 0% 0%" : "40% 40% 0% 0",
    width: "100%",
    height: "10%",
    opacity: 0
  });

  tl.to(transitionRef, {
    transform: "translateY(0%)",
    clipPath: "inset(0% 0% 0% 0%)",
    borderRadius: isMobile ? "50% 50% 0% 0%" : "40% 40% 0% 0",
    width: "100%",
    height: "100%",
    opacity: 1,
    duration: 0.65,
    ease: "power3.inOut",
    onComplete: () => {
      gsap.to(contentRef, {
        opacity: 1,
        duration: 0.5,
        onComplete: () => {
          if (contentRef) contentRef.style.visibility = "visible";
        }
      });
    }
  })
    .to(transitionRef, {
      borderRadius: "0% 0% 0% 0%",
      duration: 0.35,
      ease: "power1.inOut"
    })
    // Mettre le fond en noir à la fin de l'animation
    .to("body", {
      backgroundColor: "black", // Le fond devient noir
      duration: 0.25,
      onComplete: () => {
        if (transitionRef) transitionRef.style.display = "none";
        setDirection(null);
      }
    });

  return tl;
};

export const backAnimation = (
  transitionRef: HTMLDivElement,
  contentRef: HTMLDivElement,
  setDirection: (dir: "forward" | "backward" | null) => void
) => {
  const tl = gsap.timeline();
  // Disable clicks during the animation
  gsap.set(contentRef, {
    pointerEvents: "none"
  });

  gsap.set(transitionRef, {
    transform: "translateY(0%)",
    clipPath: "inset(0% 0% 0% 0%)",
    borderRadius: "0% 0% 0% 0%",
    width: "100%",
    height: "100%",
    opacity: 1,
    display: "block"
  });

  tl.to(transitionRef, {
    transform: "translateY(0%)",
    clipPath: "inset(0% 0% 0% 0%)",
    borderRadius: "0% 0% 50% 50%",
    width: "100%",
    duration: 0.2,
    height: "100%",
    opacity: 1,
    display: "block"
  });

  tl.to(transitionRef, {
    transform: "translateY(-10%)",
    clipPath: "inset(0% 0% 0% 0%)",
    borderRadius: "0% 0% 65% 65%",
    width: "100%",
    height: "45%",
    opacity: 1,
    duration: 1.15,
    ease: "power3.inOut",
    onComplete: () => {
      gsap.to(contentRef, {
        opacity: 1,
        duration: 0.1,
        onComplete: () => {
          if (contentRef) contentRef.style.visibility = "visible";
        }
      });
      // Re-enable pointer events earlier
      setTimeout(() => {
        contentRef.style.pointerEvents = "auto";
      }, 800);
    }
  })
    .to(transitionRef, {
      transform: "translateY(-81%)",
      clipPath: "inset(0% 0% 0% 0%)",
      borderRadius: "0% 0% 85% 85%",
      width: "100%",
      height: "35%",
      opacity: 1,
      duration: 1.05,
      ease: "power3.inOut"
    })
    .to(transitionRef, {
      duration: 0.3,
      ease: "power1.inOut",
      onComplete: () => {
        if (transitionRef) transitionRef.style.display = "none";
        setDirection(null);
      }
    });

  return tl;
};

export const resetAnimation = (
  transitionRef: HTMLDivElement,
  contentRef: HTMLDivElement,
  isHome: boolean,
  setDirection: (dir: "forward" | "backward" | null) => void
) => {
  const tl = gsap.timeline();

  if (!isHome) {
    const body = document.querySelector("body");

    gsap.set(body, {
      backgroundColor: "black"
    });
  }

  gsap.set(transitionRef, {
    display: "none"
  });
  gsap.set(contentRef, {
    opacity: 1,
    visibility: "visible"
  });

  setDirection(null);
  return tl;
};
