import { Navigate, Outlet } from "react-router";
import { useAuthStore } from "../features/auth/store/auth.store";
import { isAuthenticated } from "../utils/auth";

const PublicRoute = () => {
  const isHydrated = useAuthStore((state) => state.isHydrated);

  // Wait for Zustand to load from localStorage
  if (!isHydrated) return <div>Loading...</div>;

  // If user is already authenticated, redirect to appropriate dashboard
  if (isAuthenticated()) {
    const role = useAuthStore.getState().role;
    if (role === "admin") {
      return <Navigate to="/admin" replace />;
    } else if (role === "vendor") {
      return <Navigate to="/vendor" replace />;
    }
    return <Navigate to="/" replace />;
  }

  // Otherwise, render the public page (login/signup)
  return <Outlet />;
};

export default PublicRoute;
