import { assets } from "../../assets/assets";
import DashboardRecentOrder from "../../Components/AdminDashBoard/Dashboard/DashboardRecentOrder";
import DashboardTopCard from "../../Components/AdminDashBoard/Dashboard/DashboardTopCard";
import RecommendedStore from "../../Components/AdminDashBoard/Dashboard/RecommendedStore";
// import  RecommendedStore  from "../../Components/AdminDashBoard/Dashboard/RecommendedStore";
import { VendorStatus } from "../../Components/AdminDashBoard/Dashboard/VendorStatus";
import type { VendorStatusItem } from "../../Components/AdminDashBoard/Dashboard/VendorStatus";

const AdminDashboard = () => {
  const cardData = [
  {
    label: "Total Sales",
    value: "$1949.96",
    growth: "+12.5%",
    icon: assets.VendorTotalSales,

  },
  {
    label: "Commission Earned",
    value: "$194.97",
    growth: "+8.2%",
    icon: assets.VendorCommsion,

  },
  {
    label: "Active Vendors",
    value: "2",
    growth: "+3",
    icon: assets.ActiveVendor,
  
  },
  {
    label: "Total Orders",
    value: "2",
    growth: "+24",
    icon: assets.VendorTotalOrder,

  },
];
const vendorStatusData: VendorStatusItem[] = [
  { id: "1", name: "TechGear Pro", owner: "John Smith", status: "approved" },
  { id: "2", name: "Fashion Forward", owner: "Sarah Johnson", status: "approved" },
  { id: "3", name: "Home Essentials", owner: "Mike Davis", status: "pending" },
];

const recommendedStoreData = [
  { id: "1", name: "TechGear Pro", owner: "John Smith", enabled: true },
  { id: "2", name: "Fashion Forward", owner: "Sarah Johnson", enabled: true },
  { id: "3", name: "Home Essentials", owner: "Mike Davis", enabled: true },
];
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="mb-1 text-lg sm:text-xl font-bold text-gray-700">
            Dashboard
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Platform overview and statistics
          </p>
        </div>
      </div>

      {/* Top Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cardData.map((card, index) => (
        <DashboardTopCard key={index} {...card} />
      ))}
      </div>

      {/* Vendor Status And Recommended Stores */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <VendorStatus data={vendorStatusData} />
        <RecommendedStore data={recommendedStoreData} />
      </div>

      {/* Recent Orders */}
      <div className="mt-6">
        <DashboardRecentOrder/>
      </div>
    </div>
  )
}

export default AdminDashboard
