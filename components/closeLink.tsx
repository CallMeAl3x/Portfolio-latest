"use client";

import CloseIcon from "@/app/(components)/(elements)/CloseIcon";
import { usePageAnimationStore } from "@/app/(utils)/(usePageTransition)/usePageAnimationStore";
import { Link } from "@/i18n/routing";

export default function CloseLink() {
  const setDirection = usePageAnimationStore((state) => state.setDirection);

  const handleBackClick = () => {
    setDirection("backward");
  };

  return (
    <Link
      href="/"
      passHref
      onClick={handleBackClick}
      className="text-light poppins-regular fixed right-6 top-6 z-[9999] flex flex-row items-center gap-x-2 px-4 py-2 text-xl"
    >
      <CloseIcon />
    </Link>
  );
}
