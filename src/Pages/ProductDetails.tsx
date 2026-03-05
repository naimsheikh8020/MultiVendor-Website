import { useNavigate, useParams } from "react-router";
import { popularProducts } from "../assets/assets";
import { ArrowLeft, Star, Minus, Plus, ShoppingCart, Store } from "lucide-react";
import { useState } from "react";

const ProductDetails = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const product = popularProducts.find((p) => p.id === Number(productId));

  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(product?.image);

  if (!product) return <p>Product not found</p>;

  const images = [product.image, product.image2].filter(Boolean);

  const renderStars = () =>
    [...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={18}
        className={
          i < product.rating
            ? "fill-yellow-400 text-yellow-400"
            : "text-gray-300"
        }
      />
    ));

  return (
    <section className="w-full px-2 md:px-6 lg:px-6 py-10">

      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-600 mb-8 hover:text-black"
      >
        <ArrowLeft size={18} />
        Back To Shopping
      </button>

      <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-6 items-start">

        {/* LEFT IMAGE */}

        <div className="flex flex-col gap-4">

          <div className="w-full h-[500px] rounded-xl overflow-hidden bg-gray-100">
            <img
              src={activeImage}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex gap-3">
            {[product.image, product.image2].filter(Boolean).map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(img)}
                className={`rounded-lg overflow-hidden border ${activeImage === img
                  ? "border-blue-500"
                  : "border-gray-200"
                  }`}
              >
                <img
                  src={img}
                  className="w-20 h-20 object-cover"
                />
              </button>
            ))}
          </div>

        </div>

        {/* RIGHT INFO */}

        <div className="flex flex-col gap-6 pt-2">

          <h1 className="text-3xl font-semibold">
            {product.title}
          </h1>

          <div className="flex items-center gap-2">
            <div className="flex">{renderStars()}</div>

            <span className="text-gray-500 text-sm">
              {product.rating} ({product.reviewCount} reviews)
            </span>
          </div>

          <p className="text-3xl font-bold text-blue-600">
            ${product.price}
          </p>

          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Store />
            <p className="text-sm text-gray-600">
              Sold by{" "}
              <button
                onClick={() => navigate(`/stores/${product.author.toLowerCase().replace(/\s+/g, '-')}`)}
                className="text-blue-600 font-medium hover:underline cursor-pointer"
              >
                {product.author}
              </button>
            </p>
          </div>

          <p className="text-green-600 text-sm">
            In Stock (45 available)
          </p>

          {/* Quantity */}

          <div className="flex items-center gap-4">

            <span className="text-sm text-gray-600">
              Quantity
            </span>

            <div className="flex items-center border rounded-lg">

              <button
                onClick={() =>
                  setQuantity((q) => Math.max(1, q - 1))
                }
                className="px-4 py-2"
              >
                <Minus size={16} />
              </button>

              <span className="px-4">{quantity}</span>

              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="px-4 py-2"
              >
                <Plus size={16} />
              </button>

            </div>
          </div>

          {/* Add to cart */}

          <button className="flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-full hover:bg-blue-700 transition w-full">
            <ShoppingCart size={18} />
            Add to Cart
          </button>

          {/* Divider */}

          <div className="border-t pt-6 border-gray-200" >

            <h3 className="font-semibold mb-3">
              Product Description
            </h3>

            <p className="text-gray-600 leading-relaxed">
              {product.Description}
            </p>

          </div>

        </div>
      </div>
    </section>
  );
};

export default ProductDetails;