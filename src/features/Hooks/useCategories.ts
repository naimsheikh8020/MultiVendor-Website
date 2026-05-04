// features/hooks/useCategories.ts
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../../services/product.api";

export const useCategories = () =>
  useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    staleTime: 1000 * 60 * 60, // Cache for 1 hour
    gcTime: 1000 * 60 * 60 * 24, // Keep in garbage collection for 24 hours
  });