import {
  LayoutDashboard,
  Box,
  Layers,
  ShoppingCart,
  DollarSign,
  Wallet,
  User,
  Store,
  LogOut,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { assets } from "../../assets/assets";

const menu = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/vendor/dashboard" },
  
  { name: "Products", icon: Box, path: "/vendor/products" },
  { name: "Category", icon: Layers, path: "/vendor/category" },
  { name: "Orders", icon: ShoppingCart, path: "/vendor/orders" },
  { name: "Earnings", icon: DollarSign, path: "/vendor/earnings" }, 
  { name: "Payouts", icon: Wallet, path: "/vendor/payouts" },
  { name: "Profile", icon: User, path: "/vendor/profiles" }, 
  { name: "Store Front", icon: Store, path: "/" },
];

const VendorSidebar: React.FC = () => {
  return (
    <aside className="w-65  border-r min-h-screen px-4 py-6 flex flex-col justify-between border-gray-200 shadow-sm bg-white">
      
      {/* TOP */}
      <div>
        <div className="flex items-center gap-4 mb-6">
          <img src={assets.Vendor_Plane} alt="" className="w-10 h-10" />
          <h2 className="text-xl font-bold text-gray-600">Vendor Panel</h2>
        </div>

        <nav className="flex flex-col gap-1 text-base">
          {menu.map((item, i) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={i}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "hover:bg-gray-100 text-gray-700"
                  }`
                }
              >
                <Icon size={18} />
                {item.name}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* BOTTOM */}
      <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition">
        <LogOut size={18} />
        Log Out
      </button>
    </aside>
  );
};

export default VendorSidebar;