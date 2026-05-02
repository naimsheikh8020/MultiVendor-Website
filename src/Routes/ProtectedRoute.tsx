// routes/ProtectedRoute.tsx

import { Navigate, Outlet } from "react-router";
import { useAuthStore } from "../features/auth/store/auth.store";

const ProtectedRoute = () => {
  const accessToken = useAuthStore((state) => state.accessToken);
  const isHydrated = useAuthStore((state) => state.isHydrated);

  // ⛔ wait for Zustand to load from localStorage
  if (!isHydrated) return <div>Loading...</div>;

  // ⛔ no token → not logged in
  if (!accessToken) return <Navigate to="/login" replace />;

  return <Outlet />;
};

export default ProtectedRoute;