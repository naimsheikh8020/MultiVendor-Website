import React, { useState } from "react";
import { assets } from "../assets/assets";
import { Eye, EyeOff, ArrowLeft, CheckCircle } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useRegister } from "../features/auth/hooks/useRegister";
import { useVerifyOtp } from "../features/auth/hooks/useVerifyOtp";
import { useLogin } from "../features/auth/hooks/useLogin";
import { useAuthStore } from "../features/auth/store/auth.store";


const SignUp: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [currentStep, setCurrentStep] = useState<"form" | "otp" | "success">("form");
  const [otp, setOtp] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  // const [loading, setLoading] = useState(false);
  const { mutate, isPending } = useRegister();
  const { mutate: verifyMutate, isPending: verifyPending } = useVerifyOtp();
  const { mutate: loginMutate } = useLogin();
  const setAuth = useAuthStore((state) => state.setAuth);
  const navigate = useNavigate();
  

  const handleSignUp = () => {
    setError("");

    if (!name || !email || !phone || !password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!isChecked) {
      setError("Please agree to the Terms and Conditions");
      return;
    }

    mutate(
      {
        full_name: name,
        email: email,
        password: password,
        phone_number: phone,
      },
      {
        onSuccess: (res: any) => {
          console.log("SUCCESS:", res);
          setCurrentStep("otp"); // move only after success
        },
        onError: (err: any) => {
          console.log("ERROR:", err);

          setError(
            err?.response?.data?.message ||
            err?.response?.data?.detail ||
            "Registration failed"
          );
        },
      }
    );
  };

  const handleOTPVerify = () => {
  setError("");

  if (otp.length !== 4) {
    setError("Invalid OTP");
    return;
  }

  verifyMutate(
    {
      email,
      otp,
    },
    {
      onSuccess: () => {
        console.log("OTP VERIFIED");

        // 🔥 AUTO LOGIN AFTER OTP
        loginMutate(
          {
            email,
            password,
          },
          {
            onSuccess: (res: any) => {
              const data = res.data; // ✅ FIXED

              console.log("LOGIN SUCCESS", data);

              // ✅ STORE TOKEN PROPERLY
              setAuth({
                access: data.access,
                refresh: data.refresh,
                role: data.role,
              });

              // ✅ redirect AFTER token is set
              navigate("/");
            },

            onError: (err: any) => {
              setError(
                err?.response?.data?.detail ||
                "Login failed after verification"
              );
            },
          }
        );
      },

      onError: (err: any) => {
        setError(
          err?.response?.data?.detail || "Invalid OTP"
        );
      },
    }
  );
};

  const handleBackToForm = () => {
    setCurrentStep("form");
    setOtp("");
    setError("");
  };

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

          {/* FORM STEP */}
          {currentStep === "form" && (
            <>
              {/* Name */}
              <div className="mb-4">
                <label className="text-base text-gray-600 mb-1 block">
                  Name
                </label>
                <div className="flex items-center bg-[#f1f5f9] border border-gray-200 rounded-lg px-3 h-11">
                  <input
                    type="text"
                    placeholder="Enter your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent outline-none text-[14px] placeholder:text-gray-400"
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="mb-4">
                <label className="text-base text-gray-600 mb-1 block">
                  Phone
                </label>
                <div className="flex items-center bg-[#f1f5f9] border border-gray-200 rounded-lg px-3 h-11">
                  <input
                    type="tel"
                    placeholder="Enter your Phone Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
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

              {/* Error Message */}
              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}

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
                onClick={handleSignUp}
                disabled={isPending}
                className="w-full h-12 rounded-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 transition-all text-white text-[15px] font-medium flex items-center justify-center gap-2 cursor-pointer"
              >
                {isPending ? "Creating..." : "Sign Up →"}
              </button>

              {/* SIGN IN */}
              <p className="text-center text-[13px] text-gray-500 mt-5">
                Already have an account?{" "}
                <span className="text-blue-600 cursor-pointer hover:underline">
                  <Link to="/login">Sign In</Link>
                </span>
              </p>
            </>
          )}

          {/* OTP STEP */}
          {currentStep === "otp" && (
            <div className="flex flex-col items-center">
              {/* Back Button */}
              <button
                onClick={handleBackToForm}
                className="self-start mb-6 flex items-center gap-2 text-blue-600 hover:text-blue-700 transition font-medium"
              >
                <ArrowLeft size={20} />
                Back
              </button>

              {/* Title */}
              <h2 className="text-3xl font-semibold text-gray-800 mb-2 text-center">
                Verify Your Account
              </h2>
              <p className="text-gray-600 text-center mb-8">
                We've sent a 4-digit code to your email and phone
              </p>

              {/* OTP Input */}
              <div className="w-full mb-6">
                <label className="text-sm font-medium text-gray-700 mb-3 block">
                  Enter OTP Code
                </label>
                <input
                  type="text"
                  placeholder="0000"
                  maxLength={4}
                  value={otp}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d*$/.test(value)) {
                      setOtp(value);
                      setError("");
                    }
                  }}
                  className="w-full bg-[#f1f5f9] border-2 border-gray-200 rounded-xl px-4 py-4 text-center text-4xl font-bold tracking-[0.3em] outline-none focus:border-blue-600 transition"
                />
              </div>

              {/* Error Message */}
              {error && (
                <div className="w-full mb-6 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-600 text-sm text-center">{error}</p>
                </div>
              )}

              {/* Verify Button */}
              <button
                onClick={handleOTPVerify}
                disabled={verifyPending}
                className="w-full h-12 rounded-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 transition-all text-white text-[15px] font-medium flex items-center justify-center gap-2 cursor-pointer"
              >
                {verifyPending ? "Verifying..." : "Verify OTP"}
              </button>

              {/* Resend OTP */}
              <p className="text-center text-sm text-gray-600 mt-6">
                Didn't receive the code?{" "}
                <span className="text-blue-600 cursor-pointer hover:underline font-medium">
                  Resend
                </span>
              </p>
            </div>
          )}

          {/* SUCCESS STEP */}
          {currentStep === "success" && (
            <div className="flex flex-col items-center py-12">
              {/* Success Icon */}
              <div className="mb-6 flex justify-center">
                <div className="relative">
                  <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center animate-pulse">
                    <CheckCircle size={56} className="text-green-600" />
                  </div>
                </div>
              </div>

              {/* Success Message */}
              <h2 className="text-3xl font-semibold text-gray-800 mb-3 text-center">
                Account Created!
              </h2>
              <p className="text-gray-600 text-center mb-8">
                Your account has been successfully verified and created.
              </p>

              {/* Redirect Button */}
              <Link
                to="/login"
                className="w-full h-12 rounded-full bg-blue-600 hover:bg-blue-700 transition-all text-white text-[15px] font-medium flex items-center justify-center cursor-pointer"
              >
                Continue to Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignUp;