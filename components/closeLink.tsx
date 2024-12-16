"use client";

import CloseIcon from "@/app/(components)/(elements)/CloseIcon";
import Link from "next/link";

interface CloseLinkProps {
  href: string;
}

export default function CloseLink({ href }: CloseLinkProps) {
  const changeDirection = () => {
    localStorage.setItem("NAVIGATION_DIRECTION", "back");
  };

  return (
    <Link
      href={href}
      className="text-light poppins-regular fixed right-6 top-6 z-[9999] flex flex-row items-center gap-x-2 px-4 py-2 text-xl"
      onClick={changeDirection}
    >
      <CloseIcon />
    </Link>
  );
}
