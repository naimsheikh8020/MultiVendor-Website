import { useEffect, useRef, useState } from "react"
import { X, User, Phone, Mail } from "lucide-react"

type Props = {
  isOpen: boolean
  onClose: () => void
}

const ProfileEditModal = ({ isOpen, onClose }: Props) => {
  const modalRef = useRef<HTMLDivElement>(null)

  const [formData, setFormData] = useState({
    fullName: "",
    mobile: "",
    email: "",
    gender: ""
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  // lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

  // close when clicking outside
  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div
      onClick={handleOutsideClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm transition-opacity"
    >
      <div
        ref={modalRef}
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl transform transition-all duration-300 scale-100"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-800">
            Edit Profile
          </h2>

          <button
            onClick={onClose}
            className="p-2 rounded-full cursor-pointer hover:bg-gray-100 transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <div className="space-y-4">

          {/* Full Name */}
          <div className="relative">
            <User
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-200 py-2.5 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Mobile */}
          <div className="relative">
            <Phone
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              name="mobile"
              placeholder="Mobile Number"
              value={formData.mobile}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-200 py-2.5 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Gmail */}
          <div className="relative">
            <Mail
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="email"
              name="email"
              placeholder="Gmail Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-200 py-2.5 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Gender */}
          <div>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-200 py-2.5 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="others">Others</option>
            </select>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-end gap-3">

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-100 transition cursor-pointer"
          >
            Cancel
          </button>

          <button className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 cursor-pointer transition">
            Save Changes
          </button>

        </div>
      </div>
    </div>
  )
}

export default ProfileEditModal