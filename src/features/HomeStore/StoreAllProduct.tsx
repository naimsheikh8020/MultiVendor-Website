import { products, topStores } from "../../assets/assets";
import BestProductCard from "../../Components/BestProductCard";


interface Props {
  storeId: number;
  selectedCategory?: string | null;
}

const StoreAllProduct = ({ storeId, selectedCategory }: Props) => {
  const store = topStores.find((s) => s.id === storeId);

  const storeProducts = products.filter(
    (p) => p.storeId === storeId
  );

  const filteredProducts = storeProducts.filter((p) =>
    selectedCategory ? p.category === selectedCategory : true
  );

  if (filteredProducts.length === 0) {
    return (
      <div className="text-center text-gray-500 py-10">
        No products found
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">

        {filteredProducts.map((product) => (
          <BestProductCard
            key={product.id}
            id={product.id}
            image={product.image}
            title={product.title}
            category={product.category}
            rating={product.rating}
            reviews={product.reviewCount}
            seller={store?.title || "Store"} // ✅ mapping here
            price={product.price}
            oldPrice={product.oldPrice}
            discount={product.discount}
          />
        ))}

      </div>
    </div>
  );
};

export default StoreAllProduct;