import { useNavigate, useLocation, Link } from "react-router";
import { ArrowLeft, Star, Minus, Plus, ShoppingCart, Store, AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useCartStore } from "../../store/cartStore";
import { isAuthenticated } from "../../utils/auth";
import { topStores } from "../../assets/assets";
import { useRef } from "react";
import { useInfiniteReviews } from "../Hooks/useInfiniteReviews";
import { useAddReview } from "../Hooks/useAddReview";

interface ProductDetailsTopSectionProps {
  product: any;
}

const ProductDetailsTopSection = ({ product }: ProductDetailsTopSectionProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const addItem = useCartStore((state) => state.addItem);
  const markAsUserCart = useCartStore((state) => state.markAsUserCart);

  // UI State
  const [loading] = useState(false);

  // UI State
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState<string>(product?.image || product?.thumbnail || "");
  const [activeTab, setActiveTab] = useState("details");
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [images, setImages] = useState<File[]>([]);
  const { mutate, isPending } = useAddReview(product?.id);

  const handleSubmitReview = () => {
    if (!isAuthenticated()) {
      toast.error("Login required");
      return;
    }

    if (!reviewText || !reviewRating) {
      toast.error("Rating & comment required");
      return;
    }

    const formData = new FormData();

    formData.append("comment", reviewText);
    formData.append("rating", String(reviewRating));

    images.forEach((img) => {
      formData.append("uploaded_images", img);
    });

    mutate(
      { productId: product.id, formData },
      {
        onSuccess: () => {
          toast.success("Review added");

          setReviewText("");
          setReviewRating(0);
          setImages([]);
        },
        onError: () => {
          toast.error("Failed to submit review");
        },
      }
    );
  };



  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteReviews(product?.id);
  const reviews =
    data?.pages.flatMap((page: any) => page.results) || [];

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hasNextPage || !loadMoreRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 } // Trigger when 10% of element is visible
    );

    observer.observe(loadMoreRef.current);

    return () => observer.disconnect();
  }, [hasNextPage, fetchNextPage, isFetchingNextPage]);

  // Initialize image when product is available
  useEffect(() => {
    if (product?.image || product?.thumbnail) {
      setActiveImage(product.image || product.thumbnail);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [product]);

  // Get reviews
  // const mockReviews = getProductReviews(product?.id || 0);

  // Helper function to get store ID from author name
  const getStoreIdFromAuthor = (author: string) => {
    const store = topStores.find(s => s.title.toLowerCase() === author.toLowerCase());
    return store ? store.id : 1;
  };

  // Calculate average rating and rating distribution
  const calculateRatingStats = () => {
    if (!reviews.length) {
      return {
        average: 0,
        total: 0,
        distribution: {
          5: 0,
          4: 0,
          3: 0,
          2: 0,
          1: 0
        }
      };
    }

    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    let totalRating = 0;

    reviews.forEach((review: any) => {
      totalRating += review.rating;
      distribution[review.rating as keyof typeof distribution]++;
    });

    const average = (totalRating / reviews.length).toFixed(1);

    return {
      average: parseFloat(average),
      total: reviews.length,
      distribution
    };
  };

  const ratingStats = calculateRatingStats();
  const ratingDistribution = [
    { label: "Excellent", rating: 5, percentage: ratingStats.total ? Math.round((ratingStats.distribution[5] / ratingStats.total) * 100) : 0 },
    { label: "Very Good", rating: 4, percentage: ratingStats.total ? Math.round((ratingStats.distribution[4] / ratingStats.total) * 100) : 0 },
    { label: "Average", rating: 3, percentage: ratingStats.total ? Math.round((ratingStats.distribution[3] / ratingStats.total) * 100) : 0 },
    { label: "Poor", rating: 2, percentage: ratingStats.total ? Math.round((ratingStats.distribution[2] / ratingStats.total) * 100) : 0 }
  ];

  const tabs = [
    { id: "details", label: "Product Details" },
    { id: "reviews", label: "Reviews" },
    { id: "return", label: "Return Policy" },
    { id: "delivery", label: "Delivery Charge" },
  ];

  // Loading state
  if (loading) {
    return (
      <div className="w-full px-2 md:px-6 lg:px-6 py-10">
        <div className="flex items-center justify-center min-h-100">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading product...</p>
          </div>
        </div>
      </div>
    );
  }

  // Product not found
  if (!product) {
    return (
      <div className="w-full px-2 md:px-6 lg:px-6 py-10">
        <div className="flex flex-col items-center justify-center min-h-100">
          <p className="text-xl text-gray-600 mb-4">Product not found</p>
          <button
            onClick={() => navigate(-1)}
            className="text-blue-600 hover:underline"
          >
            Go back
          </button>
        </div>
      </div>
    );
  }


  const renderStars = () =>
    [...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={18}
        className={
          i < (product?.avg_rating || product?.rating || 0)
            ? "fill-yellow-400 text-yellow-400"
            : "text-gray-300"
        }
      />
    ));

  return (
    <section className="w-full px-2 md:px-6 lg:px-6 py-10">
      <div>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 mb-8 cursor-pointer hover:text-black"
        >
          <ArrowLeft size={18} />
          Back To Shopping
        </button>

        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-6 items-start">

          {/* LEFT IMAGE - STICKY */}

          <div className="sticky top-6 h-fit flex flex-col gap-4">

            <div className="w-full h-125 rounded-xl overflow-hidden bg-gray-100">
              <img
                src={activeImage || product?.thumbnail}
                alt={product?.name || product?.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex gap-3">
              {[product?.image || product?.thumbnail, product?.image2]
                .filter(Boolean)
                .filter((img, index, self) => self.indexOf(img) === index) // Remove duplicates
                .map((img, i) => (
                  <button
                    key={i}
                    onClick={() => img && setActiveImage(img)}
                    className={`rounded-lg overflow-hidden border ${activeImage === img
                      ? "border-blue-500"
                      : "border-gray-200"
                      }`}
                  >
                    <img
                      src={img}
                      className="w-20 h-20 object-cover"
                    />
                  </button>
                ))}
            </div>

          </div>

          {/* RIGHT INFO */}

          <div className="flex flex-col gap-6 pt-2 max-h-screen overflow-y-auto pr-2">

            <h1 className="text-3xl font-semibold">
              {product.name || product.title}
            </h1>

            <div className="flex items-center gap-2">
              <div className="flex">{renderStars()}</div>

              <span className="text-gray-500 text-sm">
                {product.avg_rating || product.rating || 0} ({product.reviews_count || product.reviewCount || 0} reviews)
              </span>
            </div>

            <p className="text-3xl font-bold text-blue-600">
              ${product.discounted_price || product.price}
            </p>

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Store />
              <p className="text-sm text-gray-600">
                Sold by{" "}
                <button
                  onClick={() => navigate(`/stores/${getStoreIdFromAuthor(product.vendor_name || product.author)}`)}
                  className="text-blue-600 font-medium hover:underline cursor-pointer"
                >
                  {product.vendor_name || product.author}
                </button>
              </p>
            </div>

            <p className="text-green-600 text-sm">
              In Stock (45 available)
            </p>

            {/* Quantity */}

            <div className="flex items-center gap-4">

              <span className="text-sm text-gray-600">
                Quantity
              </span>

              <div className="flex items-center border rounded-lg">

                <button
                  onClick={() =>
                    setQuantity((q) => Math.max(1, q - 1))
                  }
                  className="px-4 py-2"
                >
                  <Minus size={16} />
                </button>

                <span className="px-4">{quantity}</span>

                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-4 py-2"
                >
                  <Plus size={16} />
                </button>

              </div>
            </div>

            {/* Add to cart and Buy Now */}

            <div className="flex gap-3">
              <button
                onClick={() => {
                  if (product) {
                    for (let i = 0; i < quantity; i++) {
                      addItem({
                        id: product.id,
                        image: product.image || product.thumbnail,
                        title: product.name || product.title,
                        category: product.category_name || product.category,
                        author: product.vendor_name || product.author,
                        price: product.discounted_price || product.price,
                      });
                    }
                    // If user is authenticated, mark cart as user cart
                    if (isAuthenticated()) {
                      markAsUserCart();
                    }
                    // Reset quantity after adding
                    setQuantity(1);
                  }
                }}
                className="flex items-center justify-center gap-2 bg-blue-600 cursor-pointer text-white py-3 rounded-full hover:bg-blue-700 transition flex-1"
              >
                <ShoppingCart size={18} />
                Add to Cart
              </button>

              <button
                onClick={() => {
                  if (product) {
                    // Check if user is authenticated
                    if (!isAuthenticated()) {
                      toast.error("Please login to buy products");
                      navigate("/login", { state: { from: location.pathname } });
                      return;
                    }
                    navigate("/checkout", {
                      state: {
                        buyNowProduct: {
                          id: product.id,
                          image: product.image || product.thumbnail,
                          title: product.name || product.title,
                          category: product.category_name || product.category,
                          author: product.vendor_name || product.author,
                          price: product.discounted_price || product.price,
                          quantity: quantity,
                        },
                      },
                    });
                  }
                }}
                className="flex items-center justify-center gap-2 bg-blue-600 cursor-pointer text-white py-3 rounded-full hover:bg-blue-700 transition flex-1"
              >
                Buy Now
              </button>
            </div>

            {/* Divider */}

            {/* <div className="border-t pt-6 border-gray-200" >

              <h3 className="font-semibold mb-3">
                Product Description
              </h3>

              <p className="max-w-6xl text-gray-600 leading-relaxed">
                {product.description || product.name || "No description available"}
              </p>

            </div> */}

          </div>
        </div>
      </div>

      {/*  */}

      <div className="mt-10 border border-gray-100 bg-gray-50 rounded-lg p-6">

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-sm border rounded transition
              ${activeTab === tab.id
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === "details" && (
          <div className="text-gray-700">

            <h3 className="text-base font-semibold mb-3">Product Details</h3>

            {product.specifications && Object.keys(product.specifications).length > 0 && (
              <div className="space-y-0.5 text-sm">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <p key={key}>{key.charAt(0).toUpperCase() + key.slice(1)}: {String(value)}</p>
                ))}
              </div>
            )}

            {product.includedItems && (
              <div className="mt-6">
                <h4 className="font-semibold mb-2 text-base">Included Items:</h4>
                <ol className="list-decimal ml-5 space-y-0.5 text-sm">
                  {product.includedItems.map((item: any, i: number) => (
                    <li key={i}>{item}</li>
                  ))}
                </ol>
              </div>
            )}

            {product.features && (
              <div className="mt-6">
                <h4 className="font-semibold mb-2 text-base">Features:</h4>
                <div className="space-y-0 text-sm leading-relaxed">
                  {product.features.map((feature: any, i: number) => (
                    <p key={i}>{feature}</p>
                  ))}
                </div>
              </div>
            )}

            {product.description && (
              <div className="mt-6">
                <h4 className="font-semibold mb-2 text-base">Description</h4>
                <p className="leading-relaxed text-sm">{product.description}</p>
              </div>
            )}

          </div>
        )}

        {activeTab === "reviews" && (
          <div className="grid md:grid-cols-2 gap-6">

            {/* Left Side - Add Review Form */}
            <div>
              <h3 className="text-base font-semibold mb-3">Add your review</h3>


              {/* Visit Store Link */}
              <div className="flex items-center gap-2 mb-4 text-sm">
                <Store className="w-4 h-4" />
                <span>Visit <button
                  onClick={() => navigate(`/stores/${getStoreIdFromAuthor(product.vendor_name || product.author)}`)}
                  className="text-blue-600 hover:underline cursor-pointer"
                >{product.vendor_name || product.author}</button></span>
              </div>

              {/* Login Prompt */}
              {!isAuthenticated() && (
                <p className="text-xs text-red-500 mb-2">
                  Please <Link to="/login" className="underline">login</Link> to write review!
                </p>
              )}

              {/* Star Rating */}
              <div className="flex items-center gap-2 mb-4">
                <span className="text-sm">Your rating :</span>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setReviewRating(star)}
                      className="focus:outline-none"
                    >
                      <Star
                        size={16}
                        className={
                          star <= reviewRating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Review Text */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Review :</label>
                <textarea
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="Write your review"
                  className="w-full border border-gray-300 rounded p-3 text-sm min-h-25 focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* File Upload */}
              <div className="mb-3">
                <label className="block text-sm font-medium mb-2">File Upload</label>
                <div className="border border-gray-300 rounded p-3 text-center text-sm text-gray-500 cursor-pointer hover:bg-gray-50">
                  <input
                    type="file"
                    multiple
                    id="fileUpload"
                    className="hidden"
                    accept="image/jpeg,image/png,image/jpg,image/heic,image/heif"
                    onChange={(e) => {
                      const files = Array.from(e.target.files || []);

                      const allowed = [
                        "image/jpeg",
                        "image/jpg",
                        "image/png",
                        "image/heic",
                        "image/heif",
                      ];

                      const valid = files.filter((f) => allowed.includes(f.type));

                      if (valid.length !== files.length) {
                        toast.error("Only JPG, PNG, JPEG, HEIC allowed");
                      }

                      if (valid.length > 6) {
                        toast.error("Max 6 images allowed");
                        return;
                      }

                      setImages(valid);
                    }}
                  />
                  <label htmlFor="fileUpload" className="cursor-pointer">
                    <span className="text-blue-600">Uploade Image</span>
                    <span className="ml-20">
                      {images.length > 0 ? `${images.length} file(s)` : "No File Chosen"}
                    </span>
                  </label>
                </div>
              </div>

              {/* File Upload Info */}
              <div className="flex items-start gap-2 bg-orange-100 border-l-4 border-orange-500 p-3 mb-4">
                <AlertCircle className="w-4 h-4 text-orange-600 mt-0.5 shrink-0" />
                <p className="text-xs text-gray-700">
                  You can upload up to 6 photos, each photo maximum size is 2048 kilobytes.
                </p>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmitReview}
                disabled={isPending}
                className="bg-blue-600 text-white px-6 py-2 rounded text-sm hover:bg-blue-700 disabled:opacity-50"
              >
                {isPending ? "Submitting..." : "Submit"}
              </button>

              {/* Customer Reviews Stats */}
              <div className="mt-8">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-sm">Customer reviews</h4>
                  <span className="text-sm">{ratingStats.total} reviews</span>
                </div>

                <div className="flex items-center gap-4">
                  <div className="bg-blue-600 text-white rounded px-4 py-3 text-center">
                    <div className="text-2xl font-bold">{ratingStats.average}</div>
                    <div className="text-xs">Out of 5</div>
                  </div>

                  <div className="flex-1 space-y-1">
                    {ratingDistribution.map((item, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs">
                        <span className="w-16 text-right">{item.label}</span>
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${item.percentage}%` }}
                          />
                        </div>
                        <span className="w-8">{item.percentage}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Reviews List */}
            <div>
              <h3 className="text-xl font-semibold mb-8">Customer Reviews</h3>

              <div className="space-y-6">

                {reviews.map((review: any) => {
                  const timeAgo = new Date(review.created_at).toLocaleDateString();

                  return (
                    <div key={review.id} className="border-b border-gray-200 pb-4">
                      <div className="flex items-start gap-3">

                        {/* Avatar */}
                        <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-300 shrink-0">
                          {review.user_avatar ? (
                            <img
                              src={review.user_avatar}
                              className="w-full h-full object-cover"
                            />
                          ) : null}
                        </div>

                        {/* Content */}
                        <div className="flex-1">

                          {/* Name + Date */}
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-sm">
                              {review.user_name}
                            </span>
                            <span className="text-xs text-gray-500">
                              {timeAgo}
                            </span>
                          </div>

                          {/* Stars */}
                          <div className="flex gap-0.5 mb-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                size={14}
                                className={
                                  star <= review.rating
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-300"
                                }
                              />
                            ))}
                          </div>

                          {/* Comment */}
                          <p className="text-sm text-gray-700 mb-3">
                            {review.comment}
                          </p>

                          {/* Images */}
                          {review.images?.length > 0 && (
                            <div className="flex gap-2 flex-wrap">
                              {review.images.map((imgObj: any, i: number) => (
                                <img
                                  key={i}
                                  src={imgObj.image}
                                  onClick={() => setSelectedImage(imgObj.image)}
                                  className="w-16 h-16 object-cover rounded border cursor-pointer hover:scale-105 transition"
                                />
                              ))}
                            </div>
                          )}

                        </div>
                      </div>
                    </div>
                  );
                })}

              </div>
              {selectedImage && (
                <div
                  className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
                  onClick={() => setSelectedImage(null)}
                >

                  {/* Close button */}
                  <button
                    className="absolute top-5 right-5 text-white text-2xl"
                    onClick={(e) => e.stopPropagation()} // 🔥 ADD THIS
                  // onClick={() => setSelectedImage(null)}
                  >
                    ✕
                  </button>

                  {/* Image */}
                  <img
                    src={selectedImage}
                    className="max-w-[90%] max-h-[90%] rounded-lg shadow-lg"
                  />
                </div>
              )}
              {isLoading && <p className="text-center">Loading reviews...</p>}

              <div ref={loadMoreRef} className="h-10 flex justify-center items-center">
                {isFetchingNextPage && <p>Loading more...</p>}
                {!hasNextPage && <p>No more reviews</p>}
              </div>
            </div>
          </div>
        )}

        {activeTab === "return" && (
          <div className="text-gray-600 text-sm">
            Returns accepted within 7 days of delivery if the product is unused and in original packaging.
          </div>
        )}

        {activeTab === "delivery" && (
          <div className="text-gray-600 text-sm">
            Delivery charge depends on your location. Standard delivery takes 2–5 business days.
          </div>
        )}

      </div>


    </section>
  );
};



export default ProductDetailsTopSection
