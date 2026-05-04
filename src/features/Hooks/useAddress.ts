// src/features/Hooks/useAddress.ts
import { useQuery } from "@tanstack/react-query";
import { getAddresses } from "../../services/address.api";

export const useAddresses = () =>
  useQuery({
    queryKey: ["addresses"],
    queryFn: getAddresses,
    staleTime: 1000 * 60 * 60, // Cache for 1 hour
    gcTime: 1000 * 60 * 60 * 24, // Keep in garbage collection for 24 hours
  });

// export const useDeleteAddress = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: deleteAddress,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["addresses"] });
//     },
//   });
// };