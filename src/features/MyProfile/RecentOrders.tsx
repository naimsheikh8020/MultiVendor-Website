const RecentOrders = () => {
  const orders = [
    { id: "ord-001", date: "1/15/2026", price: "$459.98", status: "delivered" },
    { id: "ord-002", date: "2/20/2026", price: "$299.50", status: "Processing" },
    { id: "ord-003", date: "3/05/2026", price: "$150.75", status: "shipped" }
  ]

  return (
    <div className="bg-white border rounded-xl p-6">

      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-gray-800">
          Recent Orders
        </h2>

        <button className="text-blue-600 text-sm hover:underline">
          View All
        </button>
      </div>

      <div className="space-y-3">

        {orders.map((order) => (
          <div
            key={order.id}
            className="border rounded-lg p-4 flex justify-between items-center"
          >
            <div>
              <p className="font-medium text-sm">{order.id}</p>
              <p className="text-xs text-gray-500">{order.date}</p>
            </div>

            <div className="text-right">
              <p className="text-blue-600 font-semibold text-sm">
                {order.price}
              </p>
              <p className="text-xs text-gray-500">
                {order.status}
              </p>
            </div>
          </div>
        ))}

      </div>

    </div>
  )
}

export default RecentOrders