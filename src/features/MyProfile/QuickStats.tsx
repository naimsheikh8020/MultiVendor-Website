const QuickStats = () => {
  return (
    <div className="bg-white border rounded-xl p-6">

      <h2 className="font-semibold text-gray-800 mb-4">
        Quick Stats
      </h2>

      <div className="space-y-3 text-sm">

        <div className="flex justify-between">
          <span className="text-gray-500">Total Orders</span>
          <span className="font-semibold">3</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">Saved Addresses</span>
          <span className="font-semibold">2</span>
        </div>

      </div>

    </div>
  )
}

export default QuickStats