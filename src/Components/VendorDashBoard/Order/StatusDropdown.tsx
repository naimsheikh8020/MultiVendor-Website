import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const options = ["Pending", "Processing", "Shipped", "Delivered"];

type Props = {
  value: string;
  onChange: (val: string) => void;
};

const StatusDropdown = ({ value, onChange }: Props) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  // close on outside click
  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (!ref.current?.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref} >
      {/* BUTTON */}
      <button
        onClick={() => setOpen(!open)}
        className="
          flex items-center justify-between
          px-3 py-1.5 rounded-md border border-gray-200 bg-white
          text-xs text-gray-600
          focus:outline-none focus:ring-1 focus:ring-blue-500
          transition-all duration-200
          min-w-25
        "
      >
        <span>{value}</span>

        <ChevronDown
          size={14}
          className={`transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* DROPDOWN */}
      <div
        className={`
          absolute left-0 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-sm
          overflow-hidden origin-top z-20
          transition-all duration-150
          
          ${
            open
              ? "scale-100 opacity-100"
              : "scale-95 opacity-0 pointer-events-none"
          }
        `}
      >
        {options.map((item) => (
          <div
            key={item}
            onClick={() => {
              onChange(item);
              setOpen(false);
            }}
            className={`
              px-3 py-1.5 text-xs cursor-pointer transition-colors
              ${
                item === value
                  ? "bg-blue-50 text-blue-600 font-medium"
                  : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
              }
            `}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatusDropdown;