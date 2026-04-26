import { useQuery } from "@tanstack/react-query";
import { API } from "../../../services/api";

export const useProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const res = await API.get("/api/v1/accounts/customer/profile/");
      return res.data;
    },
    retry: false, // don't spam if 401
  });
};