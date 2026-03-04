import {  bestProducts } from "../../assets/assets"
import BestProductCard from "../../Components/BestProductCard"

const BestProduct = () => {
  return (
    <>
      <div className="py-6">
        <h2 className="text-4xl font-bold text-gray-800 mb-10">Best Offer</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
          {
            bestProducts.map((i)=>(
              <BestProductCard
                key={i.id}
                image={i.image}
                title={i.title}
                category={i.category}
                rating={i.rating}
                reviews={i.reviews}
                seller={i.seller}
                price={i.price}
                oldPrice={i.oldPrice}
                discount={i.discount}/>
            ))
          }
         
          

        </div>
      </div>
    </>
  )
}

export default BestProduct
