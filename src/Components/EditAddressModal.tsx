import { X } from "lucide-react"
import { useState, useEffect } from "react"
import { useUpdateAddress } from "../features/Hooks/useUpdateAddress"
import { useAreas, useCities, useZones } from "../features/Hooks/usePathao"

type Props = {
  isOpen: boolean
  onClose: () => void
  address: any
  onSave?: (updatedAddress: any) => void
}

const EditAddressModal = ({ isOpen, onClose, address }: Props) => {
  const [selectedLabel, setSelectedLabel] = useState(address?.type || "Home")
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    landmark: "",
    city: null as number | null,
    zone: null as number | null,
    area: null as number | null,
  })
  const [errors, setErrors] = useState<string[]>([])

  const { data: cityData } = useCities()
  const { data: zoneData } = useZones(formData.city || undefined)
  const { data: areaData } = useAreas(formData.zone || undefined)

  const { mutate: updateMutate, isPending } = useUpdateAddress();

  // Update form data when address changes or modal opens
  useEffect(() => {
    if (isOpen && address) {
      setFormData({
        name: address?.full_name || address?.name || "",
        phone: address?.phone_number || address?.phone || "",
        address: address?.address || "",
        landmark: address?.landmark || "",
        city: address?.city || null,
        zone: address?.zone || null,
        area: address?.area || null
      })
      setSelectedLabel(address?.label || address?.type || "Home")
    }
  }, [isOpen, address])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // 🔥 VALIDATE REQUIRED FIELDS
  const validateForm = () => {
    const newErrors: string[] = []

    if (!formData.name?.trim()) newErrors.push("name")
    if (!formData.phone?.trim()) newErrors.push("phone")
    if (!formData.address?.trim()) newErrors.push("address")
    if (!formData.city) newErrors.push("city")
    if (!formData.zone) newErrors.push("zone")
    if (!formData.area) newErrors.push("area")

    setErrors(newErrors)
    return newErrors.length === 0
  }

  const isFormValid = () => {
    return formData.name?.trim() && formData.phone?.trim() && formData.address?.trim() && formData.city && formData.zone && formData.area
  }

  const handleSave = () => {
    if (!address?.id || !validateForm()) return;

    updateMutate(
      {
        id: address.id,
        data: {
          full_name: formData.name,
          phone_number: formData.phone,
          address: formData.address,
          landmark: formData.landmark,
          label: selectedLabel.toLowerCase(),
          city: formData.city,
          zone: formData.zone,
          area: formData.area,
        },
      },
      {
        onSuccess: () => {
          setErrors([])
          onClose();
        },
        onError: (err: any) => {
          console.log("UPDATE ERROR:", err?.response?.data);
        },
      }
    );
  };

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
            <label className="text-sm text-gray-600">Full Name <span className="text-red-500">*</span></label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={`border rounded-lg px-3 py-2 outline-none focus:border-blue-500 transition ${errors.includes("name") ? "border-red-500 bg-red-50" : "border-gray-200"
                }`}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-600">Phone Number <span className="text-red-500">*</span></label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className={`border rounded-lg px-3 py-2 outline-none focus:border-blue-500 transition ${errors.includes("phone") ? "border-red-500 bg-red-50" : "border-gray-200"
                }`}
            />
          </div>

        </div>

        <div className="flex flex-col gap-1 mt-4">
          <label className="text-sm text-gray-600">Address <span className="text-red-500">*</span></label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            className={`border rounded-lg px-3 py-2 outline-none focus:border-blue-500 transition ${errors.includes("address") ? "border-red-500 bg-red-50" : "border-gray-200"
              }`}
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-600">
              Landmark (Optional)
            </label>
            <input
              type="text"
              name="landmark"
              value={formData.landmark}
              onChange={handleInputChange}
              className="border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-blue-500"
            />
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
            <label className="text-sm text-gray-600">City <span className="text-red-500">*</span></label>
            <select
              name="city"
              value={formData.city ?? ""}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  city: e.target.value ? Number(e.target.value) : null,
                  zone: null,
                  area: null,
                }))
              }
              className={`border rounded-lg px-3 py-2 cursor-pointer focus:border-blue-600 outline-none transition ${errors.includes("city") ? "border-red-500 bg-red-50" : "border-gray-200"
                }`}
            >
              <option value="">Select City</option>
              {cityData?.data?.results?.map((c: any) => (
                <option key={c.city_id} value={c.city_id}>
                  {c.city_name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-600">Zone <span className="text-red-500">*</span></label>
            <select
              name="zone"
              value={formData.zone ?? ""}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  zone: e.target.value ? Number(e.target.value) : null,
                  area: null,
                }))
              }
              disabled={!formData.city}
              className={`border rounded-lg px-3 py-2 cursor-pointer focus:border-blue-600 outline-none transition ${errors.includes("zone") ? "border-red-500 bg-red-50" : "border-gray-200"
                } ${!formData.city ? "bg-gray-100 cursor-not-allowed" : ""}`}
            >
              <option value="">Select Zone</option>
              {zoneData?.data?.results?.map((z: any) => (
                <option key={z.zone_id} value={z.zone_id}>
                  {z.zone_name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-600">Area <span className="text-red-500">*</span></label>
            <select
              name="area"
              value={formData.area ?? ""}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  area: e.target.value ? Number(e.target.value) : null,
                }))
              }
              disabled={!formData.zone}
              className={`border rounded-lg px-3 py-2 cursor-pointer focus:border-blue-600 outline-none transition ${errors.includes("area") ? "border-red-500 bg-red-50" : "border-gray-200"
                } ${!formData.zone ? "bg-gray-100 cursor-not-allowed" : ""}`}
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
            onClick={handleSave}
            disabled={!isFormValid() || isPending}
            className={`px-6 py-2 rounded-lg text-white cursor-pointer transition ${isFormValid() && !isPending
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-400 cursor-not-allowed"
              }`}
          >
            {isPending ? "Saving..." : "Save Changes"}
          </button>

        </div>

      </div>

    </div>
  )
}

export default EditAddressModal