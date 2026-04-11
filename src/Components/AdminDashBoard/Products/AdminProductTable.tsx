import { useState } from "react";
import { Eye, Trash2 } from "lucide-react";

type Product = {
  id: number;
  name: string;
  image: string;
  store: string;
  category: string;
  price: number;
  stock: number;
  status: "In Stock" | "Out of Stock";
};

type Props = {
  data: Product[];
};

const ITEMS_PER_PAGE = 10;

const AdminProductTable = ({ data }: Props) => {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  // 🔥 Pagination
  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentData = data.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // 🔥 Current page IDs
  const currentPageIds = currentData.map((item) => item.id);

  // 🔥 Check if all selected (current page only)
  const isAllSelected =
    currentPageIds.length > 0 &&
    currentPageIds.every((id) => selectedIds.includes(id));

  // 🔥 Select All
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

  // 🔥 Select One
  const handleSelectOne = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((i) => i !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      
      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="min-w-[800px] w-full text-sm">
          
          {/* HEADER */}
          <thead className="bg-gray-50 text-gray-500">
            <tr className="text-left">
              <th className="p-3 w-10">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  onChange={handleSelectAll}
                />
              </th>
              <th className="p-3">Product</th>
              <th className="p-3">Store</th>
              <th className="p-3">Category</th>
              <th className="p-3">Price</th>
              <th className="p-3">Stock</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-center w-28">Actions</th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody>
            {currentData.map((item) => {
              const isInStock = item.status === "In Stock";

              return (
                <tr key={item.id} className="border-t border-gray-200 align-middle hover:bg-gray-50">
                  
                  {/* CHECKBOX */}
                  <td className="p-3 w-10">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(item.id)}
                      onChange={() => handleSelectOne(item.id)}
                    />
                  </td>

                  {/* PRODUCT */}
                  <td className="p-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.image}
                        className="w-10 h-10 rounded-md object-cover "
                      />
                      <span className="font-medium text-gray-800">
                        {item.name}
                      </span>
                    </div>
                  </td>

                  {/* STORE */}
                  <td className="p-3 text-gray-600">{item.store}</td>

                  {/* CATEGORY */}
                  <td className="p-3 text-gray-600">{item.category}</td>

                  {/* PRICE */}
                  <td className="p-3 font-medium">${item.price}</td>

                  {/* STOCK */}
                  <td className="p-3">{item.stock}</td>

                  {/* STATUS */}
                  <td className="p-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        isInStock
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>

                  {/* ACTIONS */}
                  <td className="p-3">
                    <div className="flex items-center justify-center gap-2">
                      <button className="p-2 border border-gray-200 cursor-pointer rounded-md hover:bg-gray-100">
                        <Eye size={16} />
                      </button>
                      <button className="p-2 border border-gray-200 cursor-pointer rounded-md hover:bg-red-50">
                        <Trash2 size={16} className="text-red-500" />
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
      <div className="flex justify-between items-center p-4 border-t border-gray-200 text-base">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
          className="px-3 py-1 border rounded-md disabled:opacity-50"
        >
          Previous
        </button>

        <span className="text-gray-500">
          Page {currentPage} of {totalPages}
        </span>

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
          className="px-3 py-1 border rounded-md disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AdminProductTable;