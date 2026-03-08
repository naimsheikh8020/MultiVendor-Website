import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router"
import ProfileInfo from "../features/MyProfile/ProfileInfo"
import Address from "../features/MyProfile/Address"
import RecentOrders from "../features/MyProfile/RecentOrders"
import Payment from "../features/MyProfile/Payment"
import Reviews from "../features/MyProfile/Reviews"
import Sidebar from "../features/MyProfile/Sidebar"



const MyProfile = () => {
  const navigate = useNavigate()

  const [activeTab, setActiveTab] = useState<"profile" | "address" | "payment" | "orders" | "reviews">("profile")

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileInfo />
      case "address":
        return <Address />
      case "payment":
        return <Payment />
      case "orders":
        return <RecentOrders />
      case "reviews":
        return <Reviews />
      default:
        return <ProfileInfo />
    }
  }

  return (
    <div className="w-full px-4 md:px-6 py-6">

      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-900 mb-6 hover:text-blue-600 transition"
      >
        <ArrowLeft size={20} />
        <h1 className="text-2xl font-bold">My Profile</h1>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">

        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="space-y-6">
          {renderContent()}
        </div>

      </div>

    </div>
  )
}

export default MyProfile