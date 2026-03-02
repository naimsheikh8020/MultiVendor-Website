import { Link } from "react-router"
import { categories } from "../../assets/assets"

const TopCategory = () => {
  return (
    <>
      <div className="py-6 px-8">
        <h2 className="text-4xl font-bold text-gray-800 mb-10">Top Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-8">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/category/${category.slug}`}
              className="flex flex-col items-center text-center group"
            >
              <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 xl:w-40 xl:h-40 rounded-full overflow-hidden shadow-sm">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>

              <p className="mt-4 font-medium text-sm md:text-base">
                {category.name}
              </p>
              <p className="text-xs md:text-sm text-gray-500">
                {category.items} items
              </p>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}

export default TopCategory
