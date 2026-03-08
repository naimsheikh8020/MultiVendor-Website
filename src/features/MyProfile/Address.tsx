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
    },
    {
      id: 2,
      name: "Akash",
      phone: "+1 234 567 8900",
      address:
        "456 Market Street, Floor 2, San Francisco, CA 94103, United States",
      type: "Office"
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
    <div className="bg-white border border-gray-100 shadow-sm rounded-xl p-6">

      <div className="flex items-center justify-between mb-6">
        <h2 className="font-bold text-2xl text-gray-800">
          Saved Addresses
        </h2>

        <button className="flex items-center gap-2 text-sm text-blue-600 hover:underline">
          <Plus size={16} />
          Add Address
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2">

        {addresses.map((item) => (
          <div
            key={item.id}
            className="border border-gray-200 rounded-lg p-4 flex flex-col gap-5"
          >
            <div className="flex items-center justify-between">

              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-gray-500" />
                <span className="text-lg font-medium">
                  {item.type}
                </span>
              </div>

            </div>

            <div className="text-sm text-gray-700 space-y-1">

              <p className="font-medium text-base">{item.name}</p>

              <p className="text-gray-500 text-base">{item.phone}</p>

              <p className="text-gray-600 text-base">
                {item.address}
              </p>
              <div className="flex gap-4 mt-4">
                <button className="text-base px-6 py-2 bg-blue-600 text-white cursor-pointer rounded-lg border border-blue-600 hover:bg-transparent hover:text-blue-600 transition-colors duration-200">
                  Edit
                </button>
                <button className="text-base px-6 py-2 bg-red-600 text-white cursor-pointer rounded-lg border border-red-600 hover:bg-transparent hover:text-red-600 transition-colors duration-200">
                  Delete
                </button>
              </div>
            </div>

          </div>
        ))}

      </div>

    </div>
  )
}

export default Address