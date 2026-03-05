import { ShoppingCart } from "lucide-react";
import type { PopularProductCardProps } from "../types/PopularProductCardProps";

const PopularProductCard = ({
  image,
  title,
  category,
  rating,
  reviewCount,
  author,
  price,
  oldPrice,
  discount,
  onAddToCart,
}: PopularProductCardProps) => {
  const fullStars = Math.floor(rating);
  const emptyStars = 5 - fullStars;

  return (
    <div className="w-full rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden border border-blue-100 shadow-sm bg-white">

      {/* Image */}
      <div className="relative">
        <img
          src={image}
          alt={title}
          className="w-full h-32 sm:h-40 md:h-48 object-cover"

        />

        {discount && (
          <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-orange-500 text-white text-xs sm:text-sm font-semibold px-2 py-0.5 sm:px-3 sm:py-1 rounded-md">
            {discount}%
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-2 sm:p-3 md:p-4 space-y-1 sm:space-y-1.5 md:space-y-2">

        <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-gray-900 line-clamp-2">
          {title}
        </h3>

        <p className="text-xs sm:text-sm text-gray-400">{category}</p>

        {/* Rating */}
        <div className="flex items-center text-yellow-400 text-xs sm:text-sm">
          {[...Array(fullStars)].map((_, i) => (
            <span key={`f-${i}`}>★</span>
          ))}

          {[...Array(emptyStars)].map((_, i) => (
            <span key={`e-${i}`} className="text-gray-300">★</span>
          ))}

          <span className="text-gray-400 ml-1 sm:ml-2 text-xs sm:text-sm">({reviewCount})</span>
        </div>

        <p className="text-xs sm:text-sm text-gray-500">
          By <span className="text-blue-500 font-medium">{author}</span>
        </p>

        {/* Price Row */}
        <div className="flex items-center justify-between pt-1 sm:pt-2">

          <div className="flex items-center gap-1 sm:gap-2">
            <span className="text-blue-600 text-base sm:text-lg md:text-xl font-bold">
              ${price}
            </span>

            {oldPrice && (
              <span className="text-gray-400 line-through text-xs sm:text-sm">
                ${oldPrice}
              </span>
            )}
          </div>

          <button
            onClick={(e) => {
              e.preventDefault();
              onAddToCart?.(e);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white p-1.5 sm:p-2.5 md:p-3 rounded-lg sm:rounded-xl transition"
          >
            <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

        </div>
      </div>
    </div>
  );
};

export default PopularProductCard;