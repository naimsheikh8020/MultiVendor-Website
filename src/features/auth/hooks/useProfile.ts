// import { useQuery } from "@tanstack/react-query";
// import { API } from "../../../services/api";

// export const useProfile = () => {
//   return useQuery({
//     queryKey: ["profile"],
//     queryFn: async () => {
//       const res = await API.get("/api/v1/accounts/customer/profile/");
//       return res.data;
//     },
//     retry: false, // don't spam if 401
//   });
// };

import { useQuery } from "@tanstack/react-query";
import { API } from "../../../services/api";
import { useAuthStore } from "../store/auth.store";

export const useProfile = () => {
  const accessToken = useAuthStore((s) => s.accessToken);

  // 🔥 Check if token is a mock token (for testing)
  const isMockToken = accessToken?.startsWith("mock_token_");

  return useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const res = await API.get("/api/v1/accounts/customer/profile/");
      return res.data;
    },
    // 🔥 Disable query if mock token or no token
    enabled: !!accessToken && !isMockToken,
    retry: false,
  });
};