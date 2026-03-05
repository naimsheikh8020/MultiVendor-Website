export type PopularProductCardProps = {
  image: string;
  title: string;
  category: string;
  rating: number;
  reviewCount: number;
  author: string;
  price: number;
  oldPrice?: number;
  discount?: number;
  onAddToCart?: (e: React.MouseEvent) => void;
};