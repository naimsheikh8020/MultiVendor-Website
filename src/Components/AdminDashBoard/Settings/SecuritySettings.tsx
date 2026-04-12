import { Shield } from "lucide-react";

const SecuritySettings = () => {
  return (
    <div>
      <div className="bg-white p-6 sm:p-8 rounded-xl border border-gray-200 space-y-6">
        <div className="flex items-center gap-2">
        <Shield className="w-5 h-5 text-blue-600" />
        <h2 className="text-base font-semibold text-gray-700">
          Security
        </h2>
      </div>
        {/* 2FA */}
        <div className="flex items-center justify-between bg-gray-100 px-5 py-4 rounded-lg">
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-700">
              Two-Factor Authentication
            </p>
            <p className="text-xs text-gray-500">
              Require 2FA for admin accounts
            </p>
          </div>

          {/* Toggle */}
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-300 rounded-full peer-checked:bg-blue-600 transition"></div>
            <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow transition-transform peer-checked:translate-x-5"></div>
          </label>
        </div>

        {/* Change Password */}
        <div className="space-y-5">
          <h3 className="text-sm font-semibold text-gray-700">
            Change Password
          </h3>

          {/* Inputs */}
          <div className="space-y-4">
            
            <div className="space-y-1">
              <label className="text-xs text-gray-500">
                Current Password
              </label>
              <input
                type="password"
                placeholder="Password"
                className="w-full h-11 rounded-lg border border-gray-200 px-4 text-sm 
                focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-gray-500">
                New Password
              </label>
              <input
                type="password"
                placeholder="Password"
                className="w-full h-11 rounded-lg border border-gray-200 px-4 text-sm 
                focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-gray-500">
                Confirm New Password
              </label>
              <input
                type="password"
                placeholder="Password"
                className="w-full h-11 rounded-lg border border-gray-200 px-4 text-sm 
                focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button className="px-6 py-2.5 rounded-full border border-red-300 text-red-500 text-sm font-medium hover:bg-red-50 transition">
              Cancel
            </button>

            <button className="px-6 py-2.5 rounded-full bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition">
              Update Password
            </button>
          </div>
        </div>

  
      </div>
    </div>
  );
};

export default SecuritySettings;