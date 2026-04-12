import { useState } from "react";
import SettingsTabs from "../../Components/AdminDashBoard/Settings/SettingsTabs";
import GeneralSettings from "../../Components/AdminDashBoard/Settings/GeneralSettings";
import SecuritySettings from "../../Components/AdminDashBoard/Settings/SecuritySettings";
import NotificationSettings from "../../Components/AdminDashBoard/Settings/NotificationSettings";


type TabType = "general" | "security" | "notifications";

const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState<TabType>("general");

  return (
    <div className="space-y-4">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-gray-700">Settings</h1>
        <p className="text-sm text-gray-600">
          Manage platform settings and preferences
        </p>
      </div>

      {/* Tabs */}
      <SettingsTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Content */}
      {activeTab === "general" && <GeneralSettings />}
      {activeTab === "security" && <SecuritySettings />}
      {activeTab === "notifications" && <NotificationSettings />}
    </div>
  );
};

export default AdminSettings;