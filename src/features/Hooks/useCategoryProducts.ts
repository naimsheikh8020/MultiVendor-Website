// src/features/Hooks/useCategoryProducts.ts
import { useQuery } from "@tanstack/react-query";
import { getProductsByCategory } from "../../services/product.api";

export const useCategoryProducts = (slug: string) =>
  useQuery({
    queryKey: ["category-products", slug],
    queryFn: () => getProductsByCategory(slug),
    enabled: !!slug,
  });