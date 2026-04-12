type PayoutStatus = "pending" | "approved" | "completed" | "rejected";

type PayoutRequestCardProps = {
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

const statusStyles = {
  pending: "bg-yellow-100 text-yellow-600",
  approved: "bg-blue-100 text-blue-600",
  completed: "bg-green-100 text-green-600",
  rejected: "bg-red-100 text-red-600",
};

const PayoutRequestCard = ({
  id,
  vendor,
  requestedAt,
  processedAt,
  totalBalance,
  amount,
  status,
  accountName,
  bankName,
  accountNumber,
  ifsc,
  note,
}: PayoutRequestCardProps) => {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      {/* Top */}
      <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
        <div>
          <h3 className="font-semibold text-gray-800">{id}</h3>
          <p className="text-sm text-gray-600">
            Vendor: <span className="font-medium">{vendor}</span>
          </p>
          <p className="text-sm text-gray-500">Requested: {requestedAt}</p>

          {processedAt && (
            <p className="text-sm text-gray-500">Processed: {processedAt}</p>
          )}
        </div>

        <div className="text-left sm:text-right">
          <p className="text-red-500 font-semibold">
            Total Balance: {totalBalance}
          </p>

          <p className="text-blue-600 text-lg font-semibold mt-1">{amount}</p>

          <span
            className={`inline-block mt-2 px-3 py-1 text-xs rounded-full font-medium capitalize ${statusStyles[status]}`}
          >
            {status}
          </span>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200 my-4" />

      {/* Bank Details */}
      <div className="grid sm:grid-cols-2 gap-3 text-sm text-gray-600">
        <div>
          <p>Account Name: {accountName}</p>
          <p>Bank Name: {bankName}</p>
          {note && <p>Note: {note}</p>}
        </div>

        <div>
          <p>Account Number: {accountNumber}</p>
          <p>IFSC Code: {ifsc}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 mt-4">
        {status === "pending" && (
          <>
            <button className="px-4 py-2 rounded-full bg-green-500 text-white text-sm font-medium hover:bg-green-600">
              Approve
            </button>
            <button className="px-4 py-2 rounded-full bg-red-500 text-white text-sm font-medium hover:bg-red-600">
              Reject
            </button>
          </>
        )}

        {status === "approved" && (
          <button className="px-4 py-2 rounded-full bg-blue-600 text-white text-sm font-medium hover:bg-blue-700">
            Mark as Completed
          </button>
        )}
      </div>
    </div>
  );
};

export default PayoutRequestCard;
