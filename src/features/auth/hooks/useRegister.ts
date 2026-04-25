// features/auth/hooks/useRegister.ts
import { useMutation } from "@tanstack/react-query";
import type { RegisterPayload } from "../types";
import { registerUser } from "../../../services/auth.api";


export const useRegister = () => {
  return useMutation({
    mutationFn: (data: RegisterPayload) => registerUser(data),
  });
};