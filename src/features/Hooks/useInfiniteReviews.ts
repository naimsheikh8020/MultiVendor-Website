import { useInfiniteQuery } from "@tanstack/react-query";
import { getProductReviews, type ReviewResponse,  } from "../../services/review.api";

export const useInfiniteReviews = (productId: string) => {
  return useInfiniteQuery<
    ReviewResponse,                              // queryFn return type
    Error,                                       // error type
    { pages: ReviewResponse[] },                 // data type
    [string, string],                            // queryKey type
    string                                       // pageParam type 🔥
  >({
    queryKey: ["reviews", productId],

    queryFn: ({ pageParam }) =>
      getProductReviews(
        pageParam || `/api/v1/products/${productId}/reviews/`
      ),

    initialPageParam: `/api/v1/products/${productId}/reviews/`, // 🔥 REQUIRED in v5

    getNextPageParam: (lastPage) => lastPage.next ?? undefined,

    enabled: !!productId,

    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,

    refetchOnWindowFocus: false,
    retry: 1,
  });
};