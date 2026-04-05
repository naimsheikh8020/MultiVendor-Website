import { Info } from "lucide-react";

const WeeklyPayout = () => {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm text-gray-700 mt-6 shadow">
      
      {/* ICON */}
      <div className="mt-0.5">
        <Info className="h-5 w-5 text-blue-500" />
      </div>

      {/* TEXT */}
      <div>
        <p className="font-medium text-gray-900">
          Weekly Payout Schedule
        </p>
        <p className="mt-1 text-gray-600">
          Payouts are processed every Monday. Submit your payout request by{" "}
          <span className="font-medium text-gray-800">Sunday</span> to be included in the next week's batch. Funds typically arrive in 2–3 business days after processing.
        </p>
      </div>
    </div>
  );
};

export default WeeklyPayout;