type Product = {
  id: string;
  name: string;
  price: string;
  stock: number;
  image: string;
};

const ProductItem = ({ product }: { product: Product }) => {
  return (
    <div className="flex items-center gap-4 border border-gray-200 rounded-xl p-4 bg-white hover:shadow-sm transition">
      
      {/* Image */}
      <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Info */}
      <div>
        <h3 className="text-sm font-medium text-gray-800">
          {product.name}
        </h3>

        <p className="text-blue-600 font-semibold text-sm mt-1">
          {product.price}
        </p>

        <p className="text-xs text-gray-500 mt-1">
          Stock: {product.stock}
        </p>
      </div>
    </div>
  )
};

export default ProductItem;