// hooks/useVerifyOtp.ts

import { useMutation } from "@tanstack/react-query";
import { verifyOtp } from "../../../services/auth.api";



export const useVerifyOtp = () => {
  return useMutation({
    mutationFn: verifyOtp,
  });
};