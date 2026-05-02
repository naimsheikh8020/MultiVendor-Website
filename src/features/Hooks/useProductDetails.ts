// src/features/Hooks/useProductDetails.ts
import { useQuery } from "@tanstack/react-query";
import { getProductDetails } from "../../services/product.api";

export const useProductDetails = (id: string) =>
  useQuery({
    queryKey: ["product-details", id],
    queryFn: () => getProductDetails(id),
    enabled: !!id,
  });