import { useState } from "react"
import { X } from "lucide-react"
import { useAreas, useCities, useZones } from "../features/Hooks/usePathao"

type Props = {
  isOpen: boolean
  onClose: () => void
  onAdd: (address: any) => void
}

const AddAddressModal = ({ isOpen, onClose, onAdd }: Props) => {

  const initialForm = {
    name: "",
    phone: "",
    address: "",
    landmark: "",
    label: "Home",
    city: null as number | null,
    zone: null as number | null,
    area: null as number | null,
  }

  const [form, setForm] = useState(initialForm)

  const { data: cityData } = useCities()
  const { data: zoneData } = useZones(form.city || undefined)
  const { data: areaData } = useAreas(form.zone || undefined)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    setForm(initialForm)
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
                className={`px-4 py-2 rounded-lg transition ${
                  form.label === "Home"
                    ? "bg-blue-600 text-white"
                    : "border border-gray-200 text-gray-700 hover:bg-gray-50"
                }`}
              >
                Home
              </button>

              <button
                type="button"
                onClick={() => setForm({ ...form, label: "Office" })}
                className={`px-4 py-2 rounded-lg transition ${
                  form.label === "Office"
                    ? "bg-blue-600 text-white"
                    : "border border-gray-200 text-gray-700 hover:bg-gray-50"
                }`}
              >
                Office
              </button>

            </div>

          </div>

        </div>

        {/* CITY → ZONE → AREA */}
        <div className="grid grid-cols-3 gap-4 mt-4">

          {/* CITY */}
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-600">City</label>
            <select
              value={form.city ?? ""}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  city: e.target.value ? Number(e.target.value) : null,
                  zone: null,
                  area: null,
                }))
              }
              className="border border-gray-200 rounded-lg px-3 py-2 cursor-pointer focus:border-blue-600 outline-none transition"
            >
              <option value="">Select City</option>
              {cityData?.data?.results?.map((c: any) => (
                <option key={c.city_id} value={c.city_id}>
                  {c.city_name}
                </option>
              ))}
            </select>
          </div>

          {/* ZONE */}
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-600">Zone</label>
            <select
              value={form.zone ?? ""}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  zone: e.target.value ? Number(e.target.value) : null,
                  area: null,
                }))
              }
              disabled={!form.city}
              className="border border-gray-200 rounded-lg px-3 py-2 cursor-pointer focus:border-blue-600 outline-none transition"
            >
              <option value="">Select Zone</option>
              {zoneData?.data?.results?.map((z: any) => (
                <option key={z.zone_id} value={z.zone_id}>
                  {z.zone_name}
                </option>
              ))}
            </select>
          </div>

          {/* AREA */}
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-600">Area</label>
            <select
              value={form.area ?? ""}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  area: e.target.value ? Number(e.target.value) : null,
                }))
              }
              disabled={!form.zone}
              className="border border-gray-200 rounded-lg px-3 py-2 cursor-pointer focus:border-blue-600 outline-none transition"
            >
              <option value="">Select Area</option>
              {areaData?.data?.results?.map((a: any) => (
                <option key={a.area_id} value={a.area_id}>
                  {a.area_name}
                </option>
              ))}
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