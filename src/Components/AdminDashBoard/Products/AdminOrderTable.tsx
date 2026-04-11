import { useState } from "react";
import { Eye, CheckCircle, Clock, XCircle, Package } from "lucide-react";

type Order = {
  id: number;
  orderId: string;
  customer: string;
  store: string;
  date: string;
  price: number;
  commission: number;
  status: "Delivered" | "Pending" | "Processing" | "Cancelled" | "Shipped";
};

type Props = {
  data: Order[];
};

const ITEMS_PER_PAGE = 10;

const statusConfig = {
  Delivered: {
    color: "bg-green-100 text-green-600",
    icon: CheckCircle,
  },
  Pending: {
    color: "bg-yellow-100 text-yellow-600",
    icon: Clock,
  },
  Processing: {
    color: "bg-blue-100 text-blue-600",
    icon: Package,
  },
  Cancelled: {
    color: "bg-red-100 text-red-600",
    icon: XCircle,
  },
  Shipped: {
    color: "bg-purple-100 text-purple-600",
    icon: Package,
  },
};

const AdminOrderTable = ({ data }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentData = data.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const currentPageIds = currentData.map((item) => item.id);

  const isAllSelected =
    currentPageIds.length > 0 &&
    currentPageIds.every((id) => selectedIds.includes(id));

  const handleSelectAll = () => {
    if (isAllSelected) {
      setSelectedIds((prev) =>
        prev.filter((id) => !currentPageIds.includes(id)),
      );
    } else {
      setSelectedIds((prev) => [...new Set([...prev, ...currentPageIds])]);
    }
  };

  const handleSelectOne = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {/* TABLE */}
      <div className="overflow-x-auto ">
        <table className="min-w-[900px] w-full text-base">
          {/* HEADER */}
          <thead className="bg-gray-50 text-gray-500">
            <tr>
              <th className="p-3 w-10">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  onChange={handleSelectAll}
                />
              </th>
              <th className="p-3 text-left">Order ID</th>
              <th className="p-3 text-left">Customer</th>
              <th className="p-3 text-left">Store Name</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Commission</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-center w-20">Actions</th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody>
            {currentData.map((item) => {
              const config = statusConfig[item.status];
              const Icon = config.icon;

              return (
                <tr key={item.id} className="border-t border-gray-200 hover:bg-gray-50">
                  {/* CHECKBOX */}
                  <td className="p-3">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(item.id)}
                      onChange={() => handleSelectOne(item.id)}
                    />
                  </td>

                  {/* ORDER ID */}
                  <td className="p-3 font-medium text-gray-800">
                    {item.orderId}
                  </td>

                  {/* CUSTOMER */}
                  <td className="p-3 text-gray-600">{item.customer}</td>

                  {/* STORE */}
                  <td className="p-3 text-gray-600">{item.store}</td>

                  {/* DATE */}
                  <td className="p-3 text-gray-600">{item.date}</td>

                  {/* PRICE */}
                  <td className="p-3 font-medium">${item.price}</td>

                  {/* COMMISSION */}
                  <td className="p-3 text-green-600 font-medium">
                    ${item.commission}
                  </td>

                  {/* STATUS */}
                  <td className="p-3">
                    <span
                      className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium w-fit ${config.color}`}
                    >
                      <Icon size={14} />
                      {item.status}
                    </span>
                  </td>

                  {/* ACTION */}
                  <td className="p-3">
                    <div className="flex justify-center">
                      <button className="p-2 border border-gray-200 rounded-md hover:bg-gray-100">
                        <Eye className="text-green-400" size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className="flex justify-between items-center p-4 border-t border-gray-200 text-sm">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
          className="px-3 py-1 border border-gray-200 cursor-pointer rounded-md disabled:opacity-50"
        >
          Previous
        </button>

        <span className="text-gray-500">
          Page {currentPage} of {totalPages}
        </span>

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
          className="px-3 py-1 border border-gray-200 cursor-pointer rounded-md disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AdminOrderTable;
