import { X, Upload } from "lucide-react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  rating: number;
  setRating: (n: number) => void;
  comment: string;
  setComment: (v: string) => void;
  images: string[];
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  removeImage: (i: number) => void;
  onSubmit: () => void;
};

const ReviewModal = ({
  isOpen,
  onClose,
  rating,
  setRating,
  comment,
  setComment,
  images,
  handleImageUpload,
  removeImage,
  onSubmit,
}: Props) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-4 sm:p-6 max-w-md w-full">

        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">Write a Review</h3>
          <button onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="space-y-4">

          {/* Rating */}
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                className={`text-2xl ${star <= rating ? "text-yellow-400" : "text-gray-300"}`}
              >
                ★
              </button>
            ))}
          </div>

          {/* Comment */}
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full border rounded-lg p-3"
            placeholder="Write review..."
          />

          {/* Upload */}
          <label className="flex justify-center border-2 border-dashed p-4 rounded-lg cursor-pointer">
            <Upload size={18} />
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>

          {/* Preview */}
          {images.length > 0 && (
            <div className="grid grid-cols-3 gap-2">
              {images.map((img, i) => (
                <div key={i} className="relative">
                  <img src={img} className="h-20 w-full object-cover rounded" />
                  <button
                    onClick={() => removeImage(i)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="flex gap-2">
            <button onClick={onClose} className="flex-1 bg-gray-100 py-2 rounded">
              Cancel
            </button>
            <button onClick={onSubmit} className="flex-1 bg-blue-600 text-white py-2 rounded">
              Submit
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ReviewModal;