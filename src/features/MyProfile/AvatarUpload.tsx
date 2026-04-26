import { useState } from "react";
import { UserCircle } from "lucide-react";
import { API } from "../../services/api";
import { useProfile } from "../../features/auth/hooks/useProfile";

const AvatarUpload = () => {
  const { data: profile, refetch } = useProfile();

  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const avatar = profile?.user?.avatar;

  const getAvatarUrl = (avatar?: string) => {
    if (!avatar) return null;
    if (avatar.startsWith("http")) return avatar;
    return `${import.meta.env.VITE_BASE_URL}${avatar}`;
  };

  const handleImageChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // ✅ instant preview
    const localPreview = URL.createObjectURL(file);
    setPreview(localPreview);

    // ✅ upload to backend
    const formData = new FormData();
    formData.append("avatar", file);

    try {
      setLoading(true);

      await API.patch(
        "/api/v1/accounts/customer/profile/update/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // ✅ refresh profile (get new avatar)
      await refetch();

    } catch (err) {
      console.error("Upload failed", err);
    } finally {
      setLoading(false);
    }
  };

  const imageUrl = preview || getAvatarUrl(avatar);

  return (
    <label
      className={`inline-flex items-center justify-center rounded-full p-5 mb-6 cursor-pointer relative overflow-hidden
      ${imageUrl ? "" : "bg-blue-50"}`}
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt="avatar"
          className="object-cover rounded-full w-24 h-24"
        />
      ) : (
        <UserCircle className="text-blue-600" size={32} />
      )}

      {/* 🔥 loading overlay (optional but clean UX) */}
      {loading && (
        <div className="absolute inset-0 bg-white/70 flex items-center justify-center text-sm">
          Uploading...
        </div>
      )}

      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
      />
    </label>
  );
};

export default AvatarUpload;