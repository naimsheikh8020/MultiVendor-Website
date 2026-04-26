import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../../../services/auth.api";

export const useLogin = () =>
  useMutation({ mutationFn: loginUser });