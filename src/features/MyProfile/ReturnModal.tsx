import { X } from "lucide-react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  reason: string;
  setReason: (v: string) => void;
  reasons: string[];
  onSubmit: () => void;
};

const ReturnModal = ({
  isOpen,
  onClose,
  reason,
  setReason,
  reasons,
  onSubmit,
}: Props) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-6 max-w-md w-full">

        <div className="flex justify-between mb-4">
          <h3 className="font-bold">Return Product</h3>
          <button onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <select
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="w-full border border-gray-200 p-3 rounded"
        >
          <option value="">Select reason</option>
          {reasons.map((r) => (
            <option key={r}>{r}</option>
          ))}
        </select>

        <div className="flex gap-2 mt-4">
          <button onClick={onClose} className="flex-1 bg-gray-100 py-2 rounded">
            Cancel
          </button>
          <button onClick={onSubmit} className="flex-1 bg-red-600 text-white py-2 rounded">
            Submit
          </button>
        </div>

      </div>
    </div>
  );
};

export default ReturnModal;