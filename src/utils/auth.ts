import { useAuthStore } from "../features/auth/store/auth.store";

export const login = (role: "admin" | "vendor" | "user") => {
  localStorage.setItem("isAuth", "true");
  localStorage.setItem("role", role);
};

export const isAuthenticated = () => {
  // Check Zustand store first (real auth system)
  const state = useAuthStore.getState();
  if (state.accessToken) {
    return true;
  }
  
  // Fallback to localStorage for backward compatibility
  return localStorage.getItem("isAuth") === "true";
};

export const getRole = () => {
  // Check Zustand store first
  const state = useAuthStore.getState();
  if (state.role) {
    return state.role;
  }
  
  // Fallback to localStorage
  return localStorage.getItem("role");
};

export const logout = () => {
  localStorage.removeItem("isAuth");
  localStorage.removeItem("role");
  
  // Also logout from Zustand store
  useAuthStore.getState().logout();
};