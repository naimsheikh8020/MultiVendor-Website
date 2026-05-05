import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import PopularProductCard from "../Components/PopularProductCard";
import { useSearchProducts } from "../features/Hooks/useSearchProducts";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  // Call API for search results
  const { data: searchData, isLoading, error } = useSearchProducts(query);
  const products = Array.isArray(searchData) ? searchData : searchData?.results || [];

  if (isLoading) {
    return (
      <div className="px-4 md:px-6 py-6 text-center">
        <p className="text-gray-500">Loading results...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-4 md:px-6 py-6 text-center">
        <p className="text-red-500">Error loading search results. Please try again.</p>
      </div>
    );
  }

  return (
    <div className="px-4 md:px-6 py-6">
      <h1 className="text-2xl md:text-3xl font-bold mb-2">
        Search Results
      </h1>

      <p className="text-gray-500 mb-6">
        {products.length} products found for{" "}
        <span className="font-semibold text-gray-800">"{query}"</span>
      </p>

      {/* Product Grid */}
      {products.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {products.map((product: any) => (
            <Link key={product.id} to={`/product/${product.id}`}>
              <PopularProductCard
                id={product.id}
                image={product.thumbnail || product.image}
                title={product.name || product.title}
                category={product.category_name || product.category}
                rating={product.avg_rating || 0}
                reviewCount={product.reviews_count || 0}
                author={product.vendor_name || product.author}
                price={product.discounted_price || product.price}
                oldPrice={product.price}
                discount={product.discount}
              />
            </Link>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="text-center">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-700 mb-2">
              {query ? "No products found" : "Enter a search term"}
            </h2>
            <p className="text-gray-500 mb-6">
              {query
                ? `We couldn't find any products matching "${query}"`
                : "Try searching for a product, category, or store name"
              }
            </p>
            <Link
              to="/"
              className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
