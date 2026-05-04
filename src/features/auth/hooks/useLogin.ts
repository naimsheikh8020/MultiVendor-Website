// import { useMutation } from "@tanstack/react-query";
// import { loginUser } from "../../../services/auth.api";

// export const useLogin = () =>
//   useMutation({ mutationFn: loginUser });

// features/auth/hooks/useLogin.ts
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../../../services/auth.api";
import { useAuthStore } from "../store/auth.store";

export const useLogin = () => {
  const { setAuth } = useAuthStore();

  return useMutation({
    mutationFn: loginUser,

    onSuccess: (res) => {
      const data = res.data;

      setAuth({
        access: data.access,
        refresh: data.refresh,
        role: data.role,
      });
    },
  });
};