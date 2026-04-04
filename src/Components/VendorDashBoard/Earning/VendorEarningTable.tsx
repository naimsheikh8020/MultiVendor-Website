import React, { useState, useMemo } from "react";
import { MoveLeft, MoveRight } from 'lucide-react';

/* ================= TYPES ================= */

type OrderStatus = "Delivered" | "Processing" | "Cancelled";

interface VendorEarning {
  orderId: string;
  date: string;
  totalSale: number;
  commission: number;
  netAmount: number;
  status: OrderStatus;
}

/* ================= DATA GENERATOR ================= */

const generateEarnings = (count: number): VendorEarning[] => {
  const statuses: OrderStatus[] = ["Delivered", "Processing", "Cancelled"];

  return Array.from({ length: count }, (_, i) => {
    const totalSale = +(Math.random() * 2000 + 50).toFixed(2);
    const commission = +(totalSale * 0.1).toFixed(2);

    return {
      orderId: `ord-${String(i + 1).padStart(3, "0")}`,
      date: "1/15/2026",
      totalSale,
      commission,
      netAmount: +(totalSale - commission).toFixed(2),
      status: statuses[Math.floor(Math.random() * statuses.length)],
    };
  });
};

const earningsData = generateEarnings(100);

/* ================= HELPERS ================= */

const getStatusStyle = (status: OrderStatus) => {
  switch (status) {
    case "Delivered":
      return "bg-green-50 text-green-600";
    case "Processing":
      return "bg-blue-50 text-blue-600";
    case "Cancelled":
      return "bg-red-50 text-red-600";
    default:
      return "";
  }
};

/* ================= COMPONENT ================= */

const ITEMS_PER_PAGE = 10;

const VendorEarningTable: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(earningsData.length / ITEMS_PER_PAGE);

  const paginatedData = useMemo(() => {
    return earningsData.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      currentPage * ITEMS_PER_PAGE
    );
  }, [currentPage]);

  return (
    <div className="w-full bg-white rounded-2xl border border-gray-200 p-4 md:p-6 shadow">
      <h2 className="text-[16px] md:text-2xl  text-gray-800 mb-4 font-bold">
        Earnings Breakdown
      </h2>

      {/* TABLE */}
      <div className="w-full overflow-x-auto">
        <table className="min-w-[700px] w-full border-collapse">
          <thead>
            <tr className="text-gray-500 text-base border-b border-gray-200">
              <th className="text-left py-3 px-2 md:px-3 font-medium">
                Order ID
              </th>
              <th className="text-left py-3 px-2 md:px-3 font-medium">
                Date
              </th>
              <th className="text-left py-3 px-2 md:px-3 font-medium">
                Total Sale
              </th>
              <th className="text-left py-3 px-2 md:px-3 font-medium">
                Commission (10%)
              </th>
              <th className="text-left py-3 px-2 md:px-3 font-medium">
                Net Amount
              </th>
              <th className="text-left py-3 px-2 md:px-3 font-medium">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {paginatedData.map((item) => (
              <tr
                key={item.orderId}
                className="border-b last:border-none text-[14px] border-gray-200 hover:bg-gray-50 transition"
              >
                <td className="py-4 px-2 md:px-3 text-gray-700">
                  {item.orderId}
                </td>

                <td className="py-4 px-2 md:px-3 text-gray-500">
                  {item.date}
                </td>

                <td className="py-4 px-2 md:px-3 font-medium text-gray-800">
                  ${item.totalSale.toFixed(2)}
                </td>

                <td className="py-4 px-2 md:px-3 text-red-500 font-medium">
                  -${item.commission.toFixed(2)}
                </td>

                <td className="py-4 px-2 md:px-3 text-green-600 font-semibold">
                  ${item.netAmount.toFixed(2)}
                </td>

                <td className="py-4 px-2 md:px-3">
                  <span
                    className={`inline-flex items-center gap-1 px-3 py-2 rounded-full text-[12px] font-medium ${getStatusStyle(
                      item.status
                    )}`}
                  >
                    {item.status === "Delivered"}
                    {item.status === "Processing"}
                    {item.status === "Cancelled"}
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className="flex items-center justify-between mt-5">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
          className="px-3 py-1.5 border rounded-md text-sm disabled:opacity-40 bg-blue-600 text-white flex gap-2 items-center cursor-pointer"
        >
          <MoveLeft size={12} /> Prev
        </button>

        <div className="flex items-center gap-2 text-sm">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded-md border ${currentPage === i + 1
                  ? "bg-blue-600 text-white cursor-pointer"
                  : "bg-white text-gray-600"
                }`}
            >
              {i + 1}
            </button>
          ))}
        </div>

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
          className="px-3 py-1.5 border rounded-md text-sm disabled:opacity-40 bg-blue-600 text-white flex gap-2 items-center cursor-pointer"
        >
          Next <MoveRight size={12} />
        </button>
      </div>
    </div>
  );
};

export default VendorEarningTable;