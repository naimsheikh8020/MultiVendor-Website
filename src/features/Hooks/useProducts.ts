import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../services/product.api";

export const useProducts = () =>
  useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    staleTime: 1000 * 60 * 5, // ✅ 5 min cache (important)
    gcTime: 1000 * 60 * 30,   // ✅ keep in memory 30 min

    refetchOnWindowFocus: false, // ✅ avoid annoying refetch
  });