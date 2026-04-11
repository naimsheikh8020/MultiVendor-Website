import { assets } from "../../assets/assets";
import TopPerformingVendorAndOrder from "../../Components/AdminDashBoard/Analytics/TopPerformingVendorAndOrder";
import DashboardTopCard from "../../Components/AdminDashBoard/Dashboard/DashboardTopCard"

const AdminAnalytics = () => {
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
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="mb-1 text-lg sm:text-xl font-bold text-gray-700">
            Analytics
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Platform performance and insights
          </p>
        </div>
      </div>

      {/* Top Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cardData.map((card, index) => (
        <DashboardTopCard key={index} {...card} />
      ))}
      </div>

      {/* Top Performing Vendors and Orders */}
      <TopPerformingVendorAndOrder/>

    </div>
  )
}

export default AdminAnalytics
