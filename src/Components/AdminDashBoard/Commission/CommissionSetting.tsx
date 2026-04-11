const CommissionSetting = () => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6 shadow-sm">
      
      {/* Title */}
      <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">
        Commission Settings
      </h2>

      {/* Input + Button Row */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        
        {/* Input */}
        <div className="w-full sm:w-64">
          <label className="block text-sm text-gray-600 mb-1">
            Default Commission Rate (%)
          </label>

          <input
            type="number"
            defaultValue={10}
            className="
              w-full rounded-lg border border-gray-200
              px-3 py-2 text-sm
              focus:outline-none focus:ring-2 focus:ring-blue-500
            "
          />
        </div>

        {/* Button */}
        <button
          className="
            mt-0 sm:mt-6
            px-6 py-2 rounded-lg
            bg-blue-600 text-white text-sm font-medium
            hover:bg-blue-700 transition
          "
        >
          Update
        </button>

      </div>

      {/* Note */}
      <p className="text-xs text-gray-500 mt-3">
        This rate applies to all new vendor orders
      </p>

    </div>
  );
};

export default CommissionSetting;