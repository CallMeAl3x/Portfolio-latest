"use client";
import { useEffect, useRef, useState } from "react";
import Card from "./Card";
import { cardList } from "../(data)/cardList";

export default function Projects() {
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isLaptop, setIsLaptop] = useState(true);
  const [prevCardIndex, setPrevCardIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    cardList.forEach((card) => {
      const cardImage = new window.Image();
      cardImage.src = card.cardImage;
    });
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      const containerRect = container.getBoundingClientRect();
      const relativeY = e.clientY - containerRect.top;
      const cardHeight = containerRect.height / cardList.length;
      const newIndex = Math.floor(relativeY / cardHeight);
      const boundedIndex = Math.max(0, Math.min(newIndex, cardList.length - 1));

      if (boundedIndex !== activeCardIndex) {
        setPrevCardIndex(activeCardIndex);
        setActiveCardIndex(boundedIndex);
      }
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
      setActiveCardIndex(-1);
      setPrevCardIndex(-1);
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [cardList.length, activeCardIndex]);

  return (
    <div className="pt-[25vh]" id="projects">
      <div className="flex justify-center items-center max-w-[1000px] ml-auto mr-auto flex-col gap-9">
        <h3 className="text-2xl md:text-3xl xl:text-4xl font-poppins-light mb-8 text-background text-center">
          Selected Projects
        </h3>
        <div className="cards flex flex-col gap-28 w-full relative mt-2" ref={containerRef}>
          {cardList.map((card, index) => (
            <Card
              key={index}
              {...card}
              isHovered={index === activeCardIndex}
              onMouseEnter={() => {
                setPrevCardIndex(activeCardIndex);
                setActiveCardIndex(index);
              }}
              onMouseLeave={() => {
                setActiveCardIndex(-1);
                setPrevCardIndex(-1);
              }}
            />
          ))}
        </div>
        {isVisible && activeCardIndex >= 0 && isLaptop && (
          <div
            className="fixed top-0 left-0 pointer-events-none z-50 overflow-hidden rounded-xl will-change-auto h-[200px] w-[385px]"
            style={{
              transform: `translate(${mousePosition.x - 192.5}px, ${mousePosition.y - 100}px)`
            }}
          >
            <div
              className="absolute flex flex-col transition-transform duration-600  will-change-auto"
              style={{
                transform: `translateY(-${activeCardIndex * 200}px)`,
                height: `${cardList.length * 200}px`
              }}
            >
              {cardList.map((card, index) => (
                <img
                  key={index}
                  src={card.cardImage}
                  alt={card.description}
                  className="w-[385px] h-[200px] object-cover object-center"
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
