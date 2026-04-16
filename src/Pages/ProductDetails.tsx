import { Link } from "react-router";
import ProductDetailsTopSection from "../features/ProductDetails/ProductDetailsTopSection"
import { popularProducts, topStores } from "../assets/assets";
import PopularProductCard from "../Components/PopularProductCard";

const ProductDetails = () => {
  return (
    <div>
      <ProductDetailsTopSection />
      <div className="">
        <h2 className="text-2xl  sm:text-3xl md:text-4xl md:px-6 font-bold text-gray-800 md:mb-10 ">Related Product</h2>

        <div className="grid grid-cols-2 md:px-6  mb-4 md:mb-8 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8 ">
          {
            popularProducts.slice(0, 5).map((product) => {
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
    </div>
  )
}

export default ProductDetails
