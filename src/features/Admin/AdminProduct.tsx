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
          { key: "Status", options: ["All", "Electronic Accessories", "Watches and Bag", "Home & Kitchen" ] },
          { key: "Role", options: ["All", "TechGear Pro", "Fashion Forward", "Fast Fashion"] },
        ]}
      />
    </div>
  );
};

export default AdminProduct;
