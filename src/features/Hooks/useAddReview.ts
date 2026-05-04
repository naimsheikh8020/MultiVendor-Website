import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addReview } from "../../services/review.api";

export const useAddReview = (productId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addReview,

    onSuccess: () => {
      // 🔥 refresh reviews instantly
      queryClient.invalidateQueries({
        queryKey: ["reviews", productId],
      });
    },
  });
};