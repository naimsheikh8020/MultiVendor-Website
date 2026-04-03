import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { dummyProducts } from "../../../assets/assets";

const ITEMS_PER_PAGE = 8;

const getPagination = (current: number, total: number) => {
  if (total <= 1) return [1];
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const delta = 1;
  const range: (number | string)[] = [];

  for (
    let i = Math.max(2, current - delta);
    i <= Math.min(total - 1, current + delta);
    i++
  ) {
    range.push(i);
  }

  if (current - delta > 2) {
    range.unshift("...");
  }

  if (current + delta < total - 1) {
    range.push("...");
  }

  if (total === 1) return [1];

  return [1, ...range, total].filter((v, i, arr) => arr.indexOf(v) === i);
};

const VendorProductTable = () => {
  const [selected, setSelected] = useState<number[]>([]);
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(dummyProducts.length / ITEMS_PER_PAGE);

  const currentData = dummyProducts.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const handleSelectAll = () => {
    if (selected.length === currentData.length) {
      setSelected([]);
    } else {
      setSelected(currentData.map((item) => item.id));
    }
  };

  const handleSelect = (id: number) => {
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((i) => i !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 w-full">

      {/* MOBILE CARD VIEW - Hidden on md and above */}
      <div className="block md:hidden">
        {/* Select All Header for Mobile */}
        <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-200 rounded-t-xl">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 cursor-pointer">
            <input
              type="checkbox"
              onChange={handleSelectAll}
              checked={
                selected.length === currentData.length &&
                currentData.length > 0
              }
              className="cursor-pointer w-4 h-4"
            />
            <span>Select All</span>
          </label>
          <span className="text-xs text-gray-500">
            {selected.length} selected
          </span>
        </div>

        {/* Cards */}
        <div className="divide-y divide-gray-200">
          {currentData.map((item) => (
            <div key={item.id} className="p-4 hover:bg-gray-50 transition-colors">
              {/* Card Header */}
              <div className="flex items-start gap-3 mb-3">
                <input
                  type="checkbox"
                  checked={selected.includes(item.id)}
                  onChange={() => handleSelect(item.id)}
                  className="cursor-pointer w-4 h-4 mt-1 shrink-0"
                />
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded-lg object-cover shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 text-sm mb-1">
                    {item.name}
                  </h3>
                  <p className="text-xs text-gray-500 mb-2">{item.category}</p>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-lg font-bold text-gray-900">
                      ${item.price}
                    </span>
                    <span className="px-2 py-0.5 text-xs rounded-full bg-green-100 text-green-600 font-medium">
                      {item.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Details */}
              <div className="grid grid-cols-3 gap-3 mb-3 pl-7">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Variants</p>
                  {item.variants ? (
                    <span className="text-xs px-2 py-1 rounded-full bg-purple-100 text-purple-600 font-medium inline-block">
                      {item.variants} variants
                    </span>
                  ) : (
                    <span className="text-xs text-gray-400">No variants</span>
                  )}
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Stock</p>
                  <p className="text-sm font-semibold text-gray-900">{item.stock}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Sell</p>
                  <p className="text-sm font-semibold text-gray-900">{item.sell || 0}</p>
                </div>
              </div>

              {/* Card Actions */}
              <div className="flex gap-2 pl-7">
                <button
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors text-sm font-medium text-blue-600 cursor-pointer"
                  aria-label="Edit product"
                >
                  <Pencil className="cursor-pointer" size={16} />
                  <span className="cursor-pointer">Edit</span>
                </button>
                <button
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-red-50 hover:border-red-300 transition-colors text-sm font-medium text-red-600 cursor-pointer"
                  aria-label="Delete product"
                >
                  <Trash2 className="cursor-pointer" size={16} />
                  <span className="cursor-pointer">Delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* DESKTOP TABLE VIEW - Hidden on mobile, shown on md and above */}
      <div className="hidden md:block overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        <table className="w-full text-sm border-collapse">

          {/* HEADER */}
          <thead className="bg-gray-50 text-gray-500 sticky top-0">
            <tr className="text-left border-b border-gray-200">
              <th className="px-3 sm:px-4 py-3 w-[40px] sm:w-[50px]">
                <input
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={
                    selected.length === currentData.length &&
                    currentData.length > 0
                  }
                  className="cursor-pointer w-4 h-4"
                />
              </th>

              <th className="px-3 sm:px-4 py-3 min-w-50 sm:min-w-55 font-semibold">Product</th>
              <th className="px-3 sm:px-4 py-3 min-w-37.5 sm:min-w-45 font-semibold">Category</th>
              <th className="px-3 sm:px-4 py-3 min-w-22.5 sm:w-25 font-semibold">Price</th>
              <th className="px-3 sm:px-4 py-3 min-w-30 sm:w-35 font-semibold">Variants</th>
              <th className="px-3 sm:px-4 py-3 min-w-17.5 sm:w-20 font-semibold">Stock</th>
              <th className="px-3 sm:px-4 py-3 min-w-17.5 sm:w-20 font-semibold">Sell</th>
              <th className="px-3 sm:px-4 py-3 min-w-25 sm:w-30 font-semibold">Status</th>
              <th className="px-3 sm:px-4 py-3 min-w-27.5 sm:w-30 text-center font-semibold">Actions</th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody>
            {currentData.map((item) => (
              <tr
                key={item.id}
                className="border-t border-gray-200 hover:bg-gray-50 transition-colors duration-150"
              >

                {/* CHECKBOX */}
                <td className="px-3 sm:px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selected.includes(item.id)}
                    onChange={() => handleSelect(item.id)}
                    className="cursor-pointer w-4 h-4"
                  />
                </td>

                {/* PRODUCT */}
                <td className="px-3 sm:px-4 py-3">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-10 h-10 rounded-lg object-cover shrink-0"
                    />
                    <span className="font-medium text-gray-700 text-xs sm:text-sm whitespace-nowrap">
                      {item.name}
                    </span>
                  </div>
                </td>

                <td className="px-3 sm:px-4 py-3 text-gray-600 text-xs sm:text-sm">
                  {item.category}
                </td>

                <td className="px-3 sm:px-4 py-3 font-semibold text-gray-900 text-xs sm:text-sm">
                  ${item.price}
                </td>

                <td className="px-3 sm:px-4 py-3">
                  {item.variants ? (
                    <span className="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-600 font-medium whitespace-nowrap">
                      {item.variants} variants
                    </span>
                  ) : (
                    <span className="text-gray-400 text-xs whitespace-nowrap">
                      No variants
                    </span>
                  )}
                </td>

                <td className="px-3 sm:px-4 py-3 text-gray-700 text-xs sm:text-sm font-medium">{item.stock}</td>

                <td className="px-3 sm:px-4 py-3 text-gray-700 text-xs sm:text-sm font-medium">{item.sell || 0}</td>

                <td className="px-3 sm:px-4 py-3">
                  <span className="px-2 sm:px-3 py-1 text-xs rounded-full bg-green-100 text-green-600 font-medium whitespace-nowrap inline-block">
                    {item.status}
                  </span>
                </td>

                {/* ACTIONS */}
                <td className="px-3 sm:px-4 py-3">
                  <div className="flex justify-center gap-1 sm:gap-2">
                    <button
                      className="p-1.5 sm:p-2 border border-gray-200 rounded-md hover:bg-blue-50 hover:border-blue-300 transition-colors duration-150 cursor-pointer"
                      aria-label="Edit product"
                    >
                      <Pencil size={16} className="text-blue-600" />
                    </button>
                    <button
                      className="p-1.5 sm:p-2 border border-gray-200 rounded-md hover:bg-red-50 hover:border-red-300 transition-colors duration-150 cursor-pointer"
                      aria-label="Delete product"
                    >
                      <Trash2 size={16} className="text-red-500" />
                    </button>
                  </div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-3 sm:px-4 py-3 sm:py-4 border-t border-gray-200 bg-gray-50">

        {/* PREV BUTTON */}
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium border border-gray-300 rounded-lg hover:bg-white hover:border-gray-400 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent transition-all duration-150 min-w-25 justify-center cursor-pointer"
        >
          <span>←</span>
          <span>Previous</span>
        </button>

        {/* PAGE NUMBERS */}
        <div className="flex flex-wrap justify-center items-center gap-1 sm:gap-2">
          {getPagination(page, totalPages).map((item, index) => {
            if (item === "...") {
              return (
                <span key={`ellipsis-${index}`} className="px-1 sm:px-2 text-gray-400 font-medium">
                  ...
                </span>
              );
            }

            return (
              <button
                key={`page-${item}`}
                onClick={() => setPage(item as number)}
                className={`min-w-8 sm:min-w-9 h-8 sm:h-9 px-2 sm:px-3 rounded-lg text-xs sm:text-sm font-medium transition-all duration-150 ${page === item
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100 hover:border-gray-400"
                  }`}
              >
                {String(item).padStart(2, '0')}
              </button>
            );
          })}
        </div>

        {/* NEXT BUTTON */}
        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium border border-gray-300 rounded-lg hover:bg-white hover:border-gray-400 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent transition-all duration-150 min-w-25 justify-center cursor-pointer"
        >
          <span>Next</span>
          <span>→</span>
        </button>
      </div>
    </div>
  );
};

export default VendorProductTable;