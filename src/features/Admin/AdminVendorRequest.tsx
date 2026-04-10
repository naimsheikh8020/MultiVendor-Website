import VendorRequestTable from "../../Components/AdminDashBoard/VendorRequest/VendorRequestTable"

const AdminVendorRequest = () => {
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="mb-1 text-lg sm:text-xl font-bold text-gray-700">
            Vandor Request
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
           Manage vendors
          </p>
        </div>
      </div>
      <VendorRequestTable />
    </div>
  )
}

export default AdminVendorRequest
