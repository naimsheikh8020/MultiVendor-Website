// src/features/Hooks/useAddress.ts
import { useQuery } from "@tanstack/react-query";
import { getAddresses } from "../../services/address.api";

export const useAddresses = () =>
  useQuery({
    queryKey: ["addresses"],
    queryFn: getAddresses,
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