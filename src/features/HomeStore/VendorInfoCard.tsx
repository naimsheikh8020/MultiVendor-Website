const VendorInfoCard = () => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
      <h2 className="font-semibold text-lg mb-3">Vendor information</h2>

      <div className="bg-gray-50 rounded-lg p-3 space-y-1 text-sm">
        <p className="font-medium">John Doe</p>
        <p className="text-gray-600">Email: john.doe@example.com</p>
        <p className="text-gray-600">Gender: Male</p>
        <p className="text-gray-600">Phone: +1 234 567 8900</p>
      </div>
    </div>
  );
};

export default VendorInfoCard
