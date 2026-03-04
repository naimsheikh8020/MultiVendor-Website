import { Star, ShoppingCart } from "lucide-react";

interface BestProductCardProps {
  image: string;
  title: string;
  category: string;
  rating: number;
  reviews: number;
  seller: string;
  price: number;
  oldPrice?: number;
  discount?: string;
}

const BestProductCard = ({
  image,
  title,
  category,
  rating,
  reviews,
  seller,
  price,
  oldPrice,
  discount,
}: BestProductCardProps) => {
  return (
    <div className="relative w-full rounded-xl border border-blue-200 bg-white p-3 sm:p-4 lg:p-5 shadow-sm hover:shadow-md transition">

      {/* Discount Badge */}
      {discount && (
        <span className="absolute left-2 top-2 sm:left-3 sm:top-3 lg:left-4 lg:top-4 bg-blue-500 text-white text-[10px] sm:text-xs font-semibold px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-md">
          {discount}
        </span>
      )}

      {/* Image */}
      <div className="flex justify-center mb-2 sm:mb-3 lg:mb-4">
        <img
          src={image}
          alt={title}
          className="w-full  object-contain"
        />
      </div>

      {/* Title */}
      <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-800 mb-1 truncate">
        {title}
      </h3>

      {/* Category */}
      <p className="text-xs sm:text-sm text-gray-400 mb-1">{category}</p>

      {/* Rating */}
      <div className="flex items-center gap-1 mb-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={12}
            className={
              i < rating
                ? "fill-yellow-400 text-yellow-400 sm:w-3.5 sm:h-3.5"
                : "text-gray-300 sm:w-3.5 sm:h-3.5"
            }
          />
        ))}
        <span className="text-[10px] sm:text-xs text-gray-400 ml-1">
          ({reviews})
        </span>
      </div>

      {/* Seller */}
      <p className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4 truncate">
        By <span className="text-blue-500">{seller}</span>
      </p>

      {/* Price + Button */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1 sm:gap-2">
          <span className="text-base sm:text-lg lg:text-xl font-bold text-blue-600">
            ${price}
          </span>
          {oldPrice && (
            <span className="text-xs sm:text-sm text-gray-400 line-through">
              ${oldPrice}
            </span>
          )}
        </div>

        <button className="flex items-center gap-1 sm:gap-2 border border-blue-500 text-blue-500 px-2 py-1.5 sm:px-3 sm:py-2 lg:px-4 rounded-lg text-xs sm:text-sm font-medium hover:bg-blue-50 transition whitespace-nowrap">
          <ShoppingCart size={14} className="sm:w-4 sm:h-4" />
          <span className="hidden sm:inline">Add</span>
        </button>
      </div>
    </div>
  );
};

export default BestProductCard;