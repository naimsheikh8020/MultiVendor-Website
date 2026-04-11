import { useState } from "react";
import { Search, ChevronDown } from "lucide-react";

type FilterOption = {
  key: string;
  options: string[];
};

type FilterBarProps = {
  filters?: FilterOption[];
  showSearch?: boolean;
  onSearch?: (value: string) => void;
  onFilterChange?: (key: string, value: string) => void;
};

export default function FilterBar({
  filters = [],
  showSearch = true,
  onSearch,
  onFilterChange,
}: FilterBarProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [selected, setSelected] = useState<Record<string, string>>({});

  const handleSelect = (key: string, value: string) => {
    setSelected((prev) => ({ ...prev, [key]: value }));
    onFilterChange?.(key, value);
    setOpenIndex(null);
  };

  return (
    <div className="rounded-xl bg-white p-3 sm:p-4 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">

        {/* SEARCH */}
        {showSearch && (
          <div className="relative w-full">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search..."
              onChange={(e) => onSearch?.(e.target.value)}
              className="w-full rounded-lg border border-gray-200 bg-white py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}

        {/* DYNAMIC DROPDOWNS */}
        {filters.map((filter, index) => (
          <div key={filter.key} className="relative w-full sm:w-48">
            <button
              onClick={() =>
                setOpenIndex(openIndex === index ? null : index)
              }
              className="w-full flex items-center justify-between px-4 py-2 rounded-lg border border-gray-200 bg-white text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <span className="truncate">
                {selected[filter.key] || filter.key}
              </span>

              <ChevronDown
                size={16}
                className={`transition-transform ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* DROPDOWN */}
            <div
              className={`absolute left-0 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-md z-20 transition-all ${
                openIndex === index
                  ? "scale-100 opacity-100"
                  : "scale-95 opacity-0 pointer-events-none"
              }`}
            >
              {filter.options.map((item) => (
                <div
                  key={item}
                  onClick={() => handleSelect(filter.key, item)}
                  className="px-4 py-2 text-sm text-gray-600 cursor-pointer hover:bg-blue-50 hover:text-blue-600"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}