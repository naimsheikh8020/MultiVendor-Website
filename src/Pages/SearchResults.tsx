import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import PopularProductCard from "../Components/PopularProductCard";
import { allProducts, popularProducts, bestProducts, topStores } from "../assets/assets";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  // Combine all product arrays and remove duplicates
  const allSearchableProducts = [
    ...allProducts,
    ...popularProducts,
    ...bestProducts.map(p => ({
      ...p,
      reviewCount: p.reviews || 0,
      author: p.seller || "Unknown"
    }))
  ];

  // Remove duplicates based on ID
  const uniqueProducts = Array.from(
    new Map(allSearchableProducts.map(product => [product.id, product])).values()
  );

  // Filter products based on search query (search in title and category)
  const filteredProducts = query.trim() ? uniqueProducts.filter((product) => {
    const searchLower = query.toLowerCase();
    const titleMatch = product.title?.toLowerCase().includes(searchLower);
    const categoryMatch = product.category?.toLowerCase().includes(searchLower);
    const authorMatch = product.author?.toLowerCase().includes(searchLower);

    return titleMatch || categoryMatch || authorMatch;
  }) : [];

  return (
    <div className="px-4 md:px-6 py-6">
      <h1 className="text-2xl md:text-3xl font-bold mb-2">
        Search Results
      </h1>

      <p className="text-gray-500 mb-6">
        {filteredProducts.length} products found for{" "}
        <span className="font-semibold text-gray-800">"{query}"</span>
      </p>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
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
