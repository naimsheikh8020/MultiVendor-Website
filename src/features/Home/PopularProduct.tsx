import { popularProducts, topStores } from "../../assets/assets"
import PopularProductCard from "../../Components/PopularProductCard"
import { Link } from "react-router-dom"

const PopularProduct = () => {
  return (
    <>
      <div className="py-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-6 sm:mb-8 md:mb-10">Popular Products</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
          {
            popularProducts.map((product) => {
              const store = topStores.find(s => s.id === product.storeId);
              return (
                <Link key={product.id} to={`/product/${product.id}`}>
                  <PopularProductCard
                    id={product.id}
                    image={product.image}
                    title={product.title}
                    category={product.category}
                    rating={product.rating}
                    reviewCount={product.reviewCount}
                    author={store?.title || product.author}
                    price={product.price}
                    oldPrice={product.oldPrice}
                    discount={product.discount}
                    onAddToCart={(e) => {
                      e.preventDefault();
                      console.log(`Added ${product.title} to cart`);
                    }}
                  />
                </Link>
              );
            })
          }
        </div>
      </div>
    </>
  )
}

export default PopularProduct
