// services/api.ts
import axios from "axios";

export const API = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true, // important for cookies
});

// Optional interceptor (future-ready)
API.interceptors.response.use(
  (res) => res,
  (error) => {
    return Promise.reject(error.response?.data || error);
  }
);