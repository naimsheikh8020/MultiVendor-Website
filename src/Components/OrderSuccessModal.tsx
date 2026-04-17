import { CheckCircle, X } from "lucide-react"

interface OrderSuccessModalProps {
  isOpen: boolean
  onClose: () => void
}

const OrderSuccessModal = ({ isOpen, onClose }: OrderSuccessModalProps) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full p-8 shadow-2xl text-center relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
        >
          <X size={24} />
        </button>

        {/* Success Icon */}
        <div className="flex justify-center mb-6 mt-4">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle size={40} className="text-green-600" />
          </div>
        </div>

        {/* Message */}
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Order Confirmed!
        </h2>
        <p className="text-gray-600 mb-8">
          Your order has been placed successfully. You can track it in your orders section.
        </p>

        {/* OK Button */}
        <button
          onClick={onClose}
          className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium"
        >
          OK
        </button>
      </div>
    </div>
  )
}

export default OrderSuccessModal
