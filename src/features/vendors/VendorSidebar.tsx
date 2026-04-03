import React from "react";
import {
  LayoutDashboard,
  Box,
  Layers,
  ShoppingCart,
  DollarSign,
  Wallet,
  User,
  Store,
  LogOut,
} from "lucide-react";

const VendorSidebar: React.FC = () => {
  return (
    <aside className="w-[260px] bg-white border-r min-h-screen px-4 py-6 flex flex-col justify-between">

      {/* TOP */}
      <div>
        {/* TITLE */}
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white text-sm">
            📦
          </div>
          <h2 className="text-[16px] font-semibold">Vendor Panel</h2>
        </div>

        {/* MENU */}
        <nav className="flex flex-col gap-1 text-[14px]">

          {/* ACTIVE */}
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-blue-600 text-white cursor-pointer">
            <LayoutDashboard size={18} />
            Dashboard
          </div>

          <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer">
            <Box size={18} />
            Products
          </div>

          <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer">
            <Layers size={18} />
            Category
          </div>

          <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer">
            <ShoppingCart size={18} />
            Orders
          </div>

          <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer">
            <DollarSign size={18} />
            Earnings
          </div>

          <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer">
            <Wallet size={18} />
            Payouts
          </div>

          <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer">
            <User size={18} />
            Profile
          </div>

          <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer">
            <Store size={18} />
            View Store Front
          </div>
        </nav>
      </div>

      {/* BOTTOM */}
      <div>
        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition">
          <LogOut size={18} />
          Log Out
        </button>
      </div>

    </aside>
  );
};

export default VendorSidebar;