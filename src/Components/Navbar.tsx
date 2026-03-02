import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  Heart,
  Search,
  ChevronDown,
} from "lucide-react";
import { assets, categoryNames } from "../assets/assets";
import type { CategoryName } from "../assets/assets";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryName | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!dropdownRef.current?.contains(e.target as Node)) {
        setIsOpen(false);
      }
      if (!profileRef.current?.contains(e.target as Node)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (category: CategoryName | "All Categories") => {
    if (category === "All Categories") {
      setSelectedCategory(null);
      setIsOpen(false);
      navigate("/");
    } else {
      setSelectedCategory(category);
      setIsOpen(false);
      navigate(`/category/${category}`);
    }
  };

  const handleViewProfile = () => {
    setIsProfileOpen(false);
    navigate("/my-profile");
  };

  const handleLogout = () => {
    setIsProfileOpen(false);
    // Add your logout logic here
    console.log("Logging out...");
  };

  return (
    <nav className="w-full bg-blue-50 p-4 border-b border-gray-100">
      <div className="w-full  px-8 flex items-center justify-between">

        <div>
          <Link to="/"><img src={assets.logo} alt="logo" /></Link>
        </div>



        <div className="relative flex items-center w-2xl h-12 bg-white rounded-md shadow-sm">

          {/* Dropdown */}
          <div
            ref={dropdownRef}
            className="relative h-full z-50"
          >
            <div
              onClick={() => setIsOpen((prev) => !prev)}
              className="flex items-center gap-2 px-4 text-sm text-gray-700 border-r border-gray-100 cursor-pointer h-full hover:bg-gray-50"
            >
              <span>
                {selectedCategory ?? "All Categories"}
              </span>
              <ChevronDown
                size={16}
                className={`transition-transform ${isOpen ? "rotate-180" : ""
                  }`}
              />
            </div>

            {isOpen && (
              <div className="absolute top-full left-0 mt-2 w-60 bg-white border border-gray-200 rounded-md shadow-lg z-50 max-h-[50] overflow-y-auto">
                <div
                  onClick={() => handleSelect("All Categories")}
                  className="px-4 py-2 text-sm hover:bg-blue-50 cursor-pointer font-medium"
                >
                  All Categories
                </div>
                {categoryNames.map((category) => (
                  <div
                    key={category}
                    onClick={() => handleSelect(category)}
                    className="px-4 py-2 text-sm hover:bg-blue-50 cursor-pointer"
                  >
                    {category}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Search Input */}
          <input
            type="text"
            placeholder="Search for items..."
            className="flex-1  h-full px-4 text-sm outline-none"
          />

          <button className="h-full px-5 bg-blue-600 hover:bg-blue-700 flex items-center justify-center">
            <Search size={20} className="text-white" />
          </button>
        </div>



        {/* Right Section */}
        <div className="flex items-center gap-8">

          <div className="flex items-center gap-2 text-gray-600 cursor-pointer hover:text-blue-700">
            <Heart size={24} />
            <span>Wishlist</span>
          </div>

          <div className="relative flex items-center gap-2 text-gray-600 cursor-pointer hover:text-blue-700">
            <ShoppingCart size={24} />

            <span className="absolute -top-2 -left-2 bg-blue-600 text-white text-xs font-medium w-5 h-5 rounded-full flex items-center justify-center">
              3
            </span>

            <span>My Cart</span>
          </div>

          <div
            ref={profileRef}
            className="relative flex items-center gap-2 cursor-pointer"
            onClick={() => setIsProfileOpen((prev) => !prev)}
          >
            <img
              src="https://i.pravatar.cc/40"
              alt="user"
              className="w-10 h-10 rounded-full"
            />
            <span className="text-sm font-medium text-gray-600">
              Akash
            </span>
            <ChevronDown
              size={16}
              className={`transition-transform ${isProfileOpen ? "rotate-180" : ""}`}
            />

            {isProfileOpen && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    handleViewProfile();
                  }}
                  className="px-4 py-3 text-sm hover:bg-blue-50 cursor-pointer border-b border-gray-100"
                >
                  View Profile
                </div>
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLogout();
                  }}
                  className="px-4 py-3 text-sm hover:bg-red-50 hover:text-red-600 cursor-pointer"
                >
                  Log out
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;