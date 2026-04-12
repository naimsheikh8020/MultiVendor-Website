import React, { useState } from "react";
import { Outlet } from "react-router";
import { Menu, X } from "lucide-react";
import AdminSidebar from "../features/Admin/AdminSidebar";

const AdminLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="h-screen bg-[#f6f7fb] flex">

      {/* MOBILE OVERLAY */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <div
        className={`
          fixed left-0 top-0 h-full w-64 z-50 
          transform transition-transform duration-300
          lg:translate-x-0
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <AdminSidebar onClose={() => setIsSidebarOpen(false)} />
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col lg:ml-64 min-h-0 w-full">

        {/* HEADER */}
        <div className="h-[70px] bg-white border-b flex items-center justify-between px-4 md:px-6 border-gray-200 shadow-sm shrink-0">
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* User Info */}
          <div className="flex items-center gap-3 ml-auto">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-800">Admin</p>
              <p className="text-xs text-gray-500">admin@gmail.com</p>
            </div>

            <div className="w-10 h-10 rounded-full bg-gray-200" />
          </div>
        </div>

        {/* 🔥 ONLY SCROLLABLE AREA */}
        <main className="flex-1 overflow-y-auto min-h-0 p-4 lg:p-6">
          <Outlet />
        </main>

      </div>
    </div>
  );
};

export default AdminLayout;