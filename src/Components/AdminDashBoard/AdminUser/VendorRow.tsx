import { Eye, UserX, Check } from "lucide-react";
import type { Vendor } from "../../../types/AdminUser";

const VendorRow = ({ v }: { v: Vendor }) => {
  return (
    <tr className="border-t border-gray-200">
      
      {/* INFO */}
      <td className="p-3">
        <p className="font-medium text-gray-700">{v.name}</p>
        <p className="text-xs text-gray-400">{v.email}</p>
      </td>

      <td className="p-3">{v.store}</td>

      <td className="p-3 text-center">
        ${v.totalSales.toFixed(2)}
      </td>

      <td className="p-3 text-center">
        ${v.balance.toFixed(2)}
      </td>

      <td className="p-3 text-center">{v.joined}</td>

      {/* STATUS */}
      <td className="p-3 text-center">
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            v.status === "Approved"
              ? "bg-green-100 text-green-600"
              : v.status === "Pending"
              ? "bg-yellow-100 text-yellow-600"
              : "bg-red-100 text-red-600"
          }`}
        >
          {v.status}
        </span>
      </td>

      {/* ACTIONS */}
      <td className="p-3">
        <div className="flex justify-center">
          
          {/* 🔥 FIXED WIDTH CONTAINER */}
          <div className="flex items-center gap-2 min-w-[120px] justify-center">
            
            {/* VIEW */}
            <button className="p-2 bg-gray-100 rounded-md hover:bg-gray-200 transition cursor-pointer">
              <Eye size={16} />
            </button>

            {/* APPROVE (ONLY PENDING) */}
            {v.status === "Pending" && (
              <button className="p-2 bg-green-100 text-green-600 rounded-md hover:bg-green-200 transition cursor-pointer">
                <Check size={16} />
              </button>
            )}

            {/* REJECT */}
            <button className="p-2 bg-red-100 text-red-600 rounded-md hover:bg-red-200 transition cursor-pointer">
              <UserX size={16} />
            </button>

          </div>
        </div>
      </td>
    </tr>
  );
};

export default VendorRow;