import { useState, useEffect } from "react";
import PayoutCard from "./PayoutCard";
import type { PayoutCardProps } from "./PayoutCard";

const payouts: PayoutCardProps[] = Array.from({ length: 500 }, (_, i) => ({
  id: `payout-${String(i + 1).padStart(3, "0")}`,
  amount: 10000 + i * 10,
  requestedAt: "10/02/2026, 16:00:00",
  processedAt: i % 2 === 0 ? "11/02/2026, 16:00:00" : undefined,
  bankName: "Chase Bank",
  accountMasked: `****${1000 + i}`,
  status: i % 2 === 0 ? "completed" : "pending",
}));

const ITEMS_PER_PAGE = 10;

const PayoutHistorySection = () => {
  const [page, setPage] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  // ✅ Detect screen size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalPages = Math.ceil(payouts.length / ITEMS_PER_PAGE);

  const start = (page - 1) * ITEMS_PER_PAGE;
  const currentData = payouts.slice(start, start + ITEMS_PER_PAGE);

  // ✅ Responsive pagination logic
  const getPages = (current: number, total: number) => {
    const pages: (number | "...")[] = [];

    // 🔹 MOBILE: only 3 buttons max
    if (isMobile) {
      if (current > 1) pages.push(current - 1);
      pages.push(current);
      if (current < total) pages.push(current + 1);
      return pages;
    }

    // 🔹 DESKTOP
    pages.push(1);

    let start = Math.max(2, current - 1);
    let end = Math.min(total - 1, current + 1);

    if (current <= 3) {
      start = 2;
      end = 4;
    }

    if (current >= total - 2) {
      start = total - 3;
      end = total - 1;
    }

    if (start > 2) pages.push("...");

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < total - 1) pages.push("...");

    if (total > 1) pages.push(total);

    return pages;
  };

  return (
    <div className="space-y-4 mt-6 bg-white p-4 sm:p-5 rounded-xl border border-gray-200 shadow-sm">
      
      <h1 className="text-lg sm:text-xl font-bold text-gray-800">
        Payout History
      </h1>

      {/* LIST */}
      <div className="space-y-4">
        {currentData.map((item) => (
          <PayoutCard key={item.id} {...item} />
        ))}
      </div>

      {/* PAGINATION */}
      <div className="flex items-center justify-between pt-4 gap-2 flex-wrap">

        {/* PREV */}
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
          className="px-3 py-1 border bg-blue-600 text-white rounded disabled:opacity-50 text-sm"
        >
          Prev
        </button>

        {/* CENTER */}
        <div className="flex flex-wrap justify-center items-center gap-2 flex-1">
          {getPages(page, totalPages).map((item, index) =>
            item === "..." ? (
              <span key={`dots-${index}`} className="px-2 text-gray-500 text-sm">
                ...
              </span>
            ) : (
              <button
                key={`page-${item}`}
                onClick={() => setPage(item)}
                className={`px-3 py-1 rounded border min-w-[36px] text-sm ${
                  page === item
                    ? "bg-blue-600 text-white"
                    : "bg-white"
                }`}
              >
                {item}
              </button>
            )
          )}
        </div>

        {/* NEXT */}
        <button
          onClick={() =>
            setPage((p) => Math.min(p + 1, totalPages))
          }
          disabled={page === totalPages}
          className="px-3 py-1 border bg-blue-600 text-white rounded disabled:opacity-50 text-sm"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PayoutHistorySection;