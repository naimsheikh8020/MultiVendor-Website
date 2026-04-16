export type PopularProductCardProps = {
  id: number;
  // storeId: number;
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

export interface Store {
  id: number;
  label: string;
  title: string;
  products: number;
  rating: number;
  reviews: number;
  image: string;
}

export interface Product {
  id: number;
  storeId: number; // 🔥 relation
  title: string;
  image: string;
  category: "Electronics" | "Men's Fashion" | "Women's Fashion" | "Home & Living";
  price: number;
  oldPrice?: number;
  discount?: number;
  rating: number;
  reviewCount: number;
  description?: string;
}