import { useState, useMemo } from "react";
import { Search, Eye, Check, X } from "lucide-react";

type VendorRequest = {
  id: string;
  name: string;
  email: string;
  store: string;
  joined: string;
  status: "pending" | "approved";
  phone: string;
};

// generate 500 items
const generateData = (): VendorRequest[] => {
  return Array.from({ length: 500 }, (_, i) => ({
    id: String(i + 1),
    name: "John Smith",
    phone: `+8801${String(10000000 + i)}`, 
    email: `user${i + 1}@mail.com`,
    store: `Store ${i + 1}`,
    joined: "15/01/2024",
    status: i % 3 === 0 ? "approved" : "pending",
  }));
};

const allData = generateData();

const VendorRequestTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  const itemsPerPage = 10;

  // 🔥 filter data (search)
  const filteredData = useMemo(() => {
    return allData.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.email.toLowerCase().includes(search.toLowerCase()) ||
      item.store.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const currentData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const nextPage = () =>
    currentPage < totalPages && setCurrentPage((p) => p + 1);

  const prevPage = () =>
    currentPage > 1 && setCurrentPage((p) => p - 1);

  return (
    <div className="space-y-4">
      {/* SEARCH */}
      <div className="bg-white p-3 rounded-xl shadow-sm">
        <div className="relative">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1); // reset page
            }}
            placeholder="Search..."
            className="w-full border border-gray-200 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* TABLE (Desktop) */}
      <div className="bg-white border rounded-lg border-gray-200 shadow mt-6">
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500 text-left">
              <tr>
                <th className="p-3">Vendor Info</th>
                <th className="p-3">Phone</th>
                <th className="p-3">Store</th>
                <th className="p-3">Joined</th>
                <th className="p-3">Status</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {currentData.map((item) => (
                <tr key={item.id} className="border-t border-gray-200 hover:bg-gray-50">
                  <td className="p-3">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-xs text-gray-500">
                      {item.email}
                    </p>
                  </td>
                  <td className="p-3 text-gray-600">{item.phone}</td> 
                  <td className="p-3">{item.store}</td>
                  <td className="p-3">{item.joined}</td>

                  <td className="p-3">
                    <span
                      className={`px-3 py-1 text-xs rounded-full ${
                        item.status === "approved"
                          ? "bg-green-100 text-green-600"
                          : "bg-yellow-100 text-yellow-600"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td className="p-3">
                    <div className="flex gap-2 ">
                      <button className="p-2 cursor-pointer border border-gray-200 rounded-lg hover:bg-gray-100">
                        <Eye className="text-green-700" size={16} />
                      </button>
                      <button className="p-2 cursor-pointer border border-gray-200 rounded-lg hover:bg-green-50">
                        <Check size={16} className="text-green-600" />
                      </button>
                      <button className="p-2 cursor-pointer border border-gray-200 rounded-lg hover:bg-red-50">
                        <X size={16} className="text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* MOBILE (Card View) */}
        <div className="md:hidden flex flex-col gap-3 p-3">
          {currentData.map((item) => (
            <div
              key={item.id}
              className="border border-gray-200 rounded-lg p-3 space-y-2"
            >
              <div className="flex justify-between">
                <p className="font-medium">{item.name}</p>
                <span
                  className={`text-xs px-2 py-1 rounded ${
                    item.status === "approved"
                      ? "bg-green-100 text-green-600"
                      : "bg-yellow-100 text-yellow-600"
                  }`}
                >
                  {item.status}
                </span>
              </div>

              <p className="text-xs text-gray-500">{item.email}</p>
              <p className="text-sm">Store: {item.store}</p>

              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">
                  {item.joined}
                </span>

                <div className="flex gap-2">
                  <Eye size={16} />
                  <Check size={16} className="text-green-600" />
                  <X size={16} className="text-red-600" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* PAGINATION */}
        <div className="flex justify-between items-center p-4 text-sm mt-6">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className="px-3 py-1 border border-gray-200 cursor-pointer rounded-lg disabled:opacity-50"
          >
            ← Previous
          </button>

          <span className="text-gray-500">
            {currentPage} / {totalPages}
          </span>

          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border border-gray-200 cursor-pointer rounded-lg disabled:opacity-50"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
};

export default VendorRequestTable;