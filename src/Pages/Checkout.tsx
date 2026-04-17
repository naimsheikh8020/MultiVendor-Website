import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, MapPin, CreditCard, Trash2, X } from "lucide-react";
import { useCartStore } from "../store/cartStore";
import { assets } from "../assets/assets";
import OrderConfirmationModal from "../Components/OrderConfirmationModal";
import OrderSuccessModal from "../Components/OrderSuccessModal";

interface Address {
  id: number;
  name: string;
  street: string;
  city: string;
  phone: string;
  isDefault?: boolean;
}

const Checkout = () => {
  const navigate = useNavigate();
  const {
    items,
    removeItem,
    getSubtotal,
    getDiscount,
    getTax,
    getShippingFee,
    getTotal,
    clearCart,
  } = useCartStore();

  const [selectedAddress, setSelectedAddress] = useState(1);
  const [selectedPayment, setSelectedPayment] = useState("cod");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [newAddress, setNewAddress] = useState({
    name: "",
    street: "",
    city: "",
    phone: "",
  });

  // Mock addresses - replace with actual data from user profile/API
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: 1,
      name: "John Doe",
      street: "123 Main Street, Apt 48",
      city: "New York, NY 10001",
      phone: "+1 234 567 8900",
      isDefault: true,
    },
    {
      id: 2,
      name: "John Doe",
      street: "456 Oak Avenue",
      city: "Brooklyn, NY 11201",
      phone: "+1 234 567 8900",
    },
  ]);

  const handleAddAddress = () => {
    if (!newAddress.name || !newAddress.street || !newAddress.city || !newAddress.phone) {
      alert("Please fill in all fields");
      return;
    }

    const newAddr: Address = {
      id: addresses.length + 1,
      ...newAddress,
      isDefault: false,
    };

    setAddresses([...addresses, newAddr]);
    setSelectedAddress(newAddr.id);
    setIsModalOpen(false);
    setNewAddress({ name: "", street: "", city: "", phone: "" });
  };

  const handlePlaceOrder = () => {
    if (items.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    setIsConfirmationModalOpen(true);
  };

  const handleConfirmOrder = async () => {
    setIsProcessing(true);

    // Simulate API call delay
    setTimeout(() => {
      setIsProcessing(false);
      setIsConfirmationModalOpen(false);
      setIsSuccessModalOpen(true);
    }, 1500);
  };

  const handleSuccessModalClose = () => {
    clearCart();
    setIsSuccessModalOpen(false);
    navigate("/");
  };

  if (items.length === 0) {
    return (
      <div className="py-10 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Checkout</h1>
        <p className="text-gray-600 mb-6">Your cart is empty</p>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="py-6 md:py-10">
      {/* Header */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-900 mb-6 hover:text-blue-600 transition"
      >
        <ArrowLeft size={20} />
        <h1 className="text-2xl font-bold">Checkout</h1>
      </button>

      <div className="grid lg:grid-cols-[1fr_400px] gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Delivery Address */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="text-blue-600" size={20} />
              <h2 className="text-lg font-semibold text-gray-900">
                Delivery Address
              </h2>
            </div>

            <div className="space-y-3">
              {addresses.map((address) => (
                <div
                  key={address.id}
                  onClick={() => setSelectedAddress(address.id)}
                  className={`relative border rounded-lg p-4 cursor-pointer transition ${selectedAddress === address.id
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                    }`}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="radio"
                      checked={selectedAddress === address.id}
                      onChange={() => setSelectedAddress(address.id)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-gray-900">
                          {address.name}
                        </span>
                        {address.isDefault && (
                          <span className="text-xs bg-blue-600 text-white px-2 py-0.5 rounded">
                            Default
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">{address.street}</p>
                      <p className="text-sm text-gray-600">{address.city}</p>
                      <p className="text-sm text-gray-600">
                        Phone: {address.phone}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="mt-4 text-blue-600 text-sm font-medium hover:underline flex items-center gap-1"
            >
              + Add New Address
            </button>
          </div>

          {/* Payment Method */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <CreditCard className="text-blue-600" size={20} />
              <h2 className="text-lg font-semibold text-gray-900">
                Payment Method
              </h2>
            </div>

            {/* Cash on Delivery */}
            <div
              onClick={() => setSelectedPayment("cod")}
              className={`border rounded-lg p-4 cursor-pointer transition mb-4 ${selectedPayment === "cod"
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 hover:border-gray-300"
                }`}
            >
              <div className="flex items-start gap-3">
                <input
                  type="radio"
                  checked={selectedPayment === "cod"}
                  onChange={() => setSelectedPayment("cod")}
                  className="mt-1"
                />
                <div>
                  <p className="font-semibold text-gray-900">
                    Cash on Delivery (COD)
                  </p>
                  <p className="text-sm text-gray-600">
                    Pay when you receive your order
                  </p>
                </div>
              </div>
            </div>

            {/* Payment Method Icons */}
            <div className="flex gap-3 mb-4">
              <div
                onClick={() => setSelectedPayment("mastercard")}
                className={`w-16 h-12 border rounded-lg flex items-center justify-center bg-white cursor-pointer transition ${selectedPayment === "mastercard"
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
                  }`}
              >
                <div className="flex gap-1">
                  <div className="w-4 h-4 bg-red-500 rounded-full opacity-80"></div>
                  <div className="w-4 h-4 bg-yellow-500 rounded-full opacity-80 -ml-2"></div>
                </div>
              </div>
              <div
                onClick={() => setSelectedPayment("card")}
                className={`w-16 h-12 border rounded-lg flex items-center justify-center bg-white cursor-pointer transition ${selectedPayment === "card"
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
                  }`}
              >
                <div className="text-pink-600 font-bold text-lg">💳</div>
              </div>
              <div
                onClick={() => setSelectedPayment("digital")}
                className={`w-16 h-12 border rounded-lg flex items-center justify-center bg-white cursor-pointer transition ${selectedPayment === "digital"
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
                  }`}
              >
                <div className="w-6 h-6 bg-red-500 rounded"></div>
              </div>
            </div>

          </div>

          {/* Order Items */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Order Items
            </h2>

            <div className="divide-y divide-gray-100">
              {items.map((item, index) => (
                <div key={item.id} className={`flex items-center gap-4 ${index !== 0 ? 'pt-3' : ''} ${index !== items.length - 1 ? 'pb-3' : ''}`}>
                  <div className="w-20 h-20 bg-yellow-100 rounded-lg overflow-hidden shrink-0">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 text-sm truncate">
                      {item.title}
                    </h3>
                    <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                    <p className="text-sm font-bold text-blue-600">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition shrink-0"
                    title="Remove item"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Order Summary */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 h-fit sticky top-4">
          <h3 className="text-xl font-bold text-gray-900 mb-6">
            Order Summary
          </h3>

          <div className="space-y-3 text-sm mb-6">
            <div className="flex justify-between">
              <span className="text-gray-600">Shipping fee</span>
              <span className="font-medium">
                ${getShippingFee().toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Sub total</span>
              <span className="font-medium">${getSubtotal().toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Discount</span>
              <span className="font-medium text-red-500">
                ${getDiscount().toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tax</span>
              <span className="font-medium">${getTax().toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Payment Method</span>
              <span className="font-medium">
                {selectedPayment === "cod" ? "COD" : "Card"}
              </span>
            </div>
          </div>

          {/* Total */}
          <div className="flex justify-between items-center mb-6 pt-4 border-t border-gray-200">
            <span className="text-lg font-bold text-gray-900">Total</span>
            <span className="text-2xl font-bold text-blue-600">
              ${getTotal().toFixed(2)}
            </span>
          </div>

          {/* Place Order Button */}
          <button
            onClick={handlePlaceOrder}
            className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition mb-3"
          >
            Place Order
          </button>

          <p className="text-xs text-center text-gray-500">
            By placing this order, you agree to our terms and conditions
          </p>
        </div>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 pt-12 border-t border-gray-200">
        <div className="flex items-start gap-4">
          <img
            src={assets.Best_Price}
            alt="Best Prices"
            className="w-12 h-12"
          />
          <div>
            <h4 className="font-semibold text-gray-900 mb-1">
              Best Prices & Deals
            </h4>
            <p className="text-sm text-gray-600">
              Don't miss our daily amazing deals and prices
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <img src={assets.Refund} alt="Refundable" className="w-12 h-12" />
          <div>
            <h4 className="font-semibold text-gray-900 mb-1">Refundable</h4>
            <p className="text-sm text-gray-600">
              If your items have damage we agree to refund it
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <img
            src={assets.Shipping}
            alt="Free delivery"
            className="w-12 h-12"
          />
          <div>
            <h4 className="font-semibold text-gray-900 mb-1">Free delivery</h4>
            <p className="text-sm text-gray-600">
              Do purchase over $50 and get free delivery anywhere
            </p>
          </div>
        </div>
      </div>

      {/* Add Address Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 relative">
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
            >
              <X size={24} />
            </button>

            {/* Modal Header */}
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Add New Address
            </h2>

            {/* Form */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={newAddress.name}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, name: e.target.value })
                  }
                  placeholder="John Doe"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Street Address
                </label>
                <input
                  type="text"
                  value={newAddress.street}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, street: e.target.value })
                  }
                  placeholder="123 Main Street, Apt 48"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City, State, ZIP
                </label>
                <input
                  type="text"
                  value={newAddress.city}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, city: e.target.value })
                  }
                  placeholder="New York, NY 10001"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={newAddress.phone}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, phone: e.target.value })
                  }
                  placeholder="+1 234 567 8900"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddAddress}
                  className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Add Address
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Order Confirmation Modal */}
      <OrderConfirmationModal
        isOpen={isConfirmationModalOpen}
        total={getTotal()}
        itemCount={items.length}
        onConfirm={handleConfirmOrder}
        onCancel={() => setIsConfirmationModalOpen(false)}
        isLoading={isProcessing}
      />

      {/* Order Success Modal */}
      <OrderSuccessModal
        isOpen={isSuccessModalOpen}
        onClose={handleSuccessModalClose}
      />
    </div>
  );
};

export default Checkout;
