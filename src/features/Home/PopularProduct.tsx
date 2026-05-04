import { Link } from "react-router-dom";
import PopularProductCard from "../../Components/PopularProductCard";
import { useProducts } from "../Hooks/useProducts";

const PopularProduct = () => {
  const { data, isLoading } = useProducts();

  const products = data?.data || [];

  if (isLoading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div className="py-6">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-6 sm:mb-8 md:mb-10">
        Popular Products
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8">

        {products.map((product: any) => (
          <Link key={product.id} to={`/product/${product.id}`}>
            <PopularProductCard
              id={product.id}
              image={
                product.thumbnail
                  ? product.thumbnail
                  : "https://via.placeholder.com/300"
              }
              title={product.name}
              category={product.category_name}
              rating={product.avg_rating || 0}
              reviewCount={product.reviews_count}
              author={product.vendor_name}
              price={product.discounted_price}
              oldPrice={product.discount ? product.price : null}
              discount={product.discount}
              onAddToCart={(e) => {
                e.preventDefault();
                console.log(`Added ${product.name}`);
              }}
            />
          </Link>
        ))}

      </div>
    </div>
  );
};

export default PopularProduct;