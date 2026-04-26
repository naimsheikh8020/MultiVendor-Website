// // routes/ProtectedRoute.tsx
// import { Navigate, Outlet } from "react-router";
// import { isAuthenticated } from "../utils/auth";

// const ProtectedRoute = () => {
//   if (!isAuthenticated()) {
//     return <Navigate to="/login" replace />;
//   }

//   return <Outlet />;
// };

// export default ProtectedRoute;


// routes/ProtectedRoute.tsx

import { Navigate, Outlet } from "react-router";
import { useAuthStore } from "../features/auth/store/auth.store";

const ProtectedRoute = () => {
  const { accessToken, isHydrated } = useAuthStore();

  // ⛔ wait for Zustand to load from localStorage
  if (!isHydrated) return <div>Loading...</div>;

  // ⛔ no token → not logged in
  if (!accessToken) return <Navigate to="/login" replace />;

  return <Outlet />;
};

export default ProtectedRoute;