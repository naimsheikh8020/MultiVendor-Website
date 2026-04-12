import { useEffect, useState } from "react";

import UserTabs from "../../Components/AdminDashBoard/AdminUser/UserTabs";
import FilterBar from "../../Components/FilterBar";
import UserTable from "../../Components/AdminDashBoard/AdminUser/UserTable";
// import Pagination from "../../Components/AdminDashBoard/AdminUser/Pagination";
import { customers, vendors } from "./mockData";

const AdminUser = () => {
  const [tab, setTab] = useState<"vendors" | "customers">("vendors");
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1); // 🔥 reset page when switching tab
  }, [tab]);

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-bold text-gray-700">User Management</h1>
        <p className="text-sm text-gray-500">Manage vendors and customers</p>
      </div>

      <UserTabs active={tab} onChange={setTab} />

      <FilterBar
        filters={[{ key: "Status", options: ["Approved", "Pending"] }]}
      />

      <UserTable
        type={tab}
        vendors={vendors}
        customers={customers}
        page={page}
        setPage={setPage}
      />
    </div>
  );
};

export default AdminUser;
