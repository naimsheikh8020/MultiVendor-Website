import { X } from "lucide-react"
import { useState } from "react"

type Props = {
  isOpen: boolean
  onClose: () => void
  address: any
}

const EditAddressModal = ({ isOpen, onClose, address }: Props) => {
  const [selectedLabel, setSelectedLabel] = useState(address?.type || "Home")

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4 backdrop-blur-sm transition-opacity">

      <div className="bg-white w-full max-w-3xl rounded-xl border border-gray-200 p-6">

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Edit Address
          </h2>

          <button className="cursor-pointer" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-600">Full Name</label>
            <input
              defaultValue={address?.name}
              className="border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-600">Phone Number</label>
            <input
              defaultValue={address?.phone}
              className="border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-blue-500"
            />
          </div>

        </div>

        <div className="flex flex-col gap-1 mt-4">
          <label className="text-sm text-gray-600">Address</label>
          <input
            defaultValue={address?.address}
            className="border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-blue-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-600">
              Landmark (Optional)
            </label>
            <input className="border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-blue-500" />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-600">
              Address Label (Optional)
            </label>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setSelectedLabel("Home")}
                className={`px-4 py-2 rounded-lg transition ${selectedLabel === "Home"
                  ? "bg-blue-600 text-white"
                  : "border border-gray-200 text-gray-700 hover:bg-gray-50"
                  }`}
              >
                Home
              </button>

              <button
                type="button"
                onClick={() => setSelectedLabel("Office")}
                className={`px-4 py-2 rounded-lg transition ${selectedLabel === "Office"
                  ? "bg-blue-600 text-white"
                  : "border border-gray-200 text-gray-700 hover:bg-gray-50"
                  }`}
              >
                Office
              </button>
            </div>

          </div>

        </div>

        <div className="grid grid-cols-3 gap-4 mt-4">

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-600">City</label>
            <select className="border border-gray-200 rounded-lg px-3 py-2 cursor-pointer focus:border-blue-600 outline-none transition">
              <option>Select City</option>
              <option>Dhaka</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-600">Zone</label>
            <select className="border border-gray-200 rounded-lg px-3 py-2 cursor-pointer focus:border-blue-600 outline-none transition">
              <option>Select Zone</option>
              <option>Dhaka - South</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-600">Area</label>
            <select className="border border-gray-200 rounded-lg px-3 py-2 cursor-pointer focus:border-blue-600 outline-none transition">
              <option>Select Area</option>
              <option>Mohakhali</option>
            </select>
          </div>

        </div>

        <div className="flex items-center gap-4 mt-6">

          <button className="px-6 py-2 rounded-lg border border-red-500 text-red-500 hover:bg-red-50 cursor-pointer">
            Cancel
          </button>

          <button className="px-6 py-2 rounded-lg bg-blue-600 cursor-pointer text-white">
            Save Changes
          </button>

        </div>

      </div>

    </div>
  )
}

export default EditAddressModal