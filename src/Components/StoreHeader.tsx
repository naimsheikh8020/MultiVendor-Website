import { Star, MessageCircle } from "lucide-react";
import type { Store } from "../types/store";

interface Props {
  store: Store;
}

const StoreHeader = ({ store }: Props) => {
  return (
    <div className="max-w-7xl mx-auto mt-6 px-4">
      <div className="bg-blue-50 border border-gray-100 rounded-xl p-5 md:p-6 shadow-sm">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

          <div className="flex items-center gap-4 flex-1">
            <div className="w-14 h-14 md:w-20 md:h-20 rounded-full overflow-hidden shadow shrink-0">
              <img src={store.image} alt="store" className="w-full h-full object-cover" />
            </div>

            <div>
              <p className="text-xs md:text-sm text-gray-500">Since 2023</p>

              <h2 className="text-lg md:text-2xl font-bold text-gray-800">
                {store.title}
              </h2>

              <div className="flex items-center gap-4 mt-1 flex-wrap">
                <p className="text-gray-500 text-sm">(8 products)</p>

                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i < 4 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                    />
                  ))}
                  <span className="text-gray-500 ml-1 text-sm">(150)</span>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full md:w-auto">
            <button className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 md:py-3 rounded-full flex items-center justify-center gap-2 text-sm md:text-base transition">
              <MessageCircle size={18} />
              Chat Now
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default StoreHeader;