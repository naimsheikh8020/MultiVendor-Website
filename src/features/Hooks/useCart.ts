import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCartAPI } from "../../services/cart.api";
import { useAuthStore } from "../auth/store/auth.store";
import { useEffect } from "react";

export const useCart = () => {
  const queryClient = useQueryClient();
  const accessToken = useAuthStore((s) => s.accessToken);

  // Refetch cart when user logs in or logs out
  useEffect(() => {
    if (accessToken) {
      // User logged in - invalidate and refetch cart
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    } else {
      // User logged out - clear cart data
      queryClient.setQueryData(["cart"], null);
    }
  }, [accessToken, queryClient]);

  return useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const res = await getCartAPI();
      return res.data;
    },
    enabled: !!accessToken, // Only fetch if user is authenticated
    staleTime: 1000 * 60 * 2, // 2 min cache
    refetchOnWindowFocus: true, // Refetch when window regains focus
  });
};