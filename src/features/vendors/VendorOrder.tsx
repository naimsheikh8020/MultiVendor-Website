import { useState } from "react";
import { Search, ChevronDown } from "lucide-react";
import VendorOrderCard from "../../Components/VendorDashBoard/Order/VendorOrderCard";

const categories = ["All Category", "Pending", "Processing", "Shipped", "Delivered"];


const VendorOrder = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(categories[0]);
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="mb-1 text-lg sm:text-xl font-bold text-gray-700">
            Orders
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Manage your customer orders
          </p>
        </div>


      </div>

      {/* SEARCH + FILTER */}
      <div className="rounded-xl bg-white p-3 sm:p-4 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">

          {/* SEARCH INPUT */}
          <div className="relative w-full">
            <Search
              size={18}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search ..."
              className="
                w-full rounded-lg border border-gray-200 bg-white
                py-2 pl-10 pr-4 text-sm
                transition-all duration-200
                focus:outline-none focus:ring-2 focus:ring-blue-500
              "
            />
          </div>

          {/* CUSTOM DROPDOWN */}
          <div className="relative w-full sm:w-48">
            <button
              onClick={() => setOpen(!open)}
              className="
                w-full flex items-center justify-between
                px-4 py-2 rounded-lg border border-gray-200 bg-white
                text-sm text-gray-600
                focus:outline-none focus:ring-2 focus:ring-blue-500
                transition-all duration-200
              "
            >
              <span className="truncate">{selected}</span>

              <ChevronDown
                size={16}
                className={`transition-transform duration-200 ${open ? "rotate-180" : ""
                  }`}
              />
            </button>

            {/* DROPDOWN LIST */}
            <div
              className={`
                absolute left-0 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-md
                overflow-hidden origin-top z-20
                transition-all duration-200
                
                ${open
                  ? "scale-100 opacity-100"
                  : "scale-95 opacity-0 pointer-events-none"
                }
              `}
            >
              {categories.map((item) => (
                <div
                  key={item}
                  onClick={() => {
                    setSelected(item);
                    setOpen(false);
                  }}
                  className="
                    px-4 py-2 text-sm text-gray-600 cursor-pointer
                    hover:bg-blue-50 hover:text-blue-600
                    transition-colors
                  "
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Order List */}
      <VendorOrderCard />
    </div>
  )
}

export default VendorOrder
