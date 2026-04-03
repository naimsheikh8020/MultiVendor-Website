import ProductItem from "./ProductItem";

type Product = {
  id: string;
  name: string;
  price: string;
  stock: number;
  image: string;
};

type Props = {
  products: Product[];
};

const DashboardTopProduct = ({ products }: Props) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 mt-8">

      {/* Title */}
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Top Products
      </h2>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default DashboardTopProduct;