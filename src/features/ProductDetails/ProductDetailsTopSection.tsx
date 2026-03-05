import { useNavigate, useParams } from "react-router";

import { ArrowLeft, Star, Minus, Plus, ShoppingCart, Store, AlertCircle } from "lucide-react";
import { useState } from "react";
import { popularProducts } from "../../assets/assets";
const ProductDetailsTopSection = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const product = popularProducts.find((p) => p.id === Number(productId));

  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(product?.image);
  const [activeTab, setActiveTab] = useState("details");
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  // Mock reviews data
  const mockReviews = [
    {
      id: 1,
      name: "Ax Alex",
      timeAgo: "2 month ago",
      rating: 4,
      comment: "Second or third time that I buy a Botble product",
      images: 3
    },
    {
      id: 2,
      name: "Ax Alex",
      timeAgo: "2 month ago",
      rating: 4,
      comment: "Second or third time that I buy a Botble product",
      images: 3
    },
    {
      id: 3,
      name: "Ax Alex",
      timeAgo: "2 month ago",
      rating: 4,
      comment: "Second or third time that I buy a Botble product",
      images: 3
    },
    {
      id: 4,
      name: "Ax Alex",
      timeAgo: "2 month ago",
      rating: 4,
      comment: "Second or third time that I buy a Botble product",
      images: 3
    }
  ];

  const tabs = [
    { id: "details", label: "Product Details" },
    { id: "reviews", label: "Reviews (12)" },
    { id: "return", label: "Return Policy" },
    { id: "delivery", label: "Delivery Charge" },
  ];

  if (!product) return <p>Product not found</p>;


  const renderStars = () =>
    [...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={18}
        className={
          i < product.rating
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

          {/* LEFT IMAGE */}

          <div className="flex flex-col gap-4">

            <div className="w-full h-125 rounded-xl overflow-hidden bg-gray-100">
              <img
                src={activeImage}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex gap-3">
              {[product.image, product.image2].filter(Boolean).map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(img)}
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

          <div className="flex flex-col gap-6 pt-2">

            <h1 className="text-3xl font-semibold">
              {product.title}
            </h1>

            <div className="flex items-center gap-2">
              <div className="flex">{renderStars()}</div>

              <span className="text-gray-500 text-sm">
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>

            <p className="text-3xl font-bold text-blue-600">
              ${product.price}
            </p>

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Store />
              <p className="text-sm text-gray-600">
                Sold by{" "}
                <button
                  onClick={() => navigate(`/stores/${product.author.toLowerCase().replace(/\s+/g, '-')}`)}
                  className="text-blue-600 font-medium hover:underline cursor-pointer"
                >
                  {product.author}
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

            {/* Add to cart */}

            <button className="flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-full hover:bg-blue-700 transition w-full">
              <ShoppingCart size={18} />
              Add to Cart
            </button>

            {/* Divider */}

            <div className="border-t pt-6 border-gray-200" >

              <h3 className="font-semibold mb-3">
                Product Description
              </h3>

              <p className="max-w-6xl text-gray-600 leading-relaxed">
                {product.description}
              </p>

            </div>

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

            {product.specifications && (
              <div className="space-y-0.5 text-sm">
                <p>Brand: {product.specifications.brand}</p>
                <p>Type: {product.specifications.type}</p>
                <p>Material: {product.specifications.material}</p>
                <p>Color: {product.specifications.color}</p>
                <p>Number of Pieces: {product.specifications.pieces}</p>
              </div>
            )}

            {product.includedItems && (
              <div className="mt-6">
                <h4 className="font-semibold mb-2 text-base">Included Items:</h4>
                <ol className="list-decimal ml-5 space-y-0.5 text-sm">
                  {product.includedItems.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ol>
              </div>
            )}

            {product.features && (
              <div className="mt-6">
                <h4 className="font-semibold mb-2 text-base">Features:</h4>
                <div className="space-y-0 text-sm leading-relaxed">
                  {product.features.map((feature, i) => (
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
              <p className="text-xs text-gray-600 mb-3">
                Your email address will not be published. Required fields are marked
              </p>

              {/* Visit Store Link */}
              <div className="flex items-center gap-2 mb-4 text-sm">
                <Store className="w-4 h-4" />
                <span>Visit <button
                  onClick={() => navigate(`/stores/${product.author.toLowerCase().replace(/\s+/g, '-')}`)}
                  className="text-blue-600 hover:underline cursor-pointer"
                >{product.author}</button></span>
              </div>

              {/* Login Prompt */}
              <p className="text-xs text-red-500 mb-2">
                Please <a href="#" className="underline">login</a> to write review!
              </p>

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
                  <input type="file" multiple className="hidden" id="fileUpload" />
                  <label htmlFor="fileUpload" className="cursor-pointer">
                    <span className="text-blue-600">Uploade Image</span>
                    <span className="ml-20">No File Chosen</span>
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
              <button className="bg-blue-600 text-white px-6 py-2 rounded text-sm hover:bg-blue-700">
                Submit
              </button>

              {/* Customer Reviews Stats */}
              <div className="mt-8">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-sm">Customer reviews</h4>
                  <span className="text-sm">8 reviews</span>
                </div>

                <div className="flex items-center gap-4">
                  <div className="bg-blue-600 text-white rounded px-4 py-3 text-center">
                    <div className="text-2xl font-bold">4.7</div>
                    <div className="text-xs">Out of 5</div>
                  </div>

                  <div className="flex-1 space-y-1">
                    {[
                      { label: "Excellent", percentage: 70 },
                      { label: "Very Good", percentage: 30 },
                      { label: "Average", percentage: 20 },
                      { label: "Poor", percentage: 10 }
                    ].map((item, i) => (
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
              <h3 className="text-base font-semibold mb-4">8 review(s) for "Cocker"</h3>

              <div className="space-y-6">
                {mockReviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-200 pb-4">
                    <div className="flex items-start gap-3">
                      {/* Avatar */}
                      <div className="w-10 h-10 rounded-full bg-gray-300 shrink-0" />

                      {/* Review Content */}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-sm">{review.name}</span>
                          <span className="text-xs text-gray-500">{review.timeAgo}</span>
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
                        <div className="flex gap-2">
                          {[...Array(review.images)].map((_, i) => (
                            <div key={i} className="w-16 h-16 border border-gray-300 rounded flex items-center justify-center bg-gray-50">
                              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
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
