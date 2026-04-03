import { assets } from "../../assets/assets"
import DashboardCard from "../../Components/VendorDashBoard/Dashboard/DashboardCard"

const VendorDashboard = () => {
  return (
    <div>
      <h1 className="font-bold text-xl text-gray-600 mb-2">Dashboard</h1>
      <p className="text-gray-600 ">Welcome back, <span className="font-semibold text-blue-600">Sohan Smith</span>!</p>

      <div className="flex gap-4 w-full mt-6">
        <DashboardCard
          icon={assets.VendorTotalSales}
          value="৳ 45600.00"
          label="Total Sales"
        />
        <DashboardCard
          icon={assets.VendorNetEarning}
          value={"৳ 45600.00"}
          label="Net Earnings"
        />
        <DashboardCard
          icon={assets.VendorTotalProduct}
          value="5"
          label="Total Products"
        />
        <DashboardCard
          icon={assets.VendorTotalOrder}
          value="1000"
          label="Total Orders"
        />

      </div>
    </div>
  )
}

export default VendorDashboard
