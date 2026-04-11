import ProductCard from "../../Components/AdminDashBoard/Products/ProductCard";
import FilterBar from "../../Components/FilterBar";

const AdminProduct = () => {
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
            key: "Status",
            options: [
              "All",
              "Electronic Accessories",
              "Watches and Bag",
              "Home & Kitchen",
            ],
          },
          {
            key: "Role",
            options: ["All", "TechGear Pro", "Fashion Forward", "Fast Fashion"],
          },
        ]}
      />
      {/* Product Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <ProductCard value={5} label="Total Products" />
        <ProductCard value={5} label="In Stock" color="green" />
        <ProductCard value={0} label="Out of Stock" color="red" />
      </div>
    </div>
  );
};

export default AdminProduct;
