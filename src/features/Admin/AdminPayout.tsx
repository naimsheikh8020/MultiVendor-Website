import  { assets } from "../../assets/assets";
import AdminPayoutCard from "../../Components/AdminDashBoard/AdminPayout/AdminPayoutCard";

const AdminPayout = () => {
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
      {/* Payout Card */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <AdminPayoutCard
          icon= {assets.adminpayoutclock}
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
    </div>
  );
};

export default AdminPayout;
