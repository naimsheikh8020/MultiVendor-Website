import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addToCartAPI } from "../../services/cart.api";

export const useAddToCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addToCartAPI,

    onSuccess: (data) => {
      // 🔥 update cart cache globally
      queryClient.setQueryData(["cart"], data.data);
    },
  });
};