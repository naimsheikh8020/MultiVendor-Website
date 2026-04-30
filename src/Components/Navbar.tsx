import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  Search,
  ChevronDown,
  User,
} from "lucide-react";
import { assets, categoryNames } from "../assets/assets";
import type { CategoryName } from "../assets/assets";
import { useCartStore } from "../store/cartStore";

import { useProfile } from "../features/auth/hooks/useProfile";
import { useAuthStore } from "../features/auth/store/auth.store";
import { API } from "../services/api"; // ✅ added

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryName | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const dropdownRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const itemCount = useCartStore((state) => state.getItemCount());

  const accessToken = useAuthStore((s) => s.accessToken);
  const refreshToken = useAuthStore((s) => s.refreshToken); // ✅ added
  const logout = useAuthStore((s) => s.logout);
  const isLoggedIn = !!accessToken;

  const { data: profile } = useProfile();

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

  const handleSearch = (e?: React.FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault();

    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  const handleViewProfile = () => {
    setIsProfileOpen(false);
    navigate("/my-profile");
  };

  // 🔥 UPDATED LOGOUT (API + LOCAL)
  const handleLogout = async () => {
    setIsProfileOpen(false);

    const { clearUserCart } = useCartStore.getState();
    clearUserCart();

    try {
      if (refreshToken) {
        await API.post("/api/v1/accounts/logout/", {
          refresh_token: refreshToken,
        });
      }
    } catch (error) {
      console.error("Logout API failed", error);
    } finally {
      logout(); // clear zustand
      navigate("/login");
    }
  };

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  return (
    <nav className="w-full bg-blue-50 border-b border-gray-100 relative z-50">
      <div className="w-full px-2 sm:px-4 md:px-6 lg:px-8 py-2 sm:py-3 md:py-4">
        <div className="flex items-center justify-between gap-2 sm:gap-3 md:gap-4">

          {/* LEFT */}
          <div className="shrink-0">
            <Link to="/">
              <img
                src={assets.logo}
                alt="logo"
                className="h-8 sm:h-10 md:h-12 lg:h-16 w-auto"
              />
            </Link>
          </div>

          {/* MIDDLE */}
          <div className="flex-1 max-w-3xl mx-2 sm:mx-3 md:mx-4">
            <form
              onSubmit={handleSearch}
              className="relative flex items-center w-full h-9 sm:h-10 md:h-11 lg:h-12 bg-white rounded-md shadow-sm"
            >
              {/* CATEGORY */}
              <div ref={dropdownRef} className="relative h-full">
                <div
                  onClick={() => setIsOpen((prev) => !prev)}
                  className="flex items-center gap-0.5 sm:gap-1 lg:gap-2 px-1.5 sm:px-2 lg:px-4 text-xs lg:text-sm text-gray-700 border-r border-gray-100 cursor-pointer h-full hover:bg-gray-50 whitespace-nowrap"
                >
                  <span className="hidden lg:inline">
                    {selectedCategory ?? "All Categories"}
                  </span>
                  <span className="lg:hidden text-[10px] sm:text-xs">
                    {selectedCategory
                      ? selectedCategory.slice(0, 6) + ".."
                      : "All"}
                  </span>
                  <ChevronDown
                    size={14}
                    className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
                  />
                </div>

                {isOpen && (
                  <div className="absolute top-full left-0 mt-2 w-56 lg:w-60 bg-white border border-gray-200 rounded-md shadow-lg z-100 max-h-96 overflow-y-auto">
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

              {/* INPUT */}
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 h-full px-2 sm:px-3 lg:px-4 text-xs sm:text-sm outline-none"
              />

              {/* BUTTON */}
              <button
                type="submit"
                className="h-full px-2 sm:px-3 md:px-4 lg:px-5 bg-blue-600 hover:bg-blue-700 transition-colors flex items-center justify-center rounded-r-md"
              >
                <Search size={16} className="text-white" />
              </button>
            </form>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4 lg:gap-6 shrink-0">

            {/* CART */}
            <div
              onClick={() => navigate("/cart")}
              className="relative flex items-center gap-2 text-gray-600 cursor-pointer hover:text-blue-700 transition-colors"
            >
              <div className="relative">
                <ShoppingCart size={20} />
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-[10px] font-medium w-4 h-4 rounded-full flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </div>
              <span className="hidden lg:inline text-sm">My Cart</span>
            </div>

            {/* PROFILE */}
            <div
              ref={profileRef}
              className="relative flex items-center gap-1 sm:gap-2 cursor-pointer"
              onClick={() => {
                if (isLoggedIn) {
                  setIsProfileOpen((prev) => !prev);
                } else {
                  navigate("/login");
                }
              }}
            >
              {isLoggedIn ? (
                <>
                  <img
                    src={
                      profile?.user?.avatar
                        ? `${profile.user.avatar}`
                        : "https://i.pravatar.cc/40"
                    }
                    alt="user"
                    className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 rounded-full ring-2 ring-gray-200"
                  />
                  <span className="hidden lg:inline text-sm font-medium text-gray-600">
                    {profile?.user?.full_name || "User"}
                  </span>
                  <ChevronDown
                    size={16}
                    className={`hidden md:inline transition-transform ${
                      isProfileOpen ? "rotate-180" : ""
                    }`}
                  />
                </>
              ) : (
                <>
                  <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 rounded-full ring-2 ring-gray-200 bg-gray-200 flex items-center justify-center">
                    <User size={16} className="text-gray-600" />
                  </div>
                  <span className="hidden lg:inline text-sm font-medium text-gray-600">
                    Guest
                  </span>
                </>
              )}

              {isLoggedIn && isProfileOpen && (
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
      </div>
    </nav>
  );
};

export default Navbar;