import { Link } from "react-router-dom";

type Order = {
  id: string;
  customer: string;
  vendor: string;
  date: string;
  total: string;
  status: "delivered" | "processing";
};

const orders: Order[] = [
  {
    id: "ord-001",
    customer: "John Doe",
    vendor: "TechGear Pro",
    date: "1/15/2026",
    total: "$459.98",
    status: "delivered",
  },
  {
    id: "ord-002",
    customer: "Jane Smith",
    vendor: "Fashion Forward",
    date: "1/16/2026",
    total: "$199.50",
    status: "processing",
  },
  {
    id: "ord-003",
    customer: "Mike Ross",
    vendor: "Home Essentials",
    date: "1/17/2026",
    total: "$89.99",
    status: "delivered",
  },
];

const DashboardRecentOrder = () => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 mt-4 shadow">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-gray-800">
          Recent Orders
        </h3>
        <Link to="/admin/orders">
          <span className="text-sm text-blue-600 cursor-pointer">
            View All
          </span>
        </Link>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-gray-500 border-b border-gray-200">
            <tr>
              <th className="py-2">Order ID</th>
              <th>Customer</th>
              <th>Vendor</th>
              <th>Date</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b border-gray-200">
                <td className="py-3">{order.id}</td>
                <td>{order.customer}</td>
                <td>{order.vendor}</td>
                <td>{order.date}</td>
                <td>{order.total}</td>
                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      order.status === "delivered"
                        ? "bg-blue-100 text-blue-600"
                        : "bg-orange-100 text-orange-500"
                    }`}
                  >
                    {order.status === "delivered"
                      ? "Delivered"
                      : "Processing"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden flex flex-col gap-3">
        {orders.map((order) => (
          <div
            key={order.id}
            className="border border-gray-200 rounded-lg p-3"
          >
            <div className="flex justify-between mb-2">
              <span className="font-medium">{order.id}</span>
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  order.status === "delivered"
                    ? "bg-blue-100 text-blue-600"
                    : "bg-orange-100 text-orange-500"
                }`}
              >
                {order.status === "delivered"
                  ? "Delivered"
                  : "Processing"}
              </span>
            </div>

            <p className="text-sm text-gray-700">
              {order.customer}
            </p>
            <p className="text-xs text-gray-500">
              Vendor: {order.vendor}
            </p>

            <div className="flex justify-between mt-2 text-sm">
              <span>{order.date}</span>
              <span className="font-medium">{order.total}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardRecentOrder;