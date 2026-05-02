import { Link, useParams } from "react-router-dom";
import ProductDetailsTopSection from "../features/ProductDetails/ProductDetailsTopSection";
import PopularProductCard from "../Components/PopularProductCard";
import { useProductDetails } from "../features/Hooks/useProductDetails";

const ProductDetails = () => {
  const { productId } = useParams<{ productId: string }>();

  const { data, isLoading } = useProductDetails(productId || "");

  const product = data?.data;

  if (isLoading) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  if (!product) {
    return <div className="p-10 text-center">Product not found</div>;
  }

  return (
    <div>
      {/* 🔥 PASS REAL DATA */}
      <ProductDetailsTopSection product={product} />

      {/* 🔥 RELATED PRODUCTS (TEMP: SAME CATEGORY / MOCK) */}
      <div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl md:px-6 font-bold text-gray-800 md:mb-10">
          Related Product
        </h2>

        <div className="grid grid-cols-2 md:px-6 mb-4 md:mb-8 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8">

          {product.you_may_also_like?.map((item: any) => (
            <Link key={item.id} to={`/product/${item.id}`}>
              <PopularProductCard
                id={item.id}
                image={
                  item.thumbnail
                    ? item.thumbnail
                    : "https://via.placeholder.com/300"
                }
                title={item.name}
                category={item.category_name}
                rating={item.avg_rating || 0}
                reviewCount={item.reviews_count}
                author={item.vendor_name}
                price={item.discounted_price}
                oldPrice={item.discount ? item.price : null}
                discount={item.discount}
                onAddToCart={(e) => {
                  e.preventDefault();
                  console.log(`Added ${item.name} to cart`);
                }}
              />
            </Link>
          ))}

        </div>
      </div>
    </div>
  );
};

export default ProductDetails;