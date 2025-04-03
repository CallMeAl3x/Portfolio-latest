"use client";
import clsx from "clsx";
import { useMessages, useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { usePageAnimationStore } from "../(utils)/(usePageTransition)/usePageAnimationStore";
import { useIsLaptop } from "../(utils)/userDevice";
import Card from "./(elements)/Card";

export default function Projects() {
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isScaled, setIsScaled] = useState(false);
  const [isRendered, setIsRendered] = useState(false);
  const isLaptop = useIsLaptop();
  const [visibleCards, setVisibleCards] = useState(4);
  const [allCardsVisible, setAllCardsVisible] = useState(false);

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

  // use i18n translations
  const t = useTranslations("CardList");
  const tH = useTranslations("HomePage");
  const messages = useMessages();
  const cards = Object.keys(messages.CardList);

  const setDirection = usePageAnimationStore((state) => state.setDirection);
  const direction = usePageAnimationStore((state) => state.direction);

  const handleCardClick = () => {
    // Empêcher de relancer l'animation si la direction est déjà "backward"
    if (direction !== "forward") {
      setDirection("forward");
    }
  };

  // Preload images
  useEffect(() => {
    if (typeof window !== "undefined") {
      cards.forEach((card) => {
        const cardImage = new Image();
        cardImage.src = t(`${card}.cardImage`);
      });
    }
  }, [cards, t]);

  // Mouse move effect
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      const containerRect = container.getBoundingClientRect();
      const relativeY = e.clientY - containerRect.top;
      const cardHeight = containerRect.height / displayedCards.length;
      const newIndex = Math.floor(relativeY / cardHeight);
      const boundedIndex = Math.max(0, Math.min(newIndex, displayedCards.length - 1));
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

  const handleSeeMore = () => {
    if (!allCardsVisible) {
      setVisibleCards(cards.length);
      setAllCardsVisible(true);
    } else {
      setVisibleCards(4);
      setAllCardsVisible(false);
    }
  };

  const displayedCards = cards.slice(0, visibleCards);

  return (
    <div className="pt-[30vh] md:pt-[25vh]" id="projects">
      <div className="ml-auto mr-auto flex max-w-[1048px] flex-col items-center justify-center gap-9 2xl:max-w-[1300px]">
        <h2 className="mb-8 text-center font-poppins-light text-2xl text-background md:text-3xl xl:text-4xl">
          {tH("selectedProjects")}
        </h2>
        <div className="cards relative mt-2 flex w-full flex-col gap-12 lg:gap-0" ref={containerRef}>
          {displayedCards.map((card, index) => (
            <div key={card} onClick={() => handleCardClick()}>
              <Card
                index={index + 1}
                title={t(`${card}.title`)}
                cardDescription={t(`${card}.cardDescription`)}
                cardImage={t(`${card}.cardImage`)}
                link={t(`${card}.link`)}
                isHovered={index === activeCardIndex}
                onMouseEnter={() => setActiveCardIndex(index)}
                onMouseLeave={() => setActiveCardIndex(-1)}
              />
            </div>
          ))}
        </div>
        {isRendered && isLaptop && (
          <div
            className="pointer-events-none fixed left-0 top-0 z-50 h-[200px] w-[385px] overflow-hidden rounded-xl transition-transform duration-200 ease-out will-change-auto"
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
                height: `${displayedCards.length * 200}px`
              }}
            >
              {displayedCards.map((card, index) => (
                <div key={index} className="relative h-[200px] w-[385px] overflow-hidden">
                  <img
                    src={t(`${card}.cardImage`)}
                    alt={t(`${card}.description`)}
                    className={`h-full w-full ${card === "zenpet" ? "object-contain" : "object-cover object-center"}`}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
        <button
          onClick={handleSeeMore}
          className="group relative h-12 w-40 cursor-pointer rounded-full border-b border-gray-300 px-6 py-3 text-sm font-semibold text-black shadow-md transition-all duration-200 ease-in-out hover:shadow-sm"
        >
          <div className="relative flex items-center justify-center gap-2">
            <span className="relative inline-block w-full overflow-hidden">
              <span className="block text-center transition-transform duration-300 group-hover:-translate-y-full">
                {!allCardsVisible ? tH("seeMore") : tH("seeLess")}
              </span>
              <span className="absolute inset-0 translate-y-full whitespace-nowrap text-center transition-transform duration-300 group-hover:translate-y-0">
                {tH("rightNow")}
              </span>
            </span>

            <svg
              className={clsx("duration-400 h-6 w-6 transition-transform group-hover:rotate-[135deg]", {
                "group-hover:rotate-[-45deg]": allCardsVisible
              })}
              viewBox="0 0 24 24"
            >
              <circle fill="currentColor" r="11" cy="12" cx="12"></circle>
              <path
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2"
                stroke="white"
                d="M7.5 16.5L16.5 7.5M16.5 7.5H10.5M16.5 7.5V13.5"
              ></path>
            </svg>
          </div>
        </button>
      </div>
    </div>
  );
}
