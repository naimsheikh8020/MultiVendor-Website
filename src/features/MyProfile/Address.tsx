import { MapPin, Plus } from "lucide-react"

const Address = () => {
  const addresses = [
    {
      id: 1,
      name: "Akash",
      phone: "+1 234 567 8900",
      address:
        "123 Main Street, Apartment 4B, New York, NY 10001, United States",
      type: "Home"
    },
    {
      id: 2,
      name: "Akash",
      phone: "+1 234 567 8900",
      address:
        "456 Market Street, Floor 2, San Francisco, CA 94103, United States",
      type: "Office"
    }
  ]

  return (
    <div className="bg-white border rounded-xl p-6">

      <div className="flex items-center justify-between mb-6">
        <h2 className="font-semibold text-gray-800">
          Saved Addresses
        </h2>

        <button className="flex items-center gap-2 text-sm text-blue-600 hover:underline">
          <Plus size={16} />
          Add Address
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">

        {addresses.map((item) => (
          <div
            key={item.id}
            className="border rounded-lg p-4 flex flex-col gap-3"
          >
            <div className="flex items-center justify-between">

              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-gray-500" />
                <span className="text-sm font-medium">
                  {item.type}
                </span>
              </div>

              <button className="text-sm text-blue-600 hover:underline">
                Edit
              </button>

            </div>

            <div className="text-sm text-gray-700 space-y-1">

              <p className="font-medium">{item.name}</p>

              <p className="text-gray-500">{item.phone}</p>

              <p className="text-gray-600">
                {item.address}
              </p>

            </div>

          </div>
        ))}

      </div>

    </div>
  )
}

export default Address