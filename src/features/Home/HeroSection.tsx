import { assets } from '../../assets/assets'

const HeroSection = () => {
  return (
    <section className="w-full ">
      <div className="grid grid-cols-1 lg:grid-cols-3 lg:grid-rows-2 gap-4">

        {/* LEFT HERO */}
        <div className="lg:col-span-2 lg:row-span-2 bg-blue-200 rounded-xl p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between">

          {/* Content */}
          <div className="max-w-lg flex flex-col gap-5 text-center md:text-left">
            <p className="text-sm">
              Exclusive Offer{" "}
              <span className="px-3 py-1 text-xs bg-[#FFF1F0] text-[#FB564B] rounded-full">
                40% Off
              </span>
            </p>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
              <span className="text-orange-500">100%</span>{" "}
              <span className="text-blue-700">Organic</span>
            </h1>

            <p className="text-gray-700 text-sm sm:text-base">
              Fresh, Natural, and Delicious - Nourishing Both Body
              and Soul with Every Bite.
            </p>

            <div className="flex justify-center md:justify-start gap-3 items-center">
              <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-full font-medium hover:bg-blue-600 hover:text-white transition-all cursor-pointer">
                Shop Now
              </button>
            </div>
          </div>

          {/* Image */}
          <div className="mt-6 md:mt-0 flex justify-center">
            <img
              src={assets.Hero_phone}
              alt="Hero Phone"
              className="w-50 md:w-full object-contain"
            />
          </div>
        </div>

        {/* RIGHT TOP CARD */}
        <div className="bg-blue-200 rounded-xl p-6 flex items-center justify-between">
          <div>
            <p className=" text-gray-700 mb-3 text-xl">
              <span className="text-red-500 font-semibold ">45%</span> OFF
            </p>
            <h3 className="font-bold text-blue-700 text-2xl mb-3">Vegatable</h3>
            <p className="text-gray-700 text-base">
              We deliver organic Vegetables & Fruits
            </p>

            <button className="px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-medium cursor-pointer transition-colors mt-6 hover:bg-transparent hover:text-blue-600 border border-blue-600">
              Shop Now
            </button>
          </div>

          <img
            src={assets.hero_vegetable}
            alt="Product"
            className="w-30 md:w-50 object-contain"
          />
        </div>

        {/* RIGHT BOTTOM CARD */}
        <div className="bg-blue-200 rounded-xl p-6 flex items-center justify-between">
          <div>
            <p className=" text-gray-700 mb-3 text-xl">
              <span className="text-red-500 font-semibold ">45%</span> OFF
            </p>
            <h3 className="font-bold text-blue-700 text-2xl mb-3">Vegatable</h3>
            <p className="text-gray-700 text-base">
              We deliver organic Vegetables & Fruits
            </p>

            <button className="px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-medium cursor-pointer transition-colors mt-6 hover:bg-transparent hover:text-blue-600 border border-blue-600">
              Shop Now
            </button>
          </div>

          <img
            src={assets.Hero_headPhone}
            alt="Product"
            className="w-30 md:w-50 object-contain"
          />
        </div>

      </div>
    </section>
  )
}

export default HeroSection
