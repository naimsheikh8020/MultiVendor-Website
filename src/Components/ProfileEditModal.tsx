import { useEffect, useRef } from "react";
import { X, User, Phone } from "lucide-react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useProfile } from "../features/auth/hooks/useProfile";
import { useUpdateProfile } from "../features/auth/hooks/useUpdateProfile";
import { profileSchema, type ProfileFormData } from "../utils/validation/profile.schema";



type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const ProfileEditModal = ({ isOpen, onClose }: Props) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const { data: profile, refetch } = useProfile();
  const { mutate, isPending } = useUpdateProfile();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
  });

  // ✅ Prefill form
  useEffect(() => {
    if (profile?.user) {
      reset({
        full_name: profile.user.full_name || "",
        phone_number: profile.user.phone_number || "",
        gender: profile.user.gender || "",
      });
    }
  }, [profile, reset]);

  const onSubmit = (data: ProfileFormData) => {
    mutate(data, {
      onSuccess: async () => {
        await refetch();
        onClose();
      },
      onError: (err: any) => {
        alert(err?.response?.data?.detail || "Update failed");
      },
    });
  };

  // outside click
  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      onClick={handleOutsideClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
    >
      <div
        ref={modalRef}
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">Edit Profile</h2>
          <button onClick={onClose} className="cursor-pointer">
            <X  size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          {/* Name */}
          <div>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                {...register("full_name")}
                placeholder="Full Name"
                className="w-full pl-10 py-2.5 border border-gray-200 rounded-lg"
              />
            </div>
            {errors.full_name && (
              <p className="text-red-500 text-sm mt-1">
                {errors.full_name.message}
              </p>
            )}
          </div>

          {/* Phone */}
          <div>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                {...register("phone_number")}
                placeholder="Mobile Number"
                className="w-full pl-10 py-2.5 border border-gray-200 rounded-lg"
              />
            </div>
            {errors.phone_number && (
              <p className="text-red-500 text-sm mt-1">
                {errors.phone_number.message}
              </p>
            )}
          </div>

          {/* Gender */}
          <select
            {...register("gender")}
            className="w-full border border-gray-200 rounded-lg py-2.5 px-3"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="others">Others</option>
          </select>

          {/* Footer */}
          <div className="flex justify-end gap-3 mt-4">
            <button type="button" onClick={onClose} className="border border-gray-200 text-gray-700 cursor-pointer px-4 py-2 rounded-lg">
              Cancel
            </button>

            <button
              type="submit"
              disabled={isPending}
              className="bg-blue-600 cursor-pointer text-white px-4 py-2 rounded-lg"
            >
              {isPending ? "Saving..." : "Save Changes"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default ProfileEditModal;