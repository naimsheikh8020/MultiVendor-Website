import FilterBar from "../../Components/FilterBar"

const AdminRecommendedStore = () => {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="mb-1 text-lg sm:text-xl font-bold text-gray-700">
            Recommended stores
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Track and manage recommended stores
          </p>
        </div>
      </div>

       {/* SEARCH + FILTER */}
        <FilterBar showSearch/>

        {/* Recommended Stores List */}
    </div>
  )
}

export default AdminRecommendedStore
