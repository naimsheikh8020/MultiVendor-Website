import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAddress } from "../../services/address.api";

export const useUpdateAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) =>
      updateAddress(id, data),

    onSuccess: () => {
      // 🔥 refresh address list
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
    },
  });
};