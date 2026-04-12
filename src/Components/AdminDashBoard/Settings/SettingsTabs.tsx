import { Settings, Lock, Bell } from "lucide-react";

type TabType = "general" | "security" | "notifications";

type Props = {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
};

const tabs = [
  { key: "general", label: "General Settings", icon: Settings },
  { key: "security", label: "Security", icon: Lock },
  { key: "notifications", label: "Notifications", icon: Bell },
] as const;

const SettingsTabs = ({ activeTab, setActiveTab }: Props) => {
  return (
    <div className="w-full overflow-x-auto no-scrollbar">
      <div className="flex items-center gap-2 bg-white p-2 rounded-xl w-max">
        
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;

          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-lg text-sm sm:text-base font-medium whitespace-nowrap transition-all
                ${
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-600 hover:bg-gray-100"
                }
              `}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {tab.label}
            </button>
          );
        })}

      </div>
    </div>
  );
};

export default SettingsTabs;