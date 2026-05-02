import { Navigate, Outlet } from "react-router";
import { useAuthStore } from "../features/auth/store/auth.store";

const AdminProtectedRoute = () => {
  const accessToken = useAuthStore((state) => state.accessToken);
  const role = useAuthStore((state) => state.role);
  const isHydrated = useAuthStore((state) => state.isHydrated);

  // Wait for Zustand to load from localStorage
  if (!isHydrated) return <div>Loading...</div>;

  // Check if user is authenticated
  if (!accessToken) {
    return <Navigate to="/vendor-login" replace />;
  }

  // Check if user is an admin
  if (role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default AdminProtectedRoute;
