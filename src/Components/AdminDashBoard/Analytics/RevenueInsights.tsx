const RevenueInsights = () => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
      
      {/* TITLE */}
      <h2 className="text-base font-semibold text-gray-800 mb-4">
        Revenue Insights
      </h2>

      {/* CARDS */}
      <div className="space-y-4">

        {/* AVERAGE ORDER VALUE */}
        <div className="bg-green-50 rounded-lg px-4 py-4">
          <p className="text-sm text-gray-600 mb-1">
            Average Order Value
          </p>
          <p className="text-lg font-semibold text-green-600">
            $649.99
          </p>
        </div>

        {/* REVENUE PER VENDOR */}
        <div className="bg-blue-50 rounded-lg px-4 py-4">
          <p className="text-sm text-gray-600 mb-1">
            Revenue per Vendor
          </p>
          <p className="text-lg font-semibold text-blue-600">
            $974.98
          </p>
        </div>

      </div>

    </div>
  );
};

export default RevenueInsights;