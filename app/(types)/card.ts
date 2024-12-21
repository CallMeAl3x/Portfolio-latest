export interface CardProps {
  title: string;
  cardDescription: string;
  cardImage: string;
  index: number;
  link: string;
  isHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}
