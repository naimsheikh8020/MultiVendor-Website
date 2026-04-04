import { assets } from "../../assets/assets";
import DashboardCard from "../../Components/VendorDashBoard/Dashboard/DashboardCard"
import VendorEarningTable from "../../Components/VendorDashBoard/Earning/VendorEarningTable";

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
      <div className="mt-6">
        <VendorEarningTable />
      </div>

      <div className="mt-6">
        <div className="w-full bg-white border border-gray-200 rounded-xl p-4 md:p-5 flex items-start gap-4 shadow">

          {/* ICON */}
          <div className="w-10 h-10 flex items-center justify-center bg-blue-600 text-white rounded-lg text-lg font-semibold">
            %
          </div>

          {/* CONTENT */}
          <div className="flex flex-col">
            <h2 className="text-base md:text-xl font-bold text-gray-800">
              Commission Structure
            </h2>

            <p className="text-[13px] md:text-base text-gray-600 mt-1 leading-relaxed max-w-175">
              MarketHub charges a 10% commission on all successful orders. This fee helps us maintain the platform and provide you with the best selling experience.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default VendorEarnings
