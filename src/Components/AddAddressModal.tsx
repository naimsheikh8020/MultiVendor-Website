import { useState } from "react"
import { X } from "lucide-react"

type Props = {
  isOpen: boolean
  onClose: () => void
  onAdd: (address: any) => void
}

const AddAddressModal = ({ isOpen, onClose, onAdd }: Props) => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    landmark: "",
    label: "Home",
    region: "Dhaka",
    city: "Dhaka - South",
    area: ""
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target

    setForm((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = () => {
    if (!form.name || !form.phone || !form.address) return

    onAdd({
      id: Date.now(),
      name: form.name,
      phone: form.phone,
      address: form.address,
      type: form.label
    })

    onClose()

    setForm({
      name: "",
      phone: "",
      address: "",
      landmark: "",
      label: "Home",
      region: "Dhaka",
      city: "Dhaka - South",
      area: ""
    })
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4 backdrop-blur-sm transition-opacity">

      <div className="bg-white w-full max-w-3xl rounded-xl border border-gray-200 p-6">

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Add New Address</h2>

          <button onClick={onClose} className="cursor-pointer hover:bg-gray-100 p-1 rounded-lg transition">
            <X size={18} />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-600">Full Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-blue-500 transition"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-600">Phone Number</label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
              className="border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-blue-500 transition"
            />
          </div>

        </div>

        <div className="flex flex-col gap-1 mt-4">
          <label className="text-sm text-gray-600">Address</label>
          <input
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Enter complete address"
            className="border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-blue-500 transition"
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-600">Landmark (Optional)</label>
            <input
              name="landmark"
              value={form.landmark}
              onChange={handleChange}
              placeholder="Enter landmark"
              className="border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-blue-500 transition"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-600">Address Label (Optional)</label>

            <div className="flex gap-3">

              <button
                type="button"
                onClick={() => setForm({ ...form, label: "Home" })}
                className={`px-4 py-2 rounded-lg transition ${form.label === "Home"
                  ? "bg-blue-600 text-white"
                  : "border border-gray-200 text-gray-700 hover:bg-gray-50"
                  }`}
              >
                Home
              </button>

              <button
                type="button"
                onClick={() => setForm({ ...form, label: "Office" })}
                className={`px-4 py-2 rounded-lg transition ${form.label === "Office"
                  ? "bg-blue-600 text-white"
                  : "border border-gray-200 text-gray-700 hover:bg-gray-50"
                  }`}
              >
                Office
              </button>

            </div>

          </div>

        </div>

        {/* ✅ UPDATED SECTION */}
        <div className="grid grid-cols-3 gap-4 mt-4">

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-600">Region</label>
            <select
              name="region"
              value={form.region}
              onChange={handleChange}
              className="border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-blue-500 cursor-pointer transition"
            >
              <option>Dhaka</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-600">City</label>
            <select
              name="city"
              value={form.city}
              onChange={handleChange}
              className="border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-blue-500 cursor-pointer transition"
            >
              <option>Dhaka - South</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-600">Area</label>
            <select
              name="area"
              value={form.area}
              onChange={handleChange}
              className="border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-blue-500 cursor-pointer transition"
            >
              <option value="">Select Area</option>
              <option>Dhanmondi</option>
              <option>Mirpur</option>
              <option>Uttara</option>
            </select>
          </div>

        </div>

        <div className="flex items-center gap-4 mt-6">

          <button
            onClick={onClose}
            className="px-6 py-2 rounded-lg border border-red-500 text-red-500 hover:bg-red-50 cursor-pointer transition"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 cursor-pointer transition"
          >
            Save Address
          </button>

        </div>

      </div>

    </div>
  )
}

export default AddAddressModal