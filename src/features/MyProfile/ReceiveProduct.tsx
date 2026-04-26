import { useState } from "react";
import { assets } from "../../assets/assets";
import ReturnModal from "./ReturnModal";
import ReviewModal from "./ReviewModal";

interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  rating: number;
  vendor: string;
}

interface ReviewData {
  productId: string;
  rating: number;
  comment: string;
  images: string[];
}

interface ReturnData {
  productId: string;
  reason: string;
}

const ReceiveProduct = () => {
  const [products] = useState<Product[]>([
    {
      id: "1",
      name: "Wireless Headphones",
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
      price: 89.99,
      rating: 4.5,
      vendor: "TechStore",
    },
    {
      id: "2342",
      name: "Coffee",
      image: assets.Coffee,
      price: 12.99,
      rating: 4.8,
      vendor: "ElectroHub",
    },
    {
      id: "23342",
      name: "Coffee",
      image: assets.Coffee,
      price: 12.99,
      rating: 4.8,
      vendor: "ElectroHub",
    },
    {
      id: "23442",
      name: "Coffee",
      image: assets.Coffee,
      price: 12.99,
      rating: 4.8,
      vendor: "ElectroHub",
    },
    {
      id: "3",
      name: "Phone Case",
      image:
        "https://images.unsplash.com/photo-1609269585289-603ba6f2df48?w=300&h=300&fit=crop",
      price: 24.99,
      rating: 4.2,
      vendor: "AccessoriesPlus",
    },
  ]);

  const [reviews, setReviews] = useState<ReviewData[]>([]);
  const [returns, setReturns] = useState<ReturnData[]>([]);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showReturnModal, setShowReturnModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  const [rating, setRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");
  const [reviewImages, setReviewImages] = useState<string[]>([]);
  const [returnReason, setReturnReason] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  const returnReasons = [
    "Defective/Not Working",
    "Wrong Item Received",
    "Not as Described",
    "Damaged During Shipping",
    "Changed Mind",
    "Other",
  ];

  const openReviewModal = (id: string) => {
    setSelectedProduct(id);
    setShowReviewModal(true);
    setReviewImages([]);
  };

  const openReturnModal = (id: string) => {
    setSelectedProduct(id);
    setShowReturnModal(true);
  };

  const submitReview = () => {
    if (!selectedProduct || !reviewComment.trim()) return;

    setReviews((prev) => [
      ...prev,
      {
        productId: selectedProduct,
        rating,
        comment: reviewComment,
        images: reviewImages,
      },
    ]);

    setReviewComment("");
    setReviewImages([]);
    setRating(5);
    setShowReviewModal(false);
    setSelectedProduct(null);
  };

  const submitReturn = () => {
    if (!selectedProduct || !returnReason.trim()) return;

    setReturns((prev) => [
      ...prev,
      { productId: selectedProduct, reason: returnReason },
    ]);

    setReturnReason("");
    setShowReturnModal(false);
    setSelectedProduct(null);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      if (!file.type.startsWith("image/")) {
        alert("Only images allowed");
        return;
      }

      if (file.size > 2 * 1024 * 1024) {
        alert("Max 2MB");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setReviewImages((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (i: number) => {
    setReviewImages((prev) => prev.filter((_, index) => index !== i));
  };

  const isReviewed = (id: string) =>
    reviews.some((r) => r.productId === id);

  const isReturned = (id: string) =>
    returns.some((r) => r.productId === id);

  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentProducts = products.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
      <h2 className="text-2xl font-bold mb-6">Receive Product</h2>

      {/* 🔥 GRID (2 per row) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {currentProducts.map((product) => (
          <div
            key={product.id}
            className="flex gap-4 border border-gray-200 rounded-xl p-4 hover:shadow-md transition bg-white"
          >
            {/* 🔥 Bigger Image */}
            <img
              src={product.image}
              alt={product.name}
              className="w-32 h-32 object-cover rounded-lg"
            />

            {/* Content */}
            <div className="flex flex-col flex-1 justify-between">

              <div>
                <p className="text-xs md:text-base text-gray-500">
                  {product.vendor}
                </p>

                <h3 className="font-semibold text-sm md:text-base text-gray-900 line-clamp-2">
                  {product.name}
                </h3>

                <div className="flex gap-2 mt-2">
                  <span className="text-blue-600 font-bold text-sm md:text-base">
                    ${product.price}
                  </span>

                  <span className="text-xs md:text-sm text-gray-500">
                    ⭐ {product.rating}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 mt-3">
                {isReturned(product.id) ? (
                  <span className="text-xs md:text-base bg-red-50 text-red-600 px-2 py-1 rounded">
                    Returned
                  </span>
                ) : isReviewed(product.id) ? (
                  <span className="text-xs md:text-base bg-green-50 text-green-600 px-2 py-1 rounded">
                    Reviewed
                  </span>
                ) : (
                  <>
                    <button
                      onClick={() => openReviewModal(product.id)}
                      className="flex-1 cursor-pointer bg-blue-600 text-white text-xs md:text-base py-2 rounded"
                    >
                      Review
                    </button>

                    <button
                      onClick={() => openReturnModal(product.id)}
                      className="flex-1 cursor-pointer bg-red-50 text-red-600 text-xs md:text-base py-2 rounded"
                    >
                      Return
                    </button>
                  </>
                )}
              </div>

            </div>
          </div>
        ))}

      </div>

      {/* Modals */}
      <ReviewModal
        isOpen={showReviewModal}
        onClose={() => setShowReviewModal(false)}
        rating={rating}
        setRating={setRating}
        comment={reviewComment}
        setComment={setReviewComment}
        images={reviewImages}
        handleImageUpload={handleImageUpload}
        removeImage={removeImage}
        onSubmit={submitReview}
      />

      <ReturnModal
        isOpen={showReturnModal}
        onClose={() => setShowReturnModal(false)}
        reason={returnReason}
        setReason={setReturnReason}
        reasons={returnReasons}
        onSubmit={submitReturn}
      />

      <div className="flex items-center justify-between mt-6">

        {/* LEFT */}
        <button
          onClick={() => setCurrentPage((prev) => prev - 1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded border transition
      ${currentPage === 1
              ? "bg-gray-200 text-gray-400 border-gray-200 cursor-not-allowed"
              : "bg-blue-600 text-white border-blue-600 hover:bg-transparent hover:text-blue-600"
            }
    `}
        >
          Previous
        </button>

        {/* CENTER */}
        <span className="text-sm text-gray-600 font-medium">
          Page {currentPage} of {totalPages}
        </span>

        {/* RIGHT */}
        <button
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded border transition
      ${currentPage === totalPages
              ? "bg-gray-200 text-gray-400 border-gray-200 cursor-not-allowed"
              : "bg-blue-600 text-white border-blue-600 hover:bg-transparent hover:text-blue-600"
            }
    `}
        >
          Next
        </button>

      </div>
    </div>
  );
};

export default ReceiveProduct;