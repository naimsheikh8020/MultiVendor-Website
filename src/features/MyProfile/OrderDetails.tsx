import { useState } from "react"
import { ArrowLeft, MessageCircle, Send, X } from "lucide-react"
import { useNavigate, useParams } from "react-router"
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
  shippingFee?: string
  subtotal?: string
  discount?: string
  tax?: string
  paymentMethod?: string
}

const orders: Order[] = [
  {
    id: "ord-001",
    date: "1/15/2026",
    total: "$459.98",
    status: "Delivered",
    address: "123 Main Street, Apt 4B, New York, NY 10001",
    shippingFee: "$0.00",
    subtotal: "$459.98",
    discount: "$12.00",
    tax: "$0.05",
    paymentMethod: "COD",
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
    shippingFee: "$0.00",
    subtotal: "$299.50",
    discount: "$0.00",
    tax: "$0.00",
    paymentMethod: "Card",
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

const getStatusTimeline = (status: string) => {
  const timeline = [
    { step: "Processing", completed: false },
    { step: "Shipped", completed: false },
    { step: "Delivered", completed: false },
  ]

  if (status === "Processing") {
    timeline[0].completed = true
  } else if (status === "Shipped") {
    timeline[0].completed = true
    timeline[1].completed = true
  } else if (status === "Delivered") {
    timeline[0].completed = true
    timeline[1].completed = true
    timeline[2].completed = true
  }

  return timeline
}

const OrderDetails = () => {
  const navigate = useNavigate()
  const { orderId } = useParams()
 
  const [showChatModal, setShowChatModal] = useState(false)
  const [chatMessages, setChatMessages] = useState<{ id: string; text: string; sender: "user" | "seller"; timestamp: string }[]>([
    { id: "1", text: "Hi! I have a question about this product.", sender: "user", timestamp: "10:30 AM" },
    { id: "2", text: "Hello! How can I help you?", sender: "seller", timestamp: "10:31 AM" },
  ])
  const [messageInput, setMessageInput] = useState("")

  const order = orders.find((o) => o.id === orderId) || orders[0]
  const timeline = getStatusTimeline(order.status)

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const handleSendMessage = () => {
    if (messageInput.trim() === "") return

    const newMessage = {
      id: Date.now().toString(),
      text: messageInput,
      sender: "user" as const,
      timestamp: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
    }

    setChatMessages([...chatMessages, newMessage])
    setMessageInput("")

    // Simulate seller response
    setTimeout(() => {
      const sellerResponse = {
        id: (Date.now() + 1).toString(),
        text: "Thanks for your message! We'll get back to you soon.",
        sender: "seller" as const,
        timestamp: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
      }
      setChatMessages((prev) => [...prev, sellerResponse])
    }, 1000)
  }

  return (
    <div className="w-full px-4 md:px-6 py-6 ">
      {/* HEADER */}
      <button
        onClick={() => navigate("/my-profile")}
        className="flex items-center gap-2 text-gray-900 mb-6 hover:text-blue-600 transition"
      >
        <ArrowLeft size={20} />
        <h1 className="text-2xl font-bold">My Orders</h1>
      </button>

      {/* ORDER DETAILS SECTION */}
      <div className="bg-blue-50 rounded-xl p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Order Details
        </h2>

        <div className="space-y-2 text-sm">
          <p className="text-gray-600">
            <span className="font-medium">Package was delivered on</span>{" "}
            {formatDate(order.date)}
          </p>
          <p className="text-gray-600">
            <span className="font-medium">Standard delivery on</span>{" "}
            {formatDate(order.date)}
          </p>
          <p className="text-gray-600">
            <span className="font-medium">Order ID:</span> {order.id}
          </p>
        </div>
      </div>

      {/* PRODUCT CARDS */}
      <div className="space-y-4 mb-6">
        {order.items.map((item, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-xl p-6"
          >
            <div className="flex gap-4 items-start mb-6 flex-wrap sm:flex-nowrap">
              <img
                src={item.img}
                alt={item.name}
                className="w-24 h-24 rounded-lg object-cover"
              />

              <div className="flex-1">
                <p className="text-lg font-semibold text-gray-800">
                  {item.name}
                </p>
                <p className="text-sm text-gray-500 mb-2">In Sold</p>
                <p className="text-xl font-bold text-blue-600">{item.price}</p>
              </div>

              <div className="flex gap-2 w-full sm:w-auto">
                <button
                  onClick={() => setShowChatModal(true)}
                  className="flex-1 sm:flex-none px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition flex items-center justify-center gap-2"
                >
                  <MessageCircle size={16} />
                  Chat with seller
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* TIMELINE */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
        <div className="flex justify-between items-center mb-8">
          {timeline.map((item, index) => (
            <div key={index} className="flex flex-col items-center flex-1">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${item.completed
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-400"
                  }`}
              >
                ✓
              </div>
              <p className="text-sm text-center">{item.step}</p>
            </div>
          ))}
        </div>

        {/* STATUS MESSAGES */}
        <div className="space-y-4 text-sm">
          <div className="flex gap-2">
            <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0">
              ✓
            </div>
            <div>
              <p className="font-medium text-gray-800">
                Thank you for shopping! Your order is being processed.
              </p>
              <p className="text-gray-500 text-xs mt-1">
                24 Mar 2024 · 13:59
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0">
              ✓
            </div>
            <div>
              <p className="font-medium text-gray-800">Shipped</p>
              <p className="text-gray-500 text-xs mt-1">
                Your package is on its way! Our last will actively monitor
                delivery. 27 Mar 2024 · 11:55
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0">
              ✓
            </div>
            <div>
              <p className="font-medium text-gray-800">Out for Delivery</p>
              <p className="text-gray-500 text-xs mt-1">
                Our delivery partner is out to deliver your package today
                28 Mar 2024 · 13:59
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0">
              ✓
            </div>
            <div>
              <p className="font-medium text-gray-800">Delivered</p>
              <p className="text-gray-500 text-xs mt-1">
                Your package has been delivered! Customer
                29 Mar 2024 · 13:59
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ADDRESSES */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* SHIPPING ADDRESS */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-gray-800">Shipping Address</h3>
            <button className="text-blue-600 text-sm hover:underline">
              Details
            </button>
          </div>
          <p className="text-sm font-medium text-gray-800 mb-1">John Doe</p>
          <p className="text-sm text-gray-600">123 Main Street, Apt 4B</p>
          <p className="text-sm text-gray-600">New York, NY 10001</p>
          <p className="text-sm text-gray-600 mt-2">Phone: +1 234 567 8900</p>
        </div>

        {/* BILLING ADDRESS */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-gray-800">Billing Address</h3>
            <button className="text-blue-600 text-sm hover:underline">
              Details
            </button>
          </div>
          <p className="text-sm font-medium text-gray-800 mb-1">John Doe</p>
          <p className="text-sm text-gray-600">456 Oak Avenue</p>
          <p className="text-sm text-gray-600">New York, NY 10001</p>
          <p className="text-sm text-gray-600 mt-2">Phone: +1 234 567 8900</p>
        </div>
      </div>

      {/* TOTAL SUMMARY */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h3 className="font-semibold text-gray-800 mb-4">Total Summary</h3>

        <div className="space-y-3 text-sm">
          <div className="flex justify-between text-gray-600">
            <span>Shipping fee</span>
            <span>{order.shippingFee || "$0.00"}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Sub total</span>
            <span>{order.subtotal || order.total}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Discount</span>
            <span>{order.discount || "$0.00"}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Tax</span>
            <span>{order.tax || "$0.00"}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Payment Method</span>
            <span>{order.paymentMethod || "COD"}</span>
          </div>

          <div className="pt-3 border-t border-gray-200 flex justify-between font-bold text-lg">
            <span>Total</span>
            <span className="text-blue-600">{order.total}</span>
          </div>
        </div>
      </div>

      {/* CHAT MODAL */}
      {showChatModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-white rounded-xl w-full max-w-md h-[600px] flex flex-col shadow-2xl">
            {/* HEADER */}
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">Chat with Seller</h3>
              <button
                onClick={() => setShowChatModal(false)}
                className="p-1 hover:bg-gray-100 rounded-full transition"
              >
                <X size={20} />
              </button>
            </div>

            {/* MESSAGES */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {chatMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-lg ${msg.sender === "user"
                        ? "bg-blue-600 text-white rounded-br-none"
                        : "bg-gray-100 text-gray-800 rounded-bl-none"
                      }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                    <p className={`text-xs mt-1 ${msg.sender === "user" ? "text-blue-100" : "text-gray-500"}`}>
                      {msg.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* INPUT */}
            <div className="p-4 border-t border-gray-200 flex gap-2">
              <input
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <button
                onClick={handleSendMessage}
                className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition flex items-center justify-center"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      )}

      
    </div>
  )
}

export default OrderDetails
