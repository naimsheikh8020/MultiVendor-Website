import { assets } from "../../assets/assets";
import AdminProductTable from "../../Components/AdminDashBoard/Products/AdminProductTable";
import ProductCard from "../../Components/AdminDashBoard/Products/ProductCard";
import FilterBar from "../../Components/FilterBar";

const AdminProduct = () => {
  const products: Array<{
    id: number;
    name: string;
    image: string;
    store: string;
    category: string;
    price: number;
    stock: number;
    status: "In Stock" | "Out of Stock";
  }> = Array.from({ length: 500 }, (_, i) => ({
    id: i + 1,
    name: `Product ${i + 1}`,
    image: assets.HeadPhone,
    store: ["TechGear Pro", "Fashion Forward", "Boom"][i % 3],
    category: ["Electronic Accessories", "Watches & Bags", "Home & Kitchen"][
      i % 3
    ],
    price: Number((Math.random() * 1000 + 50).toFixed(2)),
    stock: Math.floor(Math.random() * 100),
    status: Math.random() > 0.2 ? "In Stock" : "Out of Stock",
  }));


  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="mb-1 text-lg sm:text-xl font-bold text-gray-700">
            Product Management
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Manage all products across vendors
          </p>
        </div>
      </div>

      {/* SEARCH + FILTER */}
      <FilterBar
        filters={[
          {
            key: "All Categories",
            options: [
              "Electronic Accessories",
              "Watches and Bag",
              "Home & Kitchen",
            ],
          },
          {
            key: "All Vendors",
            options: ["TechGear Pro", "Fashion Forward", "Fast Fashion"],
          },
        ]}
      />
      {/* Product Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <ProductCard value={5} label="Total Products" />
        <ProductCard value={5} label="In Stock" color="green" />
        <ProductCard value={0} label="Out of Stock" color="red" />
      </div>

      {/* Product List */}
      <AdminProductTable data={products} />
    </div>
  );
};

export default AdminProduct;
