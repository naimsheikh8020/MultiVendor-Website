import React, { useState } from "react";
import { assets } from "../assets/assets";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useCartStore } from "../store/cartStore";

// 🔥 NEW
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useLogin } from "../features/auth/hooks/useLogin";
import { useAuthStore } from "../features/auth/store/auth.store";


// 🔥 ZOD SCHEMA
const schema = z.object({
  email: z.string().min(1, "Email is required"),
  password: z.string().min(3, "Password must be at least 3 characters"),
});

type FormData = z.infer<typeof schema>;

const SignIn: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { clearCart, isGuestCart, markAsUserCart } = useCartStore();

  const { mutate, isPending } = useLogin();
  const setAuth = useAuthStore((state) => state.setAuth);

  // 🔥 React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  // 🔥 submit handler
  const onSubmit = (data: FormData) => {
    mutate(
      {
        email: data.email,
        password: data.password,
      },
      {
        onSuccess: (res: any) => {
          console.log("LOGIN SUCCESS:", res);

          setAuth({
            access: res.access,
            refresh: res.refresh,
            role: res.role,
          });

          // cart logic (unchanged)
          if (isGuestCart) {
            markAsUserCart();
          } else {
            clearCart();
          }

          if (res.role === "admin") navigate("/admin");
          else if (res.role === "vendor") navigate("/vendor");
          else navigate("/");
        },

        onError: (err: any) => {
          alert(
            err?.response?.data?.detail ||
              "Login failed"
          );
        },
      }
    );
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">

      {/* LEFT SIDE */}
      <div className="hidden lg:flex items-center justify-center relative overflow-hidden">
        <div className="absolute w-full bg-blue-100 rounded-full blur-3xl opacity-40"></div>

        <img
          src={assets.loginImg}
          alt="login"
          className="relative z-10 w-full xl:w-full object-contain"
        />
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center justify-center px-6 sm:px-10 md:px-16">
        <div className="w-full max-w-95">

          {/* LOGO */}
          <div className="flex flex-col items-center mb-8">
            <img src={assets.logo} alt="logo" className="w-12 h-12 mb-2" />
            <h1 className="text-4xl font-semibold text-blue-600 tracking-wide">
              MarketHub
            </h1>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>

            {/* EMAIL */}
            <div className="mb-4">
              <label className="text-base text-gray-600 mb-1 block">
                Email/Phone
              </label>
              <div className="flex items-center bg-[#f1f5f9] border border-gray-200 rounded-lg px-3 h-11">
                <input
                  {...register("email")}
                  placeholder="Enter your Email/Phone"
                  className="w-full bg-transparent outline-none text-[14px]"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* PASSWORD */}
            <div className="mb-2">
              <label className="text-base text-gray-600 mb-1 block">
                Password
              </label>

              <div className="flex items-center bg-[#f1f5f9] border border-gray-200 rounded-lg px-3 h-11">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  placeholder="Enter your Password"
                  className="w-full bg-transparent outline-none text-[14px]"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-500 hover:text-gray-700 transition"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* FORGOT */}
            <div className="flex justify-end mb-6">
              <span className="text-[13px] text-blue-600 hover:underline cursor-pointer">
                <Link to="/forgot-password">Forgot Password?</Link>
              </span>
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full h-12 rounded-full bg-blue-600 hover:bg-blue-700 transition-all text-white text-[15px] font-medium flex items-center justify-center gap-2"
            >
              {isPending ? "Signing in..." : "Sign In"}
              <span className="text-lg">→</span>
            </button>

          </form>

          {/* SIGN UP */}
          <p className="text-center text-[13px] text-gray-500 mt-5">
            Don’t have an account?{" "}
            <span className="text-blue-600 cursor-pointer hover:underline">
              <Link to="/signup">Sign Up</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;