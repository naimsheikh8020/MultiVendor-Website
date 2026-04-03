import React from "react";
import { Outlet } from "react-router";
import VendorSidebar from "../features/vendors/VendorSidebar";

const VendorLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#f6f7fb] flex">

      {/* SIDEBAR */}
      <div className="hidden md:block">
        <VendorSidebar />
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col">

        {/* TOP BAR (right side header) */}
        <div className="h-17.5 bg-white border-b flex items-center justify-end px-6 border-gray-200 shadow">
          
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-800">Vendor</p>
              <p className="text-xs text-gray-500">vendor@gmail.com</p>
            </div>

            <div className="w-10 h-10 rounded-full bg-gray-200" />
          </div>

        </div>

        {/* PAGE CONTENT */}
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          <Outlet />
        </main>

      </div>
    </div>
  );
};

export default VendorLayout;