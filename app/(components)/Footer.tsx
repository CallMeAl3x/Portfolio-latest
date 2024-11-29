import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useCopyToClipboard } from "../(utils)/useCopyToClipboard";

const contactLinks = [
  {
    href: "",
    icon: "/img/mail.svg",
    alt: "Mail icon",
    text: "Email",
    isEmail: true // Pour savoir si c'est un mail à copier
  },
  {
    href: "https://www.linkedin.com/in/alexandre-bonefons-166875250/",
    icon: "/img/linkedin.svg",
    alt: "Linkedin icon",
    text: "Linkedin"
  },
  {
    href: "https://github.com/CallMeAl3x",
    icon: "/img/github.svg",
    alt: "Github icon",
    text: "Github"
  }
];

export default function Footer() {
  const handleCopy = useCopyToClipboard("Alexandre.bonefons@outlook.fr");
  return (
    <div className="footer mt-52 flex flex-col items-center justify-center gap-12 pb-20" id="contact">
      <h3 className="font-poppins-reg text-5xl text-background">Contact</h3>

      <footer className="flex flex-col items-center justify-center gap-12 lg:flex-row">
        {contactLinks.map(({ href, icon, alt, text, isEmail }, index) =>
          isEmail ? (
            // Utilisation d'un bouton pour l'email (non cliquable)
            <button
              key={index}
              className="flex w-full max-w-[11rem] cursor-pointer items-center justify-center gap-2 rounded-[22px] bg-background px-8 py-2 lg:w-fit lg:justify-normal lg:px-10"
              onClick={handleCopy}
            >
              <Image src={icon} className="h-[20px] w-[24px] max-w-none" height={20} width={24} alt={alt} />
              <p className="dark:text-text text-xl text-foreground">{text}</p>
            </button>
          ) : (
            // Lien cliquable pour les autres cas
            <Link key={index} href={href} target="_blank" rel="noreferrer">
              <button className="flex w-full max-w-[11rem] items-center justify-center gap-2 rounded-[22px] bg-background px-8 py-2 lg:w-fit lg:justify-normal lg:px-10">
                <Image src={icon} className="h-[20px] w-[24px] max-w-none" height={20} width={24} alt={alt} />
                <p className="dark:text-text text-xl text-foreground">{text}</p>
              </button>
            </Link>
          )
        )}
      </footer>
    </div>
  );
}
