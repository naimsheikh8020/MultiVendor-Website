// src/services/api.ts

import axios, { AxiosError } from "axios";
import type { InternalAxiosRequestConfig } from "axios";
import { useAuthStore } from "../features/auth/store/auth.store";

export const API = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  
});

// ✅ Attach token safely
API.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = useAuthStore.getState().accessToken;

    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// 🔁 Auto refresh token
API.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest: any = error.config;

    if (!error.response) {
      return Promise.reject(error);
    }

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const { refreshToken, setAuth, logout, role } =
        useAuthStore.getState();

      if (!refreshToken) {
        logout();
        return Promise.reject(error);
      }

      try {
        const res = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/api/v1/accounts/token/refresh/`,
          { refresh: refreshToken }
        );

        // 🔥 update token safely
        setAuth({
          access: res.data.access,
          refresh: refreshToken,
          role: role,
        });

        // retry original request
        originalRequest.headers = originalRequest.headers || {};
        originalRequest.headers.Authorization = `Bearer ${res.data.access}`;

        return API(originalRequest);
      } catch (refreshError) {
        logout();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);