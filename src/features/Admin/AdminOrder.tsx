import ProductCard from "../../Components/AdminDashBoard/Products/ProductCard";
import FilterBar from "../../Components/FilterBar";

const AdminOrder = () => {
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="mb-1 text-lg sm:text-xl font-bold text-gray-700">
            Order Management
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Manage all orders across the platform
          </p>
        </div>
      </div>

      {/* SEARCH + FILTER */}
      <FilterBar
        filters={[
          {
            key: "All Status",
            options: [
              "Pending",
              "Processing",
              "Shipped",
              "Delivered",
              "Cancelled",
            ],
          },
          {
            key: "All Vendors",
            options: ["TechGear Pro", "Fashion Forward", "Fast Fashion"],
          },
        ]}
      />

      {/* Order Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-6 gap-4">
        <ProductCard value={5} label="Total Order" />
        <ProductCard value={0} label="Pending" color="yellow" />
        <ProductCard value={1} label="Processing" color="blue" />
        <ProductCard value={0} label="Shipped" color="purple" />
        <ProductCard value={1} label="Cancelled" color="red" />
        <ProductCard value={3} label="Delivered" color="green" />
      </div>
    </div>
  );
};

export default AdminOrder;
