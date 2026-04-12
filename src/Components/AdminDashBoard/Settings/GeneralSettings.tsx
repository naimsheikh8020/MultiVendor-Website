const GeneralSettings = () => {
  return (
    <div className="space-y-6 sm:space-y-8">
      
      {/* Platform Settings */}
      <div className="bg-white p-6 sm:p-8 rounded-xl border border-gray-200">
        <h3 className="text-base font-semibold text-gray-700 mb-6">
          Platform Settings
        </h3>

        <div className="space-y-6">
          
          {/* Support Email */}
          <div className="space-y-2">
            <label className="text-sm text-gray-500">
              Support Email
            </label>

            <input
              type="email"
              placeholder="Enter support email"
              className="w-full h-11 rounded-lg border border-gray-200 px-4 text-sm text-gray-700 
              placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Support Password */}
          <div className="space-y-2">
            <label className="text-sm text-gray-500">
              Support Password
            </label>

            <input
              type="password"
              placeholder="Enter password"
              className="w-full h-11 rounded-lg border border-gray-200 px-4 text-sm text-gray-700 
              placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <p className="text-xs text-gray-400 mt-1">
              Used for system emails or integrations
            </p>
          </div>

        </div>
      </div>

      {/* Commission & Fees */}
      <div className="bg-white p-6 sm:p-8 rounded-xl border border-gray-200 space-y-6">
        
        <h3 className="text-base font-semibold text-gray-700">
          Commission & Fees
        </h3>

        {/* Commission Input */}
        <div className="space-y-2">
          <label className="text-sm text-gray-500">
            Default Commission Rate (%)
          </label>

          <input
            type="number"
            placeholder="Enter percentage"
            className="w-full h-11 rounded-lg border border-gray-200 px-4 text-sm text-gray-700 
            placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Toggle */}
        <div className="flex items-center justify-between bg-gray-50 px-5 py-4 rounded-lg border border-gray-100">
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-700">
              Auto-approve Vendors
            </p>
            <p className="text-xs text-gray-500">
              Automatically approve new vendor registrations
            </p>
          </div>

          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-300 rounded-full peer-checked:bg-blue-600 transition"></div>
            <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow transition-transform peer-checked:translate-x-5"></div>
          </label>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row justify-end gap-4 pt-2">
        
        <button className="px-6 py-2.5 rounded-full border border-red-300 text-red-500 text-sm font-medium hover:bg-red-50 transition">
          Cancel
        </button>

        <button className="px-7 py-2.5 rounded-full bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition">
          Update
        </button>
      </div>
    </div>
  );
};

export default GeneralSettings;