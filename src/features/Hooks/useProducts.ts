import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../services/product.api";

export const useProducts = () =>
  useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });