import { useState } from "react";
import { Plus, Search, ChevronDown } from "lucide-react";
import PrimaryButton from "../../Components/PrimaryButton";
import VendorProductTable from "../../Components/VendorDashBoard/Products/VendorProductTable";
import VendorAddProductModal from "../../Components/VendorDashBoard/Products/VendorAddProductModal";

const categories: string[] = ["All Category", "Electronics", "Clothing"];

const VendorProduct = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>(categories[0]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <div className="space-y-4">
      
      {/* HEADER */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="mb-1 text-lg sm:text-xl font-bold text-gray-700">
            Products
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Manage your product inventory
          </p>
        </div>

        <PrimaryButton
          label="Add Product"
          icon={<Plus />}
          onClick={() => setIsModalOpen(true)}
          className="w-full sm:w-auto"
        />
      </div>

      {/* SEARCH + FILTER */}
      <div className="rounded-xl bg-white p-3 sm:p-4 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          
          {/* SEARCH */}
          <div className="relative w-full">
            <Search
              size={18}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search ..."
              className="w-full rounded-lg border border-gray-200 bg-white py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* DROPDOWN */}
          <div className="relative w-full sm:w-48">
            <button
              onClick={() => setOpen((prev) => !prev)}
              className="w-full flex items-center justify-between px-4 py-2 rounded-lg border border-gray-200 bg-white text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <span className="truncate">{selected}</span>
              <ChevronDown
                size={16}
                className={`transition-transform ${
                  open ? "rotate-180" : ""
                }`}
              />
            </button>

            <div
              className={`absolute left-0 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-md z-20 transition-all ${
                open
                  ? "scale-100 opacity-100"
                  : "scale-95 opacity-0 pointer-events-none"
              }`}
            >
              {categories.map((item) => (
                <div
                  key={item}
                  onClick={() => {
                    setSelected(item);
                    setOpen(false);
                  }}
                  className="px-4 py-2 text-sm text-gray-600 cursor-pointer hover:bg-blue-50 hover:text-blue-600"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* TABLE */}
      <VendorProductTable />

      {/* MODAL */}
      {isModalOpen && (
        <VendorAddProductModal onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};

export default VendorProduct;