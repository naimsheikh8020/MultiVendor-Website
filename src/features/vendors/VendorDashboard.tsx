import { assets } from "../../assets/assets";
import DashboardCard from "../../Components/VendorDashBoard/Dashboard/DashboardCard";
import RecentOrders from "../../Components/VendorDashBoard/Dashboard/RecentOrders";

const VendorDashboard = () => {
  const stats = [
    {
      icon: assets.VendorTotalSales,
      value: "৳ 45600.00",
      label: "Total Sales",
    },
    {
      icon: assets.VendorNetEarning,
      value: "৳ 45600.00",
      label: "Net Earnings",
    },
    {
      icon: assets.VendorTotalProduct,
      value: "5",
      label: "Total Products",
    },
    {
      icon: assets.VendorTotalOrder,
      value: "1000",
      label: "Total Orders",
    },
  ];
  const orders = [
    {
      id: "ord-001",
      customer: "John Doe",
      date: "1/15/2026",
      total: "$459.98",
      status: "Delivered",
    },
    {
      id: "ord-002",
      customer: "John Doe",
      date: "1/15/2026",
      total: "$459.98",
      status: "Processing",
    },
  ];
  return (
    <div>
      {/* Header */}
      <h1 className="font-bold text-xl text-gray-700 mb-1">
        Dashboard
      </h1>

      <p className="text-gray-500">
        Welcome back,{" "}
        <span className="font-semibold text-blue-600">
          Sohan Smith
        </span>
        !
      </p>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-6">
        {stats.map((item, index) => (
          <DashboardCard
            key={index}
            icon={item.icon}
            value={item.value}
            label={item.label}
          />
        ))}
      </div>

      <RecentOrders orders={orders} />;
    </div>
  );
};

export default VendorDashboard;