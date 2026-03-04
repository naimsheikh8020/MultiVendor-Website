import { Star } from "lucide-react";

interface TopStoreCardProps {
  year: string
  title: string
  products: number
  rating: number
  reviews: number
  image: string
}

const TopStoreCard = ({
  year,
  title,
  products,
  rating,
  reviews,
  image
}: TopStoreCardProps) => {
  return (
    <div className="w-full rounded-xl border border-gray-200 bg-gray-50 p-3 sm:p-4 md:p-5 lg:p-6 flex flex-row items-center justify-between gap-2 sm:gap-3 md:gap-4">

      {/* Left Content */}
      <div className="flex flex-col gap-1 sm:gap-2 text-left flex-1 min-w-0">

        <p className="text-gray-500 text-[10px] sm:text-xs md:text-sm">
          {year}
        </p>

        <h2 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-gray-900 truncate">
          {title}
        </h2>

        <p className="text-gray-500 text-[10px] sm:text-xs md:text-sm">
          ({products} products)
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1 sm:gap-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={12}
                className={
                  i < rating
                    ? "fill-yellow-400 text-yellow-400 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4"
                    : "text-gray-300 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4"
                }
              />
            ))}
          </div>

          <span className="text-gray-500 text-[10px] sm:text-xs md:text-sm">
            ({reviews})
          </span>
        </div>

      </div>

      {/* Right Image */}
      <div className="flex-shrink-0">
        <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full overflow-hidden shadow-md">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

    </div>
  )
}

export default TopStoreCard

