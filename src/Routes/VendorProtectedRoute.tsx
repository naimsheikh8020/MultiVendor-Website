import { Navigate, Outlet } from "react-router";
import { useAuthStore } from "../features/auth/store/auth.store";

const VendorProtectedRoute = () => {
  const accessToken = useAuthStore((state) => state.accessToken);
  const role = useAuthStore((state) => state.role);
  const isHydrated = useAuthStore((state) => state.isHydrated);

  // Wait for Zustand to load from localStorage
  if (!isHydrated) {
    return <div>Loading...</div>;
  }

  // Check if user is authenticated
  if (!accessToken) {
    return <Navigate to="/vendor-login" replace />;
  }

  // Check if user is a vendor
  if (role !== "vendor") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default VendorProtectedRoute;
