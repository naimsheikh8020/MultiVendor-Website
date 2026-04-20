import { useCartStore } from "../store/cartStore";
import { Minus, Plus, Trash2, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { isAuthenticated } from "../utils/auth";
import { assets } from "../assets/assets";

const CartPage = () => {
  const navigate = useNavigate();
  const {
    items,
    incrementQuantity,
    decrementQuantity,
    removeItem,
    getSubtotal,
    getDiscount,
    getTax,
    getShippingFee,
    getTotal,
  } = useCartStore();

  const [couponCode, setCouponCode] = useState("");

  const handleApplyCoupon = () => {
    console.log("Applying coupon:", couponCode);
    // Add coupon logic here
  };

  const handleCheckout = () => {
    if (!isAuthenticated()) {
      toast.error("Please login to proceed with checkout");
      navigate("/login", { state: { from: "/cart" } });
      return;
    }
    navigate("/checkout");
  };

  if (items.length === 0) {
    return (
      <div className="py-10 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Shopping Cart</h1>
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
      <div className="mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 mb-4 hover:text-black transition"
        >
          <ArrowLeft size={18} />
          Shopping Cart
        </button>
      </div>

      <div className="grid lg:grid-cols-[1fr_400px] gap-6">
        {/* Cart Items */}
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-4"
            >
              {/* Product Image */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-yellow-100 rounded-lg overflow-hidden shrink-0">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Product Info */}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 text-sm sm:text-base truncate">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-500">
                  By <span className="text-blue-600">{item.author}</span>
                </p>

                {/* Quantity Controls */}
                <div className="flex items-center gap-3 mt-3">
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={() => decrementQuantity(item.id)}
                      className="p-2 hover:bg-gray-100 transition"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="px-4 text-sm font-medium">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => incrementQuantity(item.id)}
                      className="p-2 hover:bg-gray-100 transition"
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  {/* Price */}
                  <span className="text-blue-600 font-bold text-lg">
                    ${item.price.toFixed(2)}
                  </span>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeItem(item.id)}
                    className="ml-auto p-2 text-red-500 hover:bg-red-50 rounded-lg transition"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 h-fit sticky top-4">
          {/* Coupon Input */}
          <div className="flex gap-2 mb-6">
            <input
              type="text"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              placeholder="Enter Your Coupon"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
            />
            <button
              onClick={handleApplyCoupon}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition"
            >
              Apply
            </button>
          </div>

          {/* Order Summary */}
          <h3 className="text-xl font-bold text-gray-900 mb-4">
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
                -${getDiscount().toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tax</span>
              <span className="font-medium">${getTax().toFixed(2)}</span>
            </div>
          </div>

          {/* Total */}
          <div className="flex justify-between items-center mb-6 pt-4 border-t border-gray-200">
            <span className="text-lg font-bold text-gray-900">Total</span>
            <span className="text-2xl font-bold text-blue-600">
              ${getTotal().toFixed(2)}
            </span>
          </div>

          {/* Checkout Button */}
          <button
            onClick={handleCheckout}
            className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition mb-3"
          >
            Proceed to Checkout
          </button>

          {/* Continue Shopping */}
          <button
            onClick={() => navigate("/")}
            className="w-full py-3 text-blue-600 font-medium hover:bg-blue-50 transition rounded-lg"
          >
            Continue Shopping
          </button>
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
          <img
            src={assets.Refund}
            alt="Refundable"
            className="w-12 h-12"
          />
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
    </div>
  );
};

export default CartPage;
