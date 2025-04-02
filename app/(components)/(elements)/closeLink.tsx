"use client";

import CloseIcon from "@/app/(components)/(elements)/CloseIcon";
import { usePageAnimationStore } from "@/app/(utils)/(usePageTransition)/usePageAnimationStore";
import { Link } from "@/i18n/routing";

export default function CloseLink() {
  const setDirection = usePageAnimationStore((state) => state.setDirection);
  const direction = usePageAnimationStore((state) => state.direction);

  const handleBackClick = () => {
    // Empêcher de relancer l'animation si la direction est déjà "backward"
    if (direction !== "backward") {
      setDirection("backward");
    }
  };

  return (
    <Link
      href="/"
      passHref
      onClick={handleBackClick}
      className="text-light poppins-regular fixed right-14 top-6 z-[9999] flex flex-row items-center gap-x-2 px-4 py-2 text-xl"
    >
      <CloseIcon />
    </Link>
  );
}
