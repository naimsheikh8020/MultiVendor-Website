import { X, Info } from "lucide-react";
import { useEffect, useState } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const VendorRequestPayoutModal: React.FC<Props> = ({
  isOpen,
  onClose,
}) => {
  const [amount, setAmount] = useState("");

  // ✅ Close on ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  // ✅ Reset input whenever modal closes
  useEffect(() => {
    if (!isOpen) {
      setAmount("");
    }
  }, [isOpen]);

  // ✅ Handle submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!amount) return;

    console.log("Submitted amount:", amount);

    // 👉 API call here

    onClose(); // close modal
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ${
        isOpen ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
    >
      {/* BACKDROP */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
      />

      {/* MODAL */}
      <div
        className={`relative w-full max-w-md mx-4 bg-white rounded-2xl shadow-xl p-6 transform transition-all duration-300 ${
          isOpen
            ? "scale-100 translate-y-0 opacity-100"
            : "scale-95 translate-y-4 opacity-0"
        }`}
      >
        {/* HEADER */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">
            Request Payout
          </h2>
          <button onClick={onClose}>
            <X className="w-5 h-5 text-gray-500 hover:text-black cursor-pointer" />
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit}>
          
          {/* BALANCE */}
          <div className="mb-4">
            <p className="text-sm text-gray-500">Available Balance</p>
            <p className="text-2xl font-bold text-green-600">
              $25000.00
            </p>
          </div>

          {/* INPUT */}
          <div className="mb-2">
            <label className="text-sm text-gray-600">
              Payout Amount
            </label>
            <input
              type="number"
              value={amount} // ✅ controlled input
              onChange={(e) => setAmount(e.target.value)}
              placeholder="$25000.00"
              className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <p className="text-xs text-gray-400 mt-1">
              Minimum: $100 | Maximum: $25000.00
            </p>
          </div>

          {/* INFO BOX */}
          <div className="flex gap-2 items-start bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-700 mt-4">
            <Info className="w-4 h-4 mt-0.5" />
            <p>
              Payouts are processed weekly on Mondays. Funds will be
              transferred to your registered bank account.
            </p>
          </div>

          {/* ACTIONS */}
          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-full cursor-pointer border border-red-400 text-red-500 hover:bg-red-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-5 py-2 cursor-pointer rounded-full bg-blue-600 text-white hover:bg-blue-700"
            >
              Submit Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VendorRequestPayoutModal;