import { CheckCircle, Clock } from "lucide-react";

export type PayoutStatus = "pending" | "completed";

export interface PayoutCardProps {
  id: string;
  amount: number;
  requestedAt: string;
  processedAt?: string;
  bankName: string;
  accountMasked: string;
  note?: string;
  status: PayoutStatus;
}

const statusConfig: Record<PayoutStatus, any> = {
  pending: {
    label: "Pending",
    icon: Clock,
    className: "bg-yellow-100 text-yellow-700",
    iconColor: "text-yellow-600",
  },
  completed: {
    label: "Completed",
    icon: CheckCircle,
    className: "bg-green-100 text-green-700",
    iconColor: "text-green-600",
  },
};

const PayoutCard: React.FC<PayoutCardProps> = ({
  id,
  amount,
  requestedAt,
  processedAt,
  bankName,
  accountMasked,
  note,
  status,
}) => {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      
      {/* TOP */}
      <div className="flex justify-between items-start">
        <div>
          <p className="font-semibold text-gray-900">{id}</p>
          <p className="text-sm text-gray-500">
            Requested: {requestedAt}
          </p>
          {processedAt && (
            <p className="text-sm text-gray-500">
              Processed: {processedAt}
            </p>
          )}
        </div>

        <div className="text-right">
          <p className="text-lg font-semibold text-blue-600">
            ${amount.toFixed(2)}
          </p>

          <div
            className={`mt-2 inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${config.className}`}
          >
            <Icon className={`h-3.5 w-3.5 ${config.iconColor}`} />
            {config.label}
          </div>
        </div>
      </div>

      {/* DIVIDER */}
      <div className="my-4 border-t border-gray-100" />

      {/* BOTTOM */}
      <div className="text-sm text-gray-600 space-y-1">
        <p>
          <span className="text-gray-500">Bank Details:</span>
        </p>
        <p>
          {bankName} - {accountMasked}
        </p>
        {note && (
          <p>
            <span className="text-gray-500">Note:</span> {note}
          </p>
        )}
      </div>
    </div>
  );
};

export default PayoutCard;