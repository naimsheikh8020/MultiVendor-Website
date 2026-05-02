import { useParams } from "react-router-dom";
import PopularProductCard from "../Components/PopularProductCard";
import { Link } from "react-router-dom";
import { allProducts, topStores } from "../assets/assets";

const ProductCategory = () => {
  const { categoryName } = useParams<{ categoryName: string }>();

  // 🔥 FILTER PRODUCTS BASED ON SLUG
  const filteredProducts = allProducts.filter(
    (product) => product.category === categoryName
  );

  return (
    <div className="px-4 md:px-6 py-6">

      <h1 className="text-2xl md:text-3xl font-bold mb-2 capitalize">
        {categoryName}
      </h1>

      <p className="text-gray-500 mb-6">
        {filteredProducts.length} products found
      </p>

      {/* 🔥 PRODUCT GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {filteredProducts.map((product) => {
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
              />
            </Link>
          );
        })}
      </div>

      {/* 🔴 EMPTY STATE (IMPORTANT) */}
      {filteredProducts.length === 0 && (
        <p className="text-gray-500 mt-10">
          No products found in this category
        </p>
      )}
    </div>
  );
};

export default ProductCategory;