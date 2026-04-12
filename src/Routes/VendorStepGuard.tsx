import { Navigate, Outlet } from "react-router-dom";

const VendorStepGuard = () => {
  const step = localStorage.getItem("vendorStep");

  if (step !== "1") {
    return <Navigate to="/vendor-signup" replace />;
  }

  return <Outlet />;
};

export default VendorStepGuard;