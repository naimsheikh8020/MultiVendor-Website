import { MapPin } from "lucide-react";

const LocationCard = () => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition">
      <h2 className="font-semibold text-lg mb-3">Location</h2>

      <div className="flex items-start gap-3 bg-gray-50 p-3 rounded-lg">
        <MapPin className="text-blue-500 mt-1" size={20} />

        <div className="text-sm">
          <p className="font-medium">Dhaka</p>
          <p className="text-gray-600">Bangladesh</p>
          <p className="text-gray-400 text-xs">
            Near Gulshan Circle, Road 12
          </p>
        </div>
      </div>
    </div>
  );
};

export default LocationCard
