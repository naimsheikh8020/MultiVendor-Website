import { UserCircle } from "lucide-react"
import AvatarUpload from "./AvatarUpload"

const ProfileInfo = () => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">
          Personal Information
        </h2>

        <button className="text-sm font-medium text-blue-600 hover:underline">
          Edit
        </button>
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
  )
}

export default ProfileInfo