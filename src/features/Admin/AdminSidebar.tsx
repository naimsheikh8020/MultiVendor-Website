import {
  LayoutDashboard,
  Users,
  UserPlus,
  Package,
  ShoppingCart,
  DollarSign,
  Store,
  BarChart3,
  Wallet,
  Settings,
  LogOut,
  X,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { assets } from "../../assets/assets";

const menu = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/admin/dashboard" },
  { name: "User", icon: Users, path: "/admin/users" },
  { name: "Vendor Request", icon: UserPlus, path: "/admin/vendor-requests" },
  { name: "Products", icon: Package, path: "/admin/product" },
  { name: "Orders", icon: ShoppingCart, path: "/admin/orders" },
  { name: "Commission", icon: DollarSign, path: "/admin/commission" },
  { name: "Recommended S", icon: Store, path: "/admin/recommended" },
  { name: "Analytics", icon: BarChart3, path: "/admin/analytics" },
  { name: "Payouts", icon: Wallet, path: "/admin/payouts" },
  { name: "Settings", icon: Settings, path: "/admin/settings" },
  { name: "My Shop", icon: Store, path: "/admin/my-shop" },
];

interface AdminSidebarProps {
  onClose?: () => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ onClose }) => {
  return (
    <aside className="w-64 border-r min-h-screen px-4 py-6 flex flex-col justify-between border-gray-200 shadow-sm bg-white">

      {/* TOP */}
      <div>
        {/* Header with Close Button for Mobile */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <img src={assets.Vendor_Plane} alt="" className="w-10 h-10" />
            <h2 className="text-xl font-bold text-gray-600">Vendor Panel</h2>
          </div>

          {/* Close button - only visible on mobile */}
          {onClose && (
            <button
              onClick={onClose}
              className="lg:hidden p-1 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Close sidebar"
            >
              <X size={20} />
            </button>
          )}
        </div>

        <nav className="flex flex-col gap-1 text-base">
          {menu.map((item, i) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={i}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition ${isActive
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

export default AdminSidebar;