import { assets } from "../../assets/assets"

type Order = {
  id: string
  date: string
  name: string
  brand: string
  qty: number
  price: number
  reason: string
  image: string
}

const orders: Order[] = [
  {
    id: "#626950294115381",
    date: "26 Mar 2024",
    name: "Red Bag",
    brand: "Mr.food",
    qty: 1,
    price: 159.99,
    reason: "Delivery address wrong",
    image: assets.redBag
  },
  {
    id: "#626950294115381",
    date: "26 Mar 2024",
    name: "Premium Wireless Headphones",
    brand: "Mr.food",
    qty: 1,
    price: 159.99,
    reason: "Delivery address wrong",
    image: assets.HeadPhone
  },
]

const CancelOrder = () => {
  return (
    <div className="">
      <div className=" bg-gray-50 rounded-lg border border-gray-200 p-4 md:p-6">
        
        {/* Title */}
        <h2 className="text-lg md:text-xl font-semibold mb-4">
          My Cancellations
        </h2>

        <div className="space-y-4">
          {orders.map((order, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm"
            >
              {/* Header */}
              <div className="text-sm text-gray-500 mb-3">
                <p>Requested on {order.date}</p>
                <p className="text-gray-400">Order {order.id}</p>
              </div>

              {/* Main Content */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                
                {/* Image */}
                <div className="w-20 h-20 shrink-0 bg-yellow-200 rounded-lg overflow-hidden">
                  <img
                    src={order.image}
                    alt={order.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Info */}
                <div className="flex-1">
                  <h3 className="font-medium text-gray-800">
                    {order.name}
                  </h3>

                  <p className="text-sm text-blue-500">
                    By {order.brand}
                  </p>

                  <p className="text-sm text-gray-600 mt-1">
                    Qty: {order.qty}
                  </p>

                  <p className="text-blue-600 font-semibold mt-1">
                    ${order.price.toFixed(2)}
                  </p>
                </div>

                {/* Status */}
                <div className="self-start sm:self-center">
                  <span className="bg-red-500 text-white text-xs px-4 py-1.5 rounded-full">
                    Cancelled
                  </span>
                </div>
              </div>

              {/* Reason */}
              <div className="mt-3 text-sm text-gray-600">
                <span className="font-medium">Reason:</span>{" "}
                {order.reason}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CancelOrder