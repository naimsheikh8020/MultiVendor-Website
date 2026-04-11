const TopPerformingVendorAndOrder = () => {
  const vendors = [
    { id: 1, name: "TechGear Pro", owner: "John Smith", sales: 68900 },
    { id: 2, name: "Fashion Forward", owner: "Sarah Johnson", sales: 68900 },
    { id: 3, name: "Home Essentials", owner: "Mike Davis", sales: 68900 },
  ];

  const statusData = [
    { label: "pending", value: 0, percent: 0, color: "bg-yellow-400" },
    { label: "processing", value: 1, percent: 33.3, color: "bg-blue-600" },
    { label: "shipped", value: 1, percent: 33.3, color: "bg-purple-600" },
    { label: "delivered", value: 1, percent: 33.3, color: "bg-green-600" },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">

      {/* LEFT CARD */}
      <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
        
        <h2 className="text-base font-semibold text-gray-800 mb-4">
          Top Performing Vendors
        </h2>

        <div className="space-y-3">
          {vendors.map((vendor) => (
            <div
              key={vendor.id}
              className="flex items-center justify-between border border-gray-200 rounded-lg px-4 py-3"
            >
              
              {/* LEFT */}
              <div className="flex items-center gap-3">
                
                {/* NUMBER CIRCLE */}
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 text-sm font-semibold">
                  {vendor.id}
                </div>

                {/* TEXT */}
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    {vendor.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {vendor.owner}
                  </p>
                </div>

              </div>

              {/* RIGHT */}
              <div className="text-right">
                <p className="text-sm font-semibold text-blue-600">
                  ${vendor.sales.toFixed(2)}
                </p>
                <p className="text-xs text-gray-500">
                  Total Sales
                </p>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* RIGHT CARD */}
      <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
        
        <h2 className="text-base font-semibold text-gray-800 mb-4">
          Order Status Distribution
        </h2>

        <div className="space-y-4">
          {statusData.map((item, index) => (
            <div key={index}>
              
              {/* LABEL ROW */}
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-700 capitalize">
                  {item.label}
                </span>
                <span className="text-gray-500">
                  {item.value} ({item.percent}%)
                </span>
              </div>

              {/* PROGRESS BAR */}
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`h-full ${item.color}`}
                  style={{ width: `${item.percent}%` }}
                />
              </div>

            </div>
          ))}
        </div>

      </div>

    </div>
  );
};

export default TopPerformingVendorAndOrder;