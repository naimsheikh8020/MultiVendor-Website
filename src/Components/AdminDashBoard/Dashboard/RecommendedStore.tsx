import { useState } from "react";
import { Link } from "react-router";

type RecommendedItem = {
  id: string;
  name: string;
  owner: string;
  enabled: boolean;
};

type Props = {
  data: RecommendedItem[];
};

const RecommendedStore = ({ data }: Props) => {
  const [items, setItems] = useState(data);

  const handleToggle = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, enabled: !item.enabled }
          : item
      )
    );
  };

  return (
    <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-5 mt-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-gray-800">
          Recommended Store
        </h3>
        <Link to={'/admin/recommended'}>
          <span className="text-sm text-blue-600 cursor-pointer">
            View All
          </span>
        </Link>
      </div>

      {/* List */}
      <div className="flex flex-col gap-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center border border-gray-200 rounded-lg p-3"
          >
            {/* Left */}
            <div>
              <p className="text-sm font-medium text-gray-800">
                {item.name}
              </p>
              <p className="text-xs text-gray-500">
                {item.owner}
              </p>
            </div>

            {/* Toggle */}
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={item.enabled}
                onChange={() => handleToggle(item.id)}
              />

              <div className="relative cursor-pointer w-9 h-5 bg-gray-300 rounded-full peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-4"></div>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedStore;