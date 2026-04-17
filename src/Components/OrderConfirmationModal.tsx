import { X, ShoppingBag } from "lucide-react"

interface OrderConfirmationModalProps {
  isOpen: boolean
  total: number
  itemCount: number
  onConfirm: () => void
  onCancel: () => void
  isLoading?: boolean
}

const OrderConfirmationModal = ({
  isOpen,
  total,
  itemCount,
  onConfirm,
  onCancel,
  isLoading = false,
}: OrderConfirmationModalProps) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
        >
          <X size={24} />
        </button>

        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
            <ShoppingBag size={32} className="text-blue-600" />
          </div>
        </div>

        {/* Header */}
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
          Confirm Order
        </h2>

        {/* Details */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Number of Items</span>
              <span className="font-semibold text-gray-900">{itemCount}</span>
            </div>
            <div className="border-t border-gray-200 pt-3 flex justify-between">
              <span className="text-gray-900 font-semibold">Order Total</span>
              <span className="text-2xl font-bold text-blue-600">
                ${total.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Message */}
        <p className="text-center text-sm text-gray-600 mb-6">
          Are you sure you want to place this order? You will be able to track it in your orders section.
        </p>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="flex-1 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Processing...
              </>
            ) : (
              "Place Order"
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default OrderConfirmationModal
