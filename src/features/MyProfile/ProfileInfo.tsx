import { useState } from "react";
import AvatarUpload from "./AvatarUpload"
import RecentOrders from "./RecentOrders"
import { SquarePen } from 'lucide-react';
import ProfileEditModal from "../../Components/ProfileEditModal";

const ProfileInfo = () => {
  const [openModal, setOpenModal] = useState(false)
  return (
    <>
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Personal Information
          </h2>

          <button onClick={() => setOpenModal(true)}>
            <SquarePen className="w-6 h-6 cursor-pointer text-blue-600"/>
          </button>

          <ProfileEditModal
            isOpen={openModal}
            onClose={() => setOpenModal(false)}
          />
        </div>

        {/* Avatar */}
        <div className="">
          <AvatarUpload />
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-16 gap-y-6">

          <div className="space-y-1">
            <p className="text-base text-gray-500">Full Name</p>
            <p className="text-lg font-medium text-gray-900">Akash</p>
          </div>

          <div className="space-y-1">
            <p className="text-base text-gray-500">Email</p>
            <p className="text-lg font-medium text-gray-900">customer@demo.com</p>
          </div>

          <div className="space-y-1">
            <p className="text-base text-gray-500">Phone</p>
            <p className="text-lg font-medium text-gray-900">+1 234 567 8900</p>
          </div>

          <div className="space-y-1">
            <p className="text-base text-gray-500">Gender</p>
            <p className="text-lg font-medium text-gray-900">Male</p>
          </div>

        </div>



      </div>
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Quick Stats
        </h2>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-base text-gray-500">Total Orders</p>
            <p className="text-lg font-semibold text-gray-900">15</p>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-base text-gray-500">Saved Addresses</p>
            <p className="text-lg font-semibold text-gray-900">2</p>
          </div>
        </div>
      </div>
      <div >
        <RecentOrders />
      </div>
    </>
  )
}

export default ProfileInfo