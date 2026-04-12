import { useState } from "react";
import { Bell } from "lucide-react";

type NotificationKey = "orders" | "vendors" | "reports";

type NotificationItem = {
  key: NotificationKey;
  title: string;
  description: string;
};

const notifications: NotificationItem[] = [
  {
    key: "orders",
    title: "New Order Notifications",
    description: "Get notified when new orders are placed",
  },
  {
    key: "vendors",
    title: "Vendor Registration",
    description: "Alert when new vendors register",
  },
  {
    key: "reports",
    title: "Email Reports",
    description: "Receive daily/weekly reports via email",
  },
];

const NotificationSettings = () => {
  const [settings, setSettings] = useState<Record<NotificationKey, boolean>>({
    orders: true,
    vendors: true,
    reports: true,
  });

  const toggleSetting = (key: NotificationKey) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex items-center gap-2">
        <Bell className="w-5 h-5 text-blue-600" />
        <h2 className="text-base font-semibold text-gray-700">
          Notifications
        </h2>
      </div>

      {/* Card */}
      <div className="bg-white p-6 sm:p-8 rounded-xl border border-gray-200 space-y-4">
        
        {notifications.map((item) => (
          <div
            key={item.key}
            className="flex items-center justify-between bg-blue-50 px-5 py-4 rounded-lg"
          >
            
            {/* Text */}
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-700">
                {item.title}
              </p>
              <p className="text-xs text-gray-500">
                {item.description}
              </p>
            </div>

            {/* Toggle */}
            <button
              onClick={() => toggleSetting(item.key)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition cursor-pointer
                ${settings[item.key] ? "bg-blue-600" : "bg-gray-300"}`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition
                  ${settings[item.key] ? "translate-x-6" : "translate-x-1"}`}
              />
            </button>
          </div>
        ))}

      </div>
    </div>
  );
};

export default NotificationSettings;