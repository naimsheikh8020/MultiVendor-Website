// services/auth.api.ts

import { API } from "./api";

export const registerUser = (data: any) =>
  API.post("/api/v1/accounts/customer/register/", data);

export const verifyOtp = (data: any) =>
  API.post("/api/v1/accounts/verify-email/", data);

// export const loginUser = (data: any) =>
//   API.post("/api/v1/accounts/customer/login/", data);

export const loginUser = (data: { email: string; password: string | number }) =>
  API.post("/api/v1/accounts/login/", data);

export const logoutUser = (refreshToken: string) =>
  API.post("/api/v1/accounts/logout/", {
    refresh_token: refreshToken,
});

export const requestPasswordReset = (data: { email: string }) =>
  API.post("/api/v1/accounts/password-reset/", data);

export const confirmPasswordReset = (data: {
  email: string;
  otp: string;
  new_password: string;
}) =>
  API.post("/api/v1/accounts/password-reset-confirm/", data);

export const resendOtp = (data: { email: string }) =>
  API.post("/api/v1/accounts/send-otp/", data);

export const checkOtp = (data: { email: string; otp: string }) =>
  API.post("/api/v1/accounts/check-otp/", data);