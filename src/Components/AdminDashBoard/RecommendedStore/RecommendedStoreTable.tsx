import { useState } from "react";
import { Star } from "lucide-react";

type Store = {
  id: number;
  name: string;
  owner: string;
  totalSales: number;
  rating: number;
  totalProducts: number;
  totalOrders: number;
  active: boolean;
};

const ITEMS_PER_PAGE = 10;

const RecommendedStoreTable = () => {
  // ✅ DATA STATE (IMPORTANT FIX)
  const [data, setData] = useState<Store[]>(
    Array.from({ length: 50 }, (_, i) => ({
      id: i + 1,
      name: "TechGear Pro",
      owner: "Jhon Doe",
      totalSales: Number((Math.random() * 1000).toFixed(2)),
      rating: 4.33,
      totalProducts: Math.floor(Math.random() * 30),
      totalOrders: Math.floor(Math.random() * 20),
      active: true,
    }))
  );

  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  // 🔥 Pagination
  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentData = data.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // 🔥 Checkbox Logic
  const currentPageIds = currentData.map((item) => item.id);

  const isAllSelected =
    currentPageIds.length > 0 &&
    currentPageIds.every((id) => selectedIds.includes(id));

  const handleSelectAll = () => {
    if (isAllSelected) {
      setSelectedIds((prev) =>
        prev.filter((id) => !currentPageIds.includes(id))
      );
    } else {
      setSelectedIds((prev) => [
        ...new Set([...prev, ...currentPageIds]),
      ]);
    }
  };

  const handleSelectOne = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((i) => i !== id)
        : [...prev, id]
    );
  };

  // 🔥 Toggle Logic (FIXED)
  const toggleStatus = (id: number) => {
    setData((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, active: !item.active }
          : item
      )
    );
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="min-w-[900px] w-full text-sm">

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
              <th className="p-3 text-left">Store Name</th>
              <th className="p-3 text-left">Total Sales</th>
              <th className="p-3 text-left">Rating</th>
              <th className="p-3 text-left">Total Products</th>
              <th className="p-3 text-left">Total Orders</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody>
            {currentData.map((item) => (
              <tr key={item.id} className="border-t border-gray-200 hover:bg-gray-50">

                {/* CHECKBOX */}
                <td className="p-3">
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(item.id)}
                    onChange={() => handleSelectOne(item.id)}
                  />
                </td>

                {/* STORE */}
                <td className="p-3">
                  <div>
                    <p className="font-medium text-gray-800">
                      {item.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {item.owner}
                    </p>
                  </div>
                </td>

                {/* SALES */}
                <td className="p-3 font-medium">
                  ${item.totalSales}
                </td>

                {/* RATING */}
                <td className="p-3 flex items-center gap-1 text-gray-600">
                  <Star size={14} className="fill-yellow-500 text-yellow-500" />
                  {item.rating}
                </td>

                {/* PRODUCTS */}
                <td className="p-3">{item.totalProducts}</td>

                {/* ORDERS */}
                <td className="p-3">{item.totalOrders}</td>

                {/* TOGGLE */}
                <td className="p-3">
                  <button
                    onClick={() => toggleStatus(item.id)}
                    className={`relative cursor-pointer inline-flex h-5 w-9 items-center rounded-full transition ${
                      item.active ? "bg-blue-600" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                        item.active ? "translate-x-4" : "translate-x-1"
                      }`}
                    />
                  </button>
                </td>

              </tr>
            ))}
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
          ← Previous
        </button>

        <span className="text-gray-500">
          Page {currentPage} of {totalPages}
        </span>

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
          className="px-3 py-1 border border-gray-200 cursor-pointer rounded-md disabled:opacity-50"
        >
          Next →
        </button>
      </div>

    </div>
  );
};

export default RecommendedStoreTable;