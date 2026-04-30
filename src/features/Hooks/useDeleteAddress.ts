// src/features/Hooks/useDeleteAddress.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAddress } from "../../services/address.api";

export const useDeleteAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAddress,
    onSuccess: () => {
      // 🔥 refresh list
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
    },
  });
};