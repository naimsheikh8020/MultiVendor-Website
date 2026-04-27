// services/auth.api.ts

import { API } from "./api";

export const registerUser = (data: any) =>
  API.post("/api/v1/accounts/customer/register/", data);

export const verifyOtp = (data: any) =>
  API.post("/api/v1/accounts/verify-email/", data);

export const loginUser = (data: any) =>
  API.post("/api/v1/accounts/customer/login/", data);

export const logoutUser = (refreshToken: string) =>
  API.post("/api/v1/accounts/logout/", {
    refresh_token: refreshToken,
  });