import { Plus } from "lucide-react";
import { assets } from "../../assets/assets";
import PrimaryButton from "../../Components/PrimaryButton";
import DashboardCard from "../../Components/VendorDashBoard/Dashboard/DashboardCard"

const VendorPayout = () => {
  const stats = [
    {
      icon: assets.VendorTotalSales,
      value: "৳ 45600.00",
      label: "Available Balance (Can be withdrawn)",
    },
    {
      icon: assets.VendorPayout,
      value: "৳ 45600.00",
      label: "Pending Balance (From recent orders)",
    },
    {
      icon: assets.VendorLifeTimeEarning,
      value: "৳ 4560000.00",
      label: "Lifetime Earnings (Total earnings from all orders)",
    },
   
  ];
  return (
    <div>
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="mb-1 text-lg sm:text-xl font-bold text-gray-700">
            Products
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Manage your product inventory
          </p>
        </div>

        <PrimaryButton
          label="Add Category"
          icon={<Plus />}
          onClick={() => console.log("Clicked")}
          className="w-full sm:w-auto"
        />
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-4 mt-6">
        {stats.map((item, index) => (
          <DashboardCard
            key={index}
            icon={item.icon}
            value={item.value}
            label={item.label}
          />
        ))}
      </div>
    </div>
  )
}

export default VendorPayout
