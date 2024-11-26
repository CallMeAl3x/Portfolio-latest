import gsap from "gsap";

export const forwardAnimation = (transitionRef: HTMLDivElement, contentRef: HTMLDivElement, isMobile: boolean) => {
  const tl = gsap.timeline();

  document.body.style.backgroundColor = "#ededed";

  tl.fromTo(
    transitionRef,
    {
      transform: "translateY(100%)",
      clipPath: isMobile ? "inset(70% 0% 0% 0%)" : "inset(60% 0% 0% 0%)",
      borderRadius: isMobile ? "50% 50% 0% 0%" : "40% 40% 0% 0",
      width: "100%",
      height: "10%",
      opacity: 0
    },
    {
      transform: "translateY(0%)",
      clipPath: "inset(0% 0% 0% 0%)",
      borderRadius: isMobile ? "50% 50% 0% 0%" : "40% 40% 0% 0",
      width: "100%",
      height: "100%",
      opacity: 1,
      duration: 0.75,
      ease: "power3.inOut",
      onComplete: () => {
        setTimeout(() => {
          gsap.to(contentRef, {
            opacity: 1,
            onComplete: () => {
              contentRef.style.visibility = "visible";
            }
          });
        }, 250);
      }
    }
  ).to(transitionRef, {
    borderRadius: "0% 0% 0% 0%",
    duration: 0.3,
    ease: "power1.inOut",
    onComplete: () => {
      transitionRef.remove();
      localStorage.removeItem("navigation_direction");
      document.body.style.backgroundColor = "#0A0A0A";
    }
  });
};

export const backAnimation = (transitionRef: HTMLDivElement, contentRef: HTMLDivElement) => {
  const tl = gsap.timeline();

  tl.fromTo(
    transitionRef,
    {
      transform: "translateY(0%)",
      clipPath: "inset(0% 0% 0% 0%)",
      borderRadius: "0% 0% 50% 50%",
      width: "100%",
      height: "100%",
      opacity: 1
    },
    {
      transform: "translateY(-10%)",
      clipPath: "inset(0% 0% 0% 0%)",
      borderRadius: "0% 0% 65% 65%",
      width: "100%",
      height: "45%",
      opacity: 1,
      duration: 1.25,
      ease: "power3.inOut",
      onComplete: () => {
        setTimeout(() => {
          gsap.to(contentRef, {
            opacity: 1,
            duration: 0.15,
            onComplete: () => {
              contentRef.style.visibility = "visible";
            }
          });
        }, 350);
      }
    }
  )
    .to(transitionRef, {
      transform: "translateY(-81%)",
      clipPath: "inset(0% 0% 0% 0%)",
      borderRadius: "0% 0% 85% 85%",
      width: "100%",
      height: "35%",
      opacity: 1,
      duration: 1.5,
      ease: "power3.inOut"
    })
    .to(transitionRef, {
      duration: 0.3,
      ease: "power1.inOut",
      onComplete: () => {
        transitionRef.remove();
        localStorage.removeItem("navigation_direction");
      }
    });
};
