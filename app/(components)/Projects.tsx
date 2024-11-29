"use client";
import { useEffect, useRef, useState } from "react";
import Card from "./(elements)/Card";
import { useMessages, useTranslations } from "next-intl";

export default function Projects() {
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isLaptop, setIsLaptop] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isScaled, setIsScaled] = useState(false);
  const [isRendered, setIsRendered] = useState(false);

  // scale effect
  useEffect(() => {
    if (isVisible && activeCardIndex >= 0 && isLaptop) {
      const timer = setTimeout(() => setIsScaled(true), 10);
      setIsRendered(true);
      return () => clearTimeout(timer);
    } else {
      setIsScaled(false);
      // Attendre la fin de l'animation avant de retirer l'élément
      const timer = setTimeout(() => setIsRendered(false), 150); // 300ms correspond à la durée de l'animation
      return () => clearTimeout(timer);
    }
  }, [isVisible, activeCardIndex, isLaptop]);

  // check if the screen is laptop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsLaptop(false);
      } else {
        setIsLaptop(true);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // use i18n translations
  const t = useTranslations("CardList");
  const tH = useTranslations("HomePage");
  const messages = useMessages();
  const cards = Object.keys(messages.CardList);

  // Preload images
  useEffect(() => {
    cards.forEach((card) => {
      const cardImage = new window.Image();
      cardImage.src = t(`${card}.cardImage`);
    });
  }, [cards, t]);

  // Mouse move effect
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      const containerRect = container.getBoundingClientRect();
      const relativeY = e.clientY - containerRect.top;
      const cardHeight = containerRect.height / cards.length;
      const newIndex = Math.floor(relativeY / cardHeight);
      const boundedIndex = Math.max(0, Math.min(newIndex, cards.length - 1));
      if (boundedIndex !== activeCardIndex) {
        setActiveCardIndex(boundedIndex);
      }
    };
    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
      setActiveCardIndex(-1);
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [cards, activeCardIndex]);

  return (
    <div className="pt-[25vh]" id="projects">
      <div className="ml-auto mr-auto flex max-w-[1048px] flex-col items-center justify-center gap-9 2xl:max-w-[1300px]">
        <h2 className="mb-8 text-center font-poppins-light text-2xl text-background md:text-3xl xl:text-4xl">
          {tH("selectedProjects")}
        </h2>
        <div className="cards relative mt-2 flex w-full flex-col gap-12 lg:gap-0" ref={containerRef}>
          {cards.map((card, index) => (
            <Card
              index={index + 1}
              title={t(`${card}.title`)}
              cardDescription={t(`${card}.cardDescription`)}
              cardImage={t(`${card}.cardImage`)}
              link={t(`${card}.link`)}
              key={card}
              isLaptop={isLaptop}
              isHovered={index === activeCardIndex}
              onMouseEnter={() => setActiveCardIndex(index)}
              onMouseLeave={() => setActiveCardIndex(-1)}
            />
          ))}
        </div>
        {isRendered && (
          <div
            className="pointer-events-none fixed left-0 top-0 z-50 h-[200px] w-[385px] overflow-hidden rounded-xl transition-transform duration-300 ease-out will-change-auto"
            style={{
              transform: `translate(${mousePosition.x - 192.5}px, ${mousePosition.y - 100}px) scale(${
                isScaled ? 1 : 0
              })`
            }}
          >
            <div
              className="absolute flex flex-col transition-transform duration-600 will-change-auto"
              style={{
                transform: `translateY(-${activeCardIndex * 200}px)`,
                height: `${cards.length * 200}px`
              }}
            >
              {cards.map((card, index) => (
                <img
                  key={index}
                  src={t(`${card}.cardImage`)}
                  alt={t(`${card}.description`)}
                  className="h-[200px] w-[385px] object-cover object-center"
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
