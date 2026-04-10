import { Link } from "react-router";

export type VendorStatusItem = {
  id: string;
  name: string;
  owner: string;
  status: "approved" | "pending";
};

export const VendorStatus = ({ data }: { data: VendorStatusItem[] }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 mt-4 shadow">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-gray-800">Vendor Status</h3>
        <Link to={'/admin/vendor-requests'}><span className="text-sm text-blue-600 cursor-pointer">View All</span></Link>
      </div>

      <div className="flex flex-col gap-3">
        {data.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center border border-gray-200 rounded-lg p-4"
          >
            <div>
              <p className="text-sm font-medium text-gray-800">
                {item.name}
              </p>
              <p className="text-xs text-gray-500">{item.owner}</p>
            </div>

            <span
              className={`text-xs px-3 py-1 rounded-full font-medium ${
                item.status === "approved"
                  ? "bg-green-100 text-green-600"
                  : "bg-yellow-100 text-yellow-600"
              }`}
            >
              {item.status === "approved" ? "Approved" : "Pending"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};