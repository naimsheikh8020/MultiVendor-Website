import { assets } from "../../assets/assets";
import DashboardCard from "../../Components/VendorDashBoard/Dashboard/DashboardCard"

const VendorEarnings = () => {
  const stats = [
    {
      icon: assets.VendorTotalSales,
      value: "৳ 45600.00",
      label: "Total Sales",
    },
    {
      icon: assets.VendorCommsion,
      value: "৳ 4560.00",
      label: "Commission",
    },
    {
      icon: assets.VendorNetEarning,
      value: "৳ 410400.00",
      label: "Net Earnings",
    },
    
  ];
  return (
    <>
      <div>
        <h1 className="mb-1 text-lg sm:text-xl font-bold text-gray-700">
          Earnings
        </h1>
        <p className="text-sm sm:text-base text-gray-600">
          Track your sales and commission
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-5 mt-6">
        {stats.map((item, index) => (
          <DashboardCard
            key={index}
            icon={item.icon}
            value={item.value}
            label={item.label}
          />
        ))}
      </div>

    </>
  )
}

export default VendorEarnings
