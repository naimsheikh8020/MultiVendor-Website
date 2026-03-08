const RecentOrders = () => {
  const orders = [
    { id: "ord-001", date: "1/15/2026", price: "$459.98", status: "delivered" },
    { id: "ord-002", date: "2/20/2026", price: "$299.50", status: "Processing" },
    { id: "ord-003", date: "3/05/2026", price: "$150.75", status: "shipped" }
  ]

  return (
    <div className="bg-white border border-gray-100 shadow-sm rounded-xl p-6">

      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-2xl text-gray-900">
          Recent Orders
        </h2>

        
      </div>

      <div className="space-y-3">

        {orders.map((order) => (
          <div
            key={order.id}
            className="border border-gray-200 rounded-lg p-4 flex justify-between items-center"
          >
            <div>
              <p className="font-medium text-base">{order.id}</p>
              <p className="text-base text-gray-500">{order.date}</p>
            </div>

            <div className="text-right">
              <p className="text-blue-600 font-semibold text-base">
                {order.price}
              </p>
              <p className="text-base text-gray-500">
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