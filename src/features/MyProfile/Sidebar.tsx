import {
  User,
  MapPin,
  CreditCard,
  Package,
  LogOut,
  Undo2,
  BanknoteX,
  PackageCheck
} from "lucide-react"

import type { LucideIcon } from "lucide-react"
import { useLogout } from "../auth/hooks/useLogout"
import { useAuthStore } from "../auth/store/auth.store"



type TabType = "profile" | "address" | "payment" | "orders" | "reviews" | "returns" | "cancel" | "receive"

interface SidebarProps {
  activeTab: TabType
  setActiveTab: (tab: TabType) => void
}

interface MenuItem {
  id: TabType
  label: string
  icon: LucideIcon
}

const Sidebar = ({ activeTab, setActiveTab }: SidebarProps) => {
  const menu: MenuItem[] = [
    { id: "profile", label: "My Profile", icon: User },
    { id: "address", label: "Address", icon: MapPin },
    { id: "payment", label: "My Payment Option", icon: CreditCard },
    { id: "orders", label: "My Orders", icon: Package },
    { id: "returns", label: "My Return", icon: Undo2 },
    { id: "cancel", label: "My Cancel", icon: BanknoteX },
    { id: "receive", label: "Receive Product", icon: PackageCheck },
  ]

  const { mutate: logoutMutate, isPending } = useLogout();
  const { refreshToken, logout } = useAuthStore();
  const handleLogout = () => {
    if (!refreshToken) {
      logout();
      return;
    }

    logoutMutate(refreshToken, {
      onSuccess: () => {
        logout();
        window.location.href = "/login"; 
      },
      onError: () => {
        logout();
        window.location.href = "/login";
      },
    });
  };
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex flex-col justify-between self-start sticky top-6 h-fit">
      <div>
        <p className="text-sm font-semibold text-gray-500 mb-4">
          Manage My Account
        </p>

        <div className="space-y-1">
          {menu.map((item) => {
            const Icon = item.icon

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm cursor-pointer transition ${activeTab === item.id
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
                  }`}
              >
                <Icon size={18} />
                {item.label}
              </button>
            )
          })}
        </div>
      </div>

      <button
        onClick={handleLogout}
        className="flex items-center justify-center cursor-pointer gap-2 mt-6 bg-red-50 text-red-500 rounded-lg py-2 text-sm hover:bg-red-100 transition"
      >
        <LogOut size={16} />
        {isPending ? "Logging out..." : "Logout"}
      </button>
    </div>
  )
}

export default Sidebar