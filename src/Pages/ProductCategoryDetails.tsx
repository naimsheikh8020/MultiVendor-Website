import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import PopularProductCard from "../Components/PopularProductCard";
import { useCategoryProducts } from "../features/Hooks/useCategoryProducts";

const ProductCategory = () => {
  const { categoryName } = useParams<{ categoryName: string }>();

  const { data, isLoading } = useCategoryProducts(categoryName || "");

  const products = data?.data?.results || [];

  return (
    <div className="px-4 md:px-6 py-6">

      {/* TITLE */}
      <h1 className="text-2xl md:text-3xl font-bold mb-2 capitalize">
        {categoryName}
      </h1>

      {/* COUNT */}
      <p className="text-gray-500 mb-6">
        {products.length} products found
      </p>

      {/* 🔄 LOADING */}
      {isLoading && (
        <p className="text-gray-500 mt-10">Loading...</p>
      )}

      {/* 🔥 PRODUCT GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {products.map((product: any) => (
          <Link key={product.id} to={`/product/${product.id}`}>
            <PopularProductCard
              id={product.id}
              image={
                product.thumbnail
                  ? product.thumbnail
                  : "https://via.placeholder.com/104"
              }
              title={product.name}
              category={product.category_name}
              rating={product.avg_rating || 0}
              reviewCount={product.reviews_count}
              author={product.vendor_name}
              price={product.discounted_price}
              oldPrice={product.discount ? product.price : null}
              discount={product.discount}
            />
          </Link>
        ))}
      </div>

      {/* 🔴 EMPTY STATE */}
      {!isLoading && products.length === 0 && (
        <p className="text-gray-500 mt-10">
          No products found in this category
        </p>
      )}
    </div>
  );
};

export default ProductCategory;