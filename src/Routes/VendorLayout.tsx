import React from "react";
import { Outlet } from "react-router";
import VendorSidebar from "../features/vendors/VendorSidebar";

const VendorLayout: React.FC = () => {
  return (
    <div className="h-screen bg-[#f6f7fb] flex overflow-hidden">
      
      {/* SIDEBAR (FIXED) */}
      <div className="hidden md:block fixed left-0 top-0 h-full w-64 z-50">
        <VendorSidebar />
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col md:ml-64 h-full">
        
        {/* TOP BAR */}
        <div className="h-[70px] bg-white border-b flex items-center justify-end px-6 border-gray-200 shadow-sm flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-800">Vendor</p>
              <p className="text-xs text-gray-500">vendor@gmail.com</p>
            </div>

            <div className="w-10 h-10 rounded-full bg-gray-200" />
          </div>
        </div>

        {/* SCROLLABLE CONTENT */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>

      </div>
    </div>
  );
};

export default VendorLayout;