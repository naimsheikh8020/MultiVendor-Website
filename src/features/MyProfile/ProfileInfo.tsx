import { useState } from "react";
import AvatarUpload from "./AvatarUpload";
import RecentOrders from "./RecentOrders";
import { SquarePen } from "lucide-react";
import ProfileEditModal from "../../Components/ProfileEditModal";

// ✅ NEW
import { useProfile } from "../../features/auth/hooks/useProfile";
import { useAuthStore } from "../../features/auth/store/auth.store";

const ProfileInfo = () => {
  const [openModal, setOpenModal] = useState(false);

  const accessToken = useAuthStore((s) => s.accessToken);
  const isLoggedIn = !!accessToken;

  const { data: profile } = useProfile();

  const user = profile?.user;

  return (
    <>
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Personal Information
          </h2>

          {isLoggedIn && (
            <button onClick={() => setOpenModal(true)}>
              <SquarePen className="w-6 h-6 cursor-pointer text-blue-600" />
            </button>
          )}

          <ProfileEditModal
            isOpen={openModal}
            onClose={() => setOpenModal(false)}
          />
        </div>

        {/* Avatar */}
        <div>
          <AvatarUpload />
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-16 gap-y-6">

          {/* NAME */}
          <div className="space-y-1">
            <p className="text-base text-gray-500">Full Name</p>
            <p className="text-lg font-medium text-gray-900">
              {isLoggedIn ? user?.full_name || "N/A" : "Guest"}
            </p>
          </div>

          {/* EMAIL */}
          <div className="space-y-1">
            <p className="text-base text-gray-500">Email</p>
            <p className="text-lg font-medium text-gray-900">
              {isLoggedIn ? user?.email || "N/A" : "-"}
            </p>
          </div>

          {/* PHONE */}
          <div className="space-y-1">
            <p className="text-base text-gray-500">Phone</p>
            <p className="text-lg font-medium text-gray-900">
              {isLoggedIn ? user?.phone_number || "N/A" : "-"}
            </p>
          </div>

          {/* GENDER */}
          <div className="space-y-1">
            <p className="text-base text-gray-500">Gender</p>
            <p className="text-lg font-medium text-gray-900">
              {isLoggedIn ? user?.gender || "Not set" : "-"}
            </p>
          </div>

        </div>
      </div>

      {/* STATS */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Quick Stats
        </h2>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-base text-gray-500">Total Orders</p>
            <p className="text-lg font-semibold text-gray-900">
              {isLoggedIn ? profile?.total_orders ?? 0 : 0}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-base text-gray-500">Saved Addresses</p>
            <p className="text-lg font-semibold text-gray-900">
              {isLoggedIn ? profile?.total_saved_addresses ?? 0 : 0}
            </p>
          </div>
        </div>
      </div>

      {/* ORDERS */}
      <div>
        <RecentOrders />
      </div>
    </>
  );
};

export default ProfileInfo;