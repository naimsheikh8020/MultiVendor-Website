import { assets } from "../assets/assets";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full bg-[#081228] px-4 md:px-8 py-8 overflow-x-hidden">
      <div className="grid md:grid-cols-4 gap-6 py-8">

        {/* Brand */}
        <div>
          <img src={assets.logo} alt="Company logo" />
          <p className="text-white text-lg mt-4 w-full ">
            Your trusted multi-vendor marketplace for quality products from verified sellers.
          </p>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="text-white font-medium text-2xl">
            Customer Service
          </h3>
          <ul className="mt-8 text-white flex flex-col gap-3">
            {["Help Center", "Returns & Refunds", "Shipping Info", "Contact Us"].map(
              (item) => (
                <li
                  key={item}
                  className="text-lg cursor-pointer hover:text-gray-200"
                >
                  {item}
                </li>
              )
            )}
          </ul>
        </div>

        {/* Sellers */}
        <div>
          <h3 className="text-white font-medium text-2xl">
            For Sellers
          </h3>
          <ul className="mt-8 text-white flex flex-col gap-3">
            {["Vendor Login", "Start Selling"].map((item) => (
              <li
                key={item}
                className="text-lg cursor-pointer hover:text-gray-200"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-white font-medium text-2xl">
            Follow Us
          </h3>
          <div className="mt-8 text-white flex gap-3">
            {[Facebook, Instagram, Twitter, Youtube].map((Icon, index) => (
              <Icon
                key={index}
                size={24}
                className="cursor-pointer hover:text-gray-200"
              />
            ))}
          </div>
        </div>

      </div>
      <p className="text-white text-center py-4">
        &copy; {new Date().getFullYear()} AbabilMall. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;