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
import { useEffect, useState } from "react";
import { API } from "../services/api";

const ProtectedRoute = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/api/v1/accounts/customer/profile/")
      .then((res) => {
        setUser(res.data);
      })
      .catch(() => {
        setUser(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;

  if (!user) return <Navigate to="/login" replace />;

  return <Outlet />;
};

export default ProtectedRoute;