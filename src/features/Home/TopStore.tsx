import { assets, topStores } from "../../assets/assets"
import TopStoreCard from "../../Components/TopStoreCard"

const TopStore = () => {
  return (
    <>
      <div className="py-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-6 sm:mb-8 md:mb-10">Top Store</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-6">
          {
            topStores.map(store => (
              <TopStoreCard
                key={store.id}
                year={store.label}
                title={store.title}
                products={store.products}
                rating={store.rating}
                reviews={store.reviews}
                image={store.image} />
            ))
          }
          <TopStoreCard
            year="Since 2023"
            title="Just Look"
            products={6}
            rating={4}
            reviews={100}
            image={assets.Laptop}
          />
        </div>
      </div>
    </>
  )
}

export default TopStore
