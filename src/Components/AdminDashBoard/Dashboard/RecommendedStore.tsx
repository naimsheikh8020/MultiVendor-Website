import { useState } from "react";
import { Link } from "react-router";

export type Store = {
  id: string;
  name: string;
  owner: string;
  enabled: boolean;
};

type Props = {
  data: Store[];
};

const RecommendedStore = ({ data }: Props) => {
  const [stores, setStores] = useState(data);

  const toggleStore = (id: string) => {
    setStores((prev) =>
      prev.map((store) =>
        store.id === id
          ? { ...store, enabled: !store.enabled }
          : store
      )
    );
  };

  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-200 w-full mt-4">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Recommended Store
        </h2>
        <Link
          to="/admin/recommended"
          className="text-sm text-blue-600 hover:underline"
        >
          View All
        </Link>
      </div>

      {/* Store List */}
      <div className="space-y-4">
        {stores.map((store) => (
          <div
            key={store.id}
            className="flex items-center justify-between border border-gray-200 rounded-xl px-4 py-3"
          >
            {/* Text */}
            <div>
              <h3 className="text-sm font-semibold text-gray-800">
                {store.name}
              </h3>
              <p className="text-sm text-gray-500">
                {store.owner}
              </p>
            </div>

            {/* Toggle */}
            <button
              onClick={() => toggleStore(store.id)}
              className={`relative w-10 h-5 rounded-full cursor-pointer transition ${
                store.enabled ? "bg-blue-600" : "bg-gray-300"
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition transform ${
                  store.enabled ? "translate-x-5" : ""
                }`}
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedStore;
