import { useState } from "react";
import StatusDropdown from "./StatusDropdown";
import { assets } from "../../../assets/assets";

const VendorOrderCard = () => {
  const [orders, setOrders] = useState([
    {
      id: "ord-001",
      customer: "John Doe",
      date: "1/15/2026",
      total: "$159.99",
      status: "Pending",
      address: "123 Main Street, NY",
      phone: "+1 234 567 8900",
      items: [
        {
          name: "Premium Wireless Headphones",
          price: "$159.99",
          qty: 1,
          img: assets.HeadPhone,
        },
      ],
    },
    {
      id: "ord-002",
      customer: "Alice Smith",
      date: "2/10/2026",
      total: "$269.98",
      status: "Processing",
      address: "456 Park Avenue, NY",
      phone: "+1 987 654 3210",
      items: [
        {
          name: "Leather Handbag",
          price: "$189.99",
          qty: 1,
          img: assets.redBag,
        },
        {
          name: "Denim Jacket",
          price: "$79.99",
          qty: 1,
          img: assets.BlackJacket,
        },
      ],
    },
  ]);

  const updateStatus = (id: string, newStatus: string) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id ? { ...order, status: newStatus } : order
      )
    );
  };

  return (
    <div className="space-y-6">
      {orders.map((order) => (
        <div
          key={order.id}
          className="bg-white rounded-lg shadow p-5 space-y-6"
        >
          {/* Header */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Order ID</p>
              <p className="font-semibold">{order.id}</p>
            </div>

            <div>
              <p className="text-gray-500">Customer</p>
              <p className="font-semibold">{order.customer}</p>
            </div>

            <div>
              <p className="text-gray-500">Order Date</p>
              <p className="font-semibold">{order.date}</p>
            </div>

            <div className="text-right">
              <p className="text-gray-500">Total</p>
              <p className="font-semibold text-blue-600">
                {order.total}
              </p>
            </div>
          </div>

          {/* Items */}
          <div className="space-y-4">
            {order.items.map((item, i) => (
              <div key={i} className="flex gap-4 items-center">
                <img
                  src={item.img}
                  alt=""
                  className="w-14 h-14 rounded object-cover"
                />

                <div className="flex-1">
                  <p className="text-sm font-medium">
                    {item.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    Qty: {item.qty}
                  </p>
                  <p className="text-xs text-blue-600 font-medium">
                    {item.price}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <hr className="text-gray-200"/>

          {/* Address */}
          <div className="text-sm text-gray-600">
            <p className="font-medium text-gray-700">
              Delivery Address
            </p>
            <p>{order.address}</p>
            <p>Phone: {order.phone}</p>
          </div>

          {/* Footer */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 ">
                Status:
              </span>

              <StatusDropdown 
                
                value={order.status}
                onChange={(val) => updateStatus(order.id, val)}
              />
            </div>

            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm transition">
              Update Status
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VendorOrderCard;