import { assets } from "../../assets/assets";
import CommissionSetting from "../../Components/AdminDashBoard/Commission/CommissionSetting";
import RecentCommission from "../../Components/AdminDashBoard/Commission/RecentCommission";
import DashboardCard from "../../Components/VendorDashBoard/Dashboard/DashboardCard";

const AdminCommsion = () => {
  const stats = [
      {
        icon: assets.VendorTotalSales,
        value: "৳ 45600.00",
        label: "Total Platform Sales",
      },
      {
        icon: assets.VendorNetEarning,
        value: "৳ 45600.00",
        label: "Total Commission Earned",
      },
      {
        icon: assets.VendorTotalProduct,
        value: "5",
        label: "Commission Rate",
      },
      {
        icon: assets.VendorTotalOrder,
        value: "1000",
        label: "Vendor Earnings",
      },
    ];
  return (
    <div className="space-y-4">
      
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="mb-1 text-lg sm:text-xl font-bold text-gray-700">
            Commission Management
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Track and manage platform commissions
          </p>
        </div>
      </div>

       {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-5 mt-6">
        {stats.map((item, index) => (
          <DashboardCard
            key={index}
            icon={item.icon}
            value={item.value}
            label={item.label}
          />
        ))}
      </div>

      {/* Commission Settings */}
      <CommissionSetting />

      {/* Recent Commission Transactions */}
      <RecentCommission />

    </div>
  );
};


export default AdminCommsion
