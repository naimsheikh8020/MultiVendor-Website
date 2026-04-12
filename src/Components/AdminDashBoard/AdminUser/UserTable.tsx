import VendorRow from "./VendorRow";
import CustomerRow from "./CustomerRow";
import Pagination from "./Pagination";
import type { Customer, Vendor } from "../../../types/AdminUser";

type Props = {
  type: "vendors" | "customers";
  vendors: Vendor[];
  customers: Customer[];
  page: number;
  setPage: (val: number) => void;
};

const PAGE_SIZE = 10;

const UserTable = ({
  type,
  vendors,
  customers,
  page,
  setPage,
}: Props) => {
  // 🔥 SELECT DATA BASED ON TAB
  const data = type === "vendors" ? vendors : customers;

  // 🔥 PAGINATION LOGIC
  const totalPages = Math.ceil(data.length / PAGE_SIZE);

  const start = (page - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE;

  const paginatedData = data.slice(start, end);

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      
      {/* SCROLL */}
      <div className="w-full overflow-x-auto">
        <table className="min-w-[800px] w-full text-sm">
          
          {/* HEADER */}
          <thead className="bg-gray-50 text-gray-500 whitespace-nowrap">
            {type === "vendors" ? (
              <tr>
                <th className="p-3 text-left">Vendor Info</th>
                <th className="p-3 text-left">Store</th>
                <th className="p-3 text-center">Sales</th>
                <th className="p-3 text-center">Balance</th>
                <th className="p-3 text-center">Joined</th>
                <th className="p-3 text-center">Status</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            ) : (
              <tr>
                <th className="p-3 text-left">Customer Info</th>
                <th className="p-3 text-center">Orders</th>
                <th className="p-3 text-center">Total Spend</th>
                <th className="p-3 text-center">Cancelled</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            )}
          </thead>

          {/* BODY */}
          <tbody className="whitespace-nowrap">
            {type === "vendors"
              ? (paginatedData as Vendor[]).map((v) => (
                  <VendorRow key={v.id} v={v} />
                ))
              : (paginatedData as Customer[]).map((c) => (
                  <CustomerRow key={c.id} c={c} />
                ))}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className="border-t border-gray-200 mt-4 md:mt-6">
        <Pagination
          page={page}
          setPage={setPage}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
};

export default UserTable;