import { useMutation } from "@tanstack/react-query";
import { API } from "../../../services/api";

export const useUpdateProfile = () => {
  return useMutation({
    mutationFn: async (data: {
      full_name: string;
      phone_number: string;
      gender?: string;
    }) => {
      const res = await API.patch(
        "/api/v1/accounts/customer/profile/update/",
        data
      );
      return res.data;
    },
  });
};