// services/auth.api.ts
import type { RegisterPayload } from "../features/auth/types";
import { API } from "./api";


export const registerUser = async (data: RegisterPayload) => {
  const res = await API.post(
    "/api/v1/accounts/customer/register/",
    data
  );
  return res.data;
};

// services/auth.api.ts

export const verifyOtp = (data: {
  email: string;
  otp: string;
}) => {
  return API.post("/api/v1/accounts/verify-email/", data);
};