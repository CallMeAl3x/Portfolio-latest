export interface CardProps {
  index: number;
  title: string;
  cardDescription: string;
  cardImage: string;
  link: string;
  year?: string;
  archived?: boolean;
  onOpen: (href: string) => void;
}
