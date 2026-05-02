import { useState, useEffect } from "react";
import { assets } from "../assets/assets";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../features/auth/store/auth.store";

const VendorLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Use selectors for better subscription management
  const accessToken = useAuthStore((state) => state.accessToken);
  const role = useAuthStore((state) => state.role);
  const setAuth = useAuthStore((state) => state.setAuth);
  const setHydrated = useAuthStore((state) => state.setHydrated);

  // Navigate after auth is properly set
  useEffect(() => {
    if (accessToken && role) {
      console.log("Auth confirmed - navigating with role:", role);
      if (role === "admin") {
        navigate("/admin");
      } else if (role === "vendor") {
        navigate("/vendor");
      } else {
        navigate("/");
      }
    }
  }, [accessToken, role, navigate]);

  const handleLogin = () => {
    setError("");

    if (!email || !password) {
      setError("Enter email and password");
      return;
    }

    let userRole: "admin" | "vendor" | "user" = "user";

    if (email === "admin@gmail.com" && password === "123") {
      userRole = "admin";
    } else if (email === "vendor@gmail.com" && password === "123") {
      userRole = "vendor";
    } else {
      setError("Invalid email or password");
      return;
    }

    console.log("Setting auth with role:", userRole);

    // 🔥 Set auth in Zustand store
    setAuth({
      access: `mock_token_${userRole}_${Date.now()}`,
      refresh: `mock_refresh_${userRole}_${Date.now()}`,
      role: userRole,
    });

    // 🔥 Mark store as hydrated
    setHydrated();
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

          {/* LOGO + TITLE */}
          <div className="flex flex-col items-center mb-8">
            <img src={assets.logo} alt="logo" className="w-12 h-12 mb-2" />
            <h1 className="text-4xl font-semibold text-blue-600 tracking-wide">
              MarketHub
            </h1>
          </div>

          {/* EMAIL */}
          <div className="mb-4">
            <label className="text-base text-gray-600 mb-1 block">
              Email/Phone
            </label>
            <div className="flex items-center bg-[#f1f5f9] border border-gray-200 rounded-lg px-3 h-11">
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your Email/Phone"
                className="w-full bg-transparent outline-none text-[14px] placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* PASSWORD */}
          <div className="mb-2">
            <label className="text-base text-gray-600 mb-1 block">
              Password
            </label>

            <div className="flex items-center bg-[#f1f5f9] border border-gray-200 rounded-lg px-3 h-11">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
          </div>

          {/* ERROR MESSAGE */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
              {error}
            </div>
          )}

          {/* FORGOT */}
          <div className="flex justify-end mb-6">
            <span className="text-[13px] text-blue-600 hover:underline cursor-pointer">
              <Link to="/forgot-password">Forgot Password?</Link>
            </span>
          </div>

          {/* BUTTON */}
          <button
            onClick={handleLogin}
            className="w-full h-12 rounded-full bg-blue-600 hover:bg-blue-700 transition-all text-white text-[15px] font-medium flex items-center justify-center gap-2"
          >
            Sign In
            <span className="text-lg">→</span>
          </button>

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

export default VendorLogin
