type Order = {
  id: string;
  customer?: string;
  date: string;
  total: string;
  status: string;
};

type RecentOrdersProps = {
  orders: Order[];
  loading?: boolean;
};

const getStatusStyle = (status: string) => {
  const s = status.toLowerCase();

  if (s === "delivered") return "bg-blue-100 text-blue-600";
  if (s === "processing" || s === "in_progress")
    return "bg-purple-100 text-purple-600";
  if (s === "pending") return "bg-yellow-100 text-yellow-600";

  return "bg-gray-100 text-gray-600";
};

const RecentOrders = ({ orders, loading = false }: RecentOrdersProps) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 mt-8 shadow">
      {/* Title */}
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Recent Orders
      </h2>

      {/* Loading */}
      {loading ? (
        <p className="text-sm text-gray-500">Loading orders...</p>
      ) : orders.length === 0 ? (
        /* Empty state */
        <p className="text-sm text-gray-500">No orders found</p>
      ) : (
        /* Table */
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-sm text-gray-500 border-b border-gray-200">
                <th className="py-3">Order ID</th>
                <th className="py-3">Customer</th>
                <th className="py-3">Date</th>
                <th className="py-3">Total</th>
                <th className="py-3">Status</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-gray-200 last:border-none hover:bg-gray-100/50 transition"
                >
                  <td className="py-4 text-gray-700">{order.id}</td>

                  <td className="py-4 text-gray-700">
                    {order.customer || "Unknown"}
                  </td>

                  <td className="py-4 text-gray-500">{order.date}</td>

                  <td className="py-4 text-gray-700">{order.total}</td>

                  <td className="py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default RecentOrders;