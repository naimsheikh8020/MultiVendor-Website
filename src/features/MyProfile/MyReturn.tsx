import React from "react"
import { assets } from "../../assets/assets"

type ReturnItem = {
  id: string
  date: string
  name: string
  brand: string
  qty: number
  price: number
  image: string
}

const returns: ReturnItem[] = [
  {
    id: "#626950294115381",
    date: "26 Mar 2024",
    name: "Premium Wireless Headphones",
    brand: "Mr.food",
    qty: 1,
    price: 159.99,
    image: assets.HeadPhone
  },
  {
    id: "#626950294115381",
    date: "26 Mar 2024",
    name: "Premium Wireless Headphones",
    brand: "Mr.food",
    qty: 1,
    price: 159.99,
    image: assets.HeadPhone
  },
]

const MyReturn = () => {
  return (
    <div className="">
      <div className=" bg-white rounded-lg border border-gray-200 p-4 md:p-6">
        
        {/* Title */}
        <h2 className="text-lg md:text-xl font-semibold mb-4">
          My Returns
        </h2>

        <div className="space-y-4">
          {returns.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm"
            >
              {/* Header */}
              <div className="text-sm text-gray-500 mb-3">
                <p>Return on {item.date}</p>
                <p className="text-gray-400">Order {item.id}</p>
              </div>

              {/* Content */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                
                {/* Image */}
                <div className="w-20 h-20 bg-yellow-200 rounded-lg overflow-hidden shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Info */}
                <div className="flex-1">
                  <h3 className="font-medium text-gray-800">
                    {item.name}
                  </h3>

                  <p className="text-sm text-blue-500">
                    By {item.brand}
                  </p>

                  <p className="text-sm text-gray-600 mt-1">
                    Qty: {item.qty}
                  </p>

                  <p className="text-blue-600 font-semibold mt-1">
                    ${item.price.toFixed(2)}
                  </p>
                </div>

                {/* Action Button */}
                <div className="self-start sm:self-center">
                  <span className="bg-green-200 text-green-700 text-sm px-4 py-1.5 rounded-full  transition">
                    Approve
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default MyReturn