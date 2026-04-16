import { useState } from "react";
import { ChevronDown, Search } from "lucide-react";

type Tab = "products" | "categories" | "profile";

interface Props {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
  setSelectedCategory: (category: string | null) => void; // 🔥 added
}

const categories = [
  "All",
  "Men's Fashion",
  "Women's Fashion",
  "Electronics",
  "Home & Living",
];

const StoreNav = ({
  activeTab,
  setActiveTab,
  setSelectedCategory,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const tabClass = (tab: Tab) =>
    `px-4 md:px-5 py-2 rounded-lg cursor-pointer text-sm md:text-base font-medium transition ${
      activeTab === tab
        ? "bg-white shadow-sm text-gray-800"
        : "text-gray-500 hover:text-gray-700"
    }`;

  return (
    <div className="max-w-7xl mx-auto px-4 mt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">

      {/* LEFT */}
      <div className="flex items-center bg-blue-50 border border-gray-200 rounded-xl p-1 shadow-sm w-full md:w-auto">

        {/* Products */}
        <button
          onClick={() => {
            setActiveTab("products");
            setSelectedCategory(null); // 🔥 reset filter
            setIsOpen(false);
          }}
          className={tabClass("products")}
        >
          All Product
        </button>

        {/* Categories */}
        <div className="relative">
          <button
            onClick={() => {
              setActiveTab("categories");
              setIsOpen((prev) => !prev);
            }}
            className={`${tabClass("categories")} flex items-center gap-1`}
          >
            Categories
            <ChevronDown
              size={16}
              className={`transition ${isOpen ? "rotate-180" : ""}`}
            />
          </button>

          {isOpen && (
            <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
              {categories.map((cat, i) => (
                <div
                  key={i}
                  className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setSelectedCategory(cat === "All" ? null : cat); // 🔥 main logic
                    setActiveTab("products"); // 🔥 go back to products
                    setIsOpen(false);
                  }}
                >
                  {cat}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Profile */}
        <button
          onClick={() => {
            setActiveTab("profile");
            setIsOpen(false);
          }}
          className={tabClass("profile")}
        >
          Profile
        </button>
      </div>

      {/* RIGHT */}
      <div className="flex items-center w-full md:w-[320px] bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        <input
          type="text"
          placeholder="Search for items..."
          className="flex-1 px-4 py-2.5 text-sm outline-none"
        />
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 flex items-center justify-center">
          <Search size={18} />
        </button>
      </div>
    </div>
  );
};

export default StoreNav;