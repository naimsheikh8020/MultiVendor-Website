import { useState } from "react"
import { UserCircle } from "lucide-react"

const AvatarUpload = () => {
  const [image, setImage] = useState<string | null>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const preview = URL.createObjectURL(file)
    setImage(preview)
  }

  return (
    <label
      className={`inline-flex items-center justify-center rounded-full p-5 mb-6 cursor-pointer relative overflow-hidden
      ${image ? "" : "bg-blue-50"}`}
    >
      {image ? (
        <img
          src={image}
          alt="avatar"
          className="object-cover rounded-full w-24 h-24"
        />
      ) : (
        <UserCircle className="text-blue-600" size={32} />
      )}

      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
      />
    </label>
  )
}

export default AvatarUpload