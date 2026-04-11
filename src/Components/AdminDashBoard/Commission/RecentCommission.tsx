type Transaction = {
  id: number;
  orderId: string;
  store: string;
  sale: number;
  commission: number;
};

const RecentCommission = () => {
  const transactions: Transaction[] = [
    {
      id: 1,
      orderId: "ord-001",
      store: "TechGear Pro",
      sale: 459.98,
      commission: 45.99,
    },
    {
      id: 2,
      orderId: "ord-002",
      store: "TechGear Pro",
      sale: 459.98,
      commission: 45.99,
    },
    {
      id: 3,
      orderId: "ord-003",
      store: "TechGear Pro",
      sale: 459.98,
      commission: 45.99,
    },
    {
      id: 4,
      orderId: "ord-004",
      store: "TechGear Pro",
      sale: 459.98,
      commission: 45.99,
    },
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6 shadow-sm">
      
      {/* Title */}
      <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-4">
        Recent Commission Transactions
      </h2>

      {/* List */}
      <div className="space-y-3">
        {transactions.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between border border-gray-200 rounded-lg p-3"
          >
            
            {/* Left */}
            <div>
              <p className="text-sm font-medium text-gray-800">
                {item.orderId}
              </p>
              <p className="text-xs text-gray-500">
                {item.store}
              </p>
            </div>

            {/* Right */}
            <div className="text-right">
              <p className="text-sm text-gray-600">
                Sale: ${item.sale}
              </p>
              <p className="text-xs text-green-600 font-medium">
                Commission: ${item.commission}
              </p>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};

export default RecentCommission;