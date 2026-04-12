import { Eye, UserX } from "lucide-react";
import type { Customer } from "../../../types/AdminUser";

const CustomerRow = ({ c }: { c: Customer }) => {
  return (
    <tr className="border-t border-gray-200">
      {/* CUSTOMER INFO */}
      <td className="p-3">
        <p className="font-medium text-gray-700">{c.name}</p>
        <p className="text-xs text-gray-400">{c.email}</p>
      </td>

      {/* TOTAL ORDERS */}
      <td className="p-3 text-center">{c.totalOrders}</td>

      {/* TOTAL SPEND */}
      <td className="p-3 text-center">{c.totalSpend}</td>

      {/* 🔥 CANCEL COUNT */}
      <td className="p-3 text-center">
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            c.cancelCount === 0
              ? "bg-green-100 text-green-600"
              : c.cancelCount <= 2
              ? "bg-yellow-100 text-yellow-600"
              : "bg-red-100 text-red-600"
          }`}
        >
          {c.cancelCount}
        </span>
      </td>

      {/* ACTIONS */}
      <td className="p-3">
        <div className="flex justify-center gap-2">
          <button className="p-2 bg-gray-100 rounded-md hover:bg-gray-200">
            <Eye size={16} />
          </button>

          <button className="p-2 bg-red-100 text-red-600 rounded-md hover:bg-red-200">
            <UserX size={16} />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default CustomerRow;