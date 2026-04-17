import React from "react"
import { assets } from "../../assets/assets"

type OrderItem = {
  name: string
  price: string
  qty: number
  img: string
}

type Order = {
  id: string
  date: string
  total: string
  status: "Delivered" | "Shipped" | "Processing"
  address: string
  items: OrderItem[]
}

const orders: Order[] = [
  {
    id: "ord-001",
    date: "1/15/2026",
    total: "$459.98",
    status: "Delivered",
    address: "123 Main Street, Apt 4B, New York, NY 10001",
    items: [
      {
        name: "Premium Wireless Headphones",
        price: "$159.99",
        qty: 1,
        img: assets.HeadPhone,
      },
      {
        name: "Designer Leather Handbag",
        price: "$189.99",
        qty: 1,
        img: assets.redBag,
      },
      {
        name: "Casual Denim Jacket",
        price: "$79.99",
        qty: 1,
        img: assets.BlackJacket,
      },
    ],
  },
  {
    id: "ord-002",
    date: "2/20/2026",
    total: "$299.50",
    status: "Processing",
    address: "742 Evergreen Terrace, Springfield",
    items: [
      {
        name: "Sneakers",
        price: "$120.00",
        qty: 1,
        img: assets.BlackJacket,
      },
    ],
  },
]

const getStatusStyle = (status: Order["status"]) => {
  switch (status) {
    case "Delivered":
      return "bg-green-100 text-green-600"
    case "Shipped":
      return "bg-purple-100 text-purple-600"
    case "Processing":
      return "bg-yellow-100 text-yellow-600"
    default:
      return ""
  }
}

const RecentOrders: React.FC = () => {
  return (
    <div className="space-y-6">
      {orders.map((order) => (
        <div
          key={order.id}
          className="bg-white border border-gray-200 rounded-xl p-5"
        >
          {/* HEADER */}
          <div className="flex justify-between items-center mb-4 flex-wrap gap-4">
            <div className="flex gap-6 flex-wrap">
              <div>
                <p className="text-sm text-gray-500">Order ID</p>
                <p className="font-semibold">{order.id}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Order Date</p>
                <p className="font-semibold">{order.date}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Total</p>
                <p className="font-semibold text-blue-600">
                  {order.total}
                </p>
              </div>
            </div>

            {/* STATUS */}
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusStyle(
                order.status
              )}`}
            >
              {order.status}
            </span>
          </div>

          {/* PRODUCTS */}
          <div className="space-y-4">
            {order.items.map((item, index) => (
              <div
                key={index}
                className="flex gap-4 items-center flex-wrap sm:flex-nowrap"
              >
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />

                <div className="flex-1 min-w-[150px]">
                  <p className="font-medium text-gray-800">
                    {item.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    Qty: {item.qty}
                  </p>
                </div>

                <p className="text-blue-600 font-semibold">
                  {item.price}
                </p>
              </div>
            ))}
          </div>

          {/* ADDRESS */}
          <div className="mt-4 pt-4 border-t border-gray-200 text-sm text-gray-500">
            <p className="font-medium text-gray-700 mb-1">
              Delivery Address
            </p>
            <p>{order.address}</p>
          </div>

          {/* ACTIONS */}
          <div className="mt-4 flex gap-3 flex-wrap">
            
            <button className="px-4 py-2 border cursor-pointer border-red-500 text-red-500 rounded-full hover:bg-red-50 transition">
              Cancel Order
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default RecentOrders