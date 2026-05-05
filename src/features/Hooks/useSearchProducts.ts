import { useQuery } from "@tanstack/react-query";
import { searchProducts } from "../../services/product.api";

export const useSearchProducts = (query: string) => {
  return useQuery({
    queryKey: ["search-products", query],
    queryFn: () => searchProducts(query),
    enabled: !!query, // 🔥 don't call API if empty
    staleTime: 1000 * 60 * 5, // cache 5 min
  });
};