type Props = {
  page: number;
  setPage: (val: number) => void;
  totalPages: number;
};

const Pagination = ({ page, setPage, totalPages }: Props) => {
  return (
    <div className="flex items-center justify-between px-4 py-3">
      
      {/* PREVIOUS */}
      <button
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
        className={`px-3 py-1 text-sm rounded-md cursor-pointer ${
          page === 1
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-gray-100 hover:bg-gray-200"
        }`}
      >
        ← Previous
      </button>

      {/* PAGE INFO */}
      <p className="text-sm text-gray-500">
        Page {page} of {totalPages}
      </p>

      {/* NEXT */}
      <button
        disabled={page === totalPages}
        onClick={() => setPage(page + 1)}
        className={`px-3 py-1 text-sm rounded-md cursor-pointer ${
          page === totalPages
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-gray-100 hover:bg-gray-200"
        }`}
      >
        Next →
      </button>
    </div>
  );
};

export default Pagination;