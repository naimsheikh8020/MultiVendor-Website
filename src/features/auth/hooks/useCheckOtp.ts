import { useMutation } from "@tanstack/react-query";
import { checkOtp } from "../../../services/auth.api";

export const useCheckOtp = () =>
  useMutation({
    mutationFn: checkOtp,
  });

  
