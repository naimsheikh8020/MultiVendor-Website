import { useState } from "react";
import { assets } from "../../assets/assets";
import AdminPayoutCard from "../../Components/AdminDashBoard/AdminPayout/AdminPayoutCard";
import PayoutRequestCard from "../../Components/AdminDashBoard/AdminPayout/PayoutRequestCard";

type PayoutStatus = "pending" | "approved" | "completed" | "rejected";
const statuses: PayoutStatus[] = [
  "pending",
  "approved",
  "completed",
  "rejected",
];


type Payout = {
  id: string;
  vendor: string;
  requestedAt: string;
  processedAt?: string;
  totalBalance: string;
  amount: string;
  status: PayoutStatus;
  accountName: string;
  bankName: string;
  accountNumber: string;
  ifsc: string;
  note?: string;
};

const AdminPayout = () => {
  const [filter, setFilter] = useState<"all" | PayoutStatus>("all");

  const payouts: Payout[] = Array.from({ length: 20 }, (_, i) => {
  const status = statuses[i % statuses.length];

  return {
    id: `payout-${String(i + 1).padStart(3, "0")}`,
    vendor: `TechGear Pro ${i + 1}`,
    requestedAt: "10/02/2026, 16:00:00",
    processedAt:
      status === "completed" || status === "approved"
        ? "11/02/2026, 16:00:00"
        : undefined,
    totalBalance: "$20000.00",
    amount: `$${(1000 + i * 500).toFixed(2)}`,
    status,
    accountName: "John Smith",
    bankName: "Chase Bank",
    accountNumber: `****${(1000 + i).toString().slice(-4)}`,
    ifsc: "CHAS0001234",
    note: status === "pending" ? "Weekly payout request" : undefined,
  };
});

  // ✅ Filter logic
  const filteredPayouts =
    filter === "all"
      ? payouts
      : payouts.filter((p) => p.status === filter);

  // ✅ Tab list (no duplication)
  const tabs: ("all" | PayoutStatus)[] = [
    "all",
    "pending",
    "approved",
    "completed",
    "rejected",
  ];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="mb-1 text-lg sm:text-xl font-bold text-gray-700">
            Payout Management
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Manage vendor payout requests
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <AdminPayoutCard
          icon={assets.adminpayoutclock}
          value="$15000.00"
          title="Pending Payouts"
          subtitle="1 requests"
        />

        <AdminPayoutCard
          icon={assets.adminpayoutgreen}
          value="$30000.00"
          title="Completed Payouts"
          subtitle="This month"
        />

        <AdminPayoutCard
          icon={assets.adminpayoutblue}
          value="3"
          title="Total Requests"
          subtitle="All time"
        />
      </div>

      {/* 🔥 Filter Tabs */}
      <div className="flex gap-2 bg-gray-100 p-1 rounded-xl w-fit">
        {tabs.map((item) => (
          <button
            key={item}
            onClick={() => setFilter(item)}
            className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all
              ${
                filter === item
                  ? "bg-blue-600 text-white shadow"
                  : "text-gray-600 hover:bg-gray-200"
              }`}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Payout Requests */}
      <div className="space-y-4">
        {filteredPayouts.length > 0 ? (
          filteredPayouts.map((payout) => (
            <PayoutRequestCard key={payout.id} {...payout} />
          ))
        ) : (
          <div className="text-center text-gray-500 py-10">
            No payouts found
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPayout;