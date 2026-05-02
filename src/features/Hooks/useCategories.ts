// features/hooks/useCategories.ts
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../../services/product.api";

export const useCategories = () =>
  useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });