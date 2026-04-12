import  { useState } from "react";
import { assets } from "../assets/assets";
import { Eye, EyeOff } from "lucide-react";
import {  useNavigate } from "react-router";

const VendorSignup = () => {
  const navigate = useNavigate();
  const handleNext = () => {
  localStorage.setItem("vendorStep", "1");
  navigate("/vendor-signup/store-info");
  };
  const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
  
    return (
      <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 ">
  
        {/* LEFT SIDE */}
        <div className="hidden lg:flex items-center justify-center relative overflow-hidden">
          <div className="absolute w-full  bg-blue-100 rounded-full blur-3xl opacity-40"></div>
  
          <img
            src={assets.loginImg}
            alt="login"
            className="relative z-10 w-full xl:w-full object-contain "
          />
        </div>
  
        {/* RIGHT SIDE */}
        <div className="flex items-center justify-center px-6 sm:px-10 md:px-16">
          <div className="w-full max-w-95">
  
            {/* LOGO + TITLE */}
            <div className="flex flex-col items-center mb-8">
              <img
                src={assets.logo}
                alt="logo"
                className="w-12 h-12 mb-2"
              />
              <h1 className="text-4xl font-semibold text-blue-600 tracking-wide">
                MarketHub
              </h1>
            </div>
  
            {/* Name */}
            <div className="mb-4">
              <label className="text-base text-gray-600 mb-1 block">
                Name
              </label>
              <div className="flex items-center bg-[#f1f5f9] border border-gray-200 rounded-lg px-3 h-11">
                <input
                  type="text"
                  placeholder="Enter your Name"
                  className="w-full bg-transparent outline-none text-[14px] placeholder:text-gray-400"
                />
              </div>
            </div>
  
            {/* Email */}
            <div className="mb-4">
              <label className="text-base text-gray-600 mb-1 block">
                Email
              </label>
              <div className="flex items-center bg-[#f1f5f9] border border-gray-200 rounded-lg px-3 h-11">
                <input
                  type="email"
                  placeholder="Enter your Email"
                  className="w-full bg-transparent outline-none text-[14px] placeholder:text-gray-400"
                />
              </div>
            </div>
            
  
            {/* PASSWORD */}
            <div className="mb-4">
              <label className="text-base text-gray-600 mb-1 block">
                Password
              </label>
  
              <div className="flex items-center bg-[#f1f5f9] border border-gray-200 rounded-lg px-3 h-11">
  
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your Password"
                  className="w-full bg-transparent outline-none text-[14px]"
                />
  
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-500 hover:text-gray-700 transition"
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
  
              </div>
            </div>
  
            {/* Confirm PASSWORD */}
            <div className="mb-4">
              <label className="text-base text-gray-600 mb-1 block">
                Confirm Password
              </label>
  
              <div className="flex items-center bg-[#f1f5f9] border border-gray-200 rounded-lg px-3 h-11">
  
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your Password"
                  className="w-full bg-transparent outline-none text-[14px]"
                />
  
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="text-gray-500 hover:text-gray-700 transition"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
  
              </div>
            </div>
  
            <div className="flex items-center mb-6 gap-2">
              <input
                type="checkbox"
                id="terms"
                checked={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
                className="w-4 h-4 accent-blue-600 cursor-pointer"
              />
  
              <label
                htmlFor="terms"
                className="text-[13px] text-gray-600 cursor-pointer"
              >
                I agree to the Terms and Conditions
              </label>
  
            </div>
  
            {/* BUTTON */}
            <button 
            onClick={handleNext}
            className="w-full h-12 rounded-full bg-blue-600 hover:bg-blue-700 transition-all text-white text-[15px] font-medium flex items-center justify-center gap-2 cursor-pointer">
              Sign Up  
              <span className="text-lg">→</span>
            </button>
  
          
          </div>
        </div>
      </div>
    );
  };

export default VendorSignup
