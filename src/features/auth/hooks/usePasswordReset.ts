import { useMutation } from "@tanstack/react-query";
import {
  requestPasswordReset,
  confirmPasswordReset,
  resendOtp,
} from "../../../services/auth.api";

export const useRequestReset = () =>
  useMutation({ mutationFn: requestPasswordReset });

export const useConfirmReset = () =>
  useMutation({ mutationFn: confirmPasswordReset });

export const useResendOtp = () =>
  useMutation({ mutationFn: resendOtp });