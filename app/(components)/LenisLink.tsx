"use client";

import { useLenis } from "lenis/react";
import Link from "next/link";
import React from "react";

interface LenisLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
}

const LenisLink: React.FC<LenisLinkProps> = ({ href, children, ...props }) => {
  const lenis = useLenis();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const targetId = href.startsWith("#") ? href.substring(1) : href;
    lenis?.scrollTo("#" + targetId);
    console.log("Scrolling to:", targetId);
  };

  return (
    <Link href={href} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
};

export default LenisLink;
