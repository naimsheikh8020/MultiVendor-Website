
import { assets } from "../../assets/assets"

const highlights = [
  {
    icon: assets.Best_Price,
    title: "Best Prices & Deals",
    desc: "Dont miss our daily amazing deals and prices",
  },
  {
    icon: assets.Refund,
    title: "Refundable",
    desc: "If your items have damage we agree to refund it",
  },
  {
    icon: assets.Shipping,
    title: "Free delivery",
    desc: "Do purchase over $50 and get free delivery anywhere",
  },
]

const PlatformHighlights = () => {
  return (
    <section className="py-20 ">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        {highlights.map((item, i) => (
          <div
            key={i}
            className="flex items-start gap-4 md:justify-center"
          >
            {/* Icon */}
            <img
              src={item.icon}
              alt={item.title}
              className="w-15 h-15 object-contain"
            />

            {/* Text */}
            <div className="space-y-1">
              <h4 className="font-semibold text-2xl text-gray-700">
                {item.title}
              </h4>
              <p className="text-base text-gray-500 leading-relaxed max-w-xs">
                {item.desc}
              </p>
            </div>
          </div>
        ))}

      </div>
    </section>
  )
}

export default PlatformHighlights

