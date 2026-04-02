import React, { useState } from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

const ForgotPassword: React.FC = () => {
  const [step, setStep] = useState<"email" | "otp" | "reset">("email");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [error, setError] = useState("");
  const inputsRef = React.useRef<Array<HTMLInputElement | null>>([]);

  return (
    <div>
      <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 ">

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

            {/* TITLE */}
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Forgot Password?
            </h2>
            <p className="text-gray-600 mb-4">
              Don't worry! It happens. Please enter the email address or phone number associated with your account.
            </p>

            {/* STEP 1: EMAIL */}
            {step === "email" && (
              <>
                <div className="mb-4">
                  <label className="text-base text-gray-600 mb-1 block">
                    Email/Phone
                  </label>
                  <div className="flex items-center bg-[#f1f5f9] border border-gray-200 rounded-lg px-3 h-11">
                    <input
                      type="text"
                      placeholder="Enter your Email/Phone"
                      className="w-full bg-transparent outline-none text-[14px]"
                    />
                  </div>
                </div>

                <button
                  onClick={() => setStep("otp")}
                  className="w-full h-12 rounded-full bg-blue-600 hover:bg-blue-700 transition-all text-white text-[15px] font-medium flex items-center justify-center gap-2 mt-4"
                >
                  Send OTP
                  <span className="text-lg">→</span>
                </button>
              </>
            )}

            {/* STEP 2: OTP */}
            {step === "otp" && (
              <>
                <p className="text-sm text-gray-600 mb-4 text-center">
                  Enter the 4-digit code sent to your email
                </p>

                <div className="flex gap-3 justify-center mb-2">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => {
                        inputsRef.current[index] = el;
                      }}
                      maxLength={1}
                      value={digit}
                      onChange={(e) => {
                        const value = e.target.value.replace(/[^0-9]/g, "");

                        if (!value) return;

                        const newOtp = [...otp];
                        newOtp[index] = value;
                        setOtp(newOtp);
                        setError("");

                        // 👉 move to next input
                        if (index < otp.length - 1) {
                          inputsRef.current[index + 1]?.focus();
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Backspace") {
                          if (otp[index]) {
                            const newOtp = [...otp];
                            newOtp[index] = "";
                            setOtp(newOtp);
                          } else if (index > 0) {
                            inputsRef.current[index - 1]?.focus();
                          }
                        }
                      }}
                      className={`w-12 h-12 text-center text-lg border rounded-lg outline-none transition ${error
                        ? "border-red-500"
                        : "border-gray-300 focus:border-blue-500"
                        }`}
                    />
                  ))}
                </div>

                {error && (
                  <p className="text-red-500 text-sm text-center mb-3">
                    {error}
                  </p>
                )}

                <button
                  onClick={() => {
                    if (otp.join("") === "1234") {
                      setError("");
                      setStep("reset");
                    } else {
                      setError("Invalid OTP. Please try again.");
                    }
                  }}
                  className="w-full h-12 rounded-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Verify Code
                </button>
              </>
            )}

            {/* STEP 3: RESET PASSWORD */}
            {step === "reset" && (
              <>
                <div className="mb-4">
                  <label className="text-base text-gray-600 mb-1 block">
                    New Password
                  </label>
                  <input
                    type="password"
                    placeholder="Enter new password"
                    className="w-full bg-[#f1f5f9] border border-gray-200 rounded-lg px-3 h-11 outline-none"
                  />
                </div>

                <div className="mb-4">
                  <label className="text-base text-gray-600 mb-1 block">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    placeholder="Confirm new password"
                    className="w-full bg-[#f1f5f9] border border-gray-200 rounded-lg px-3 h-11 outline-none"
                  />
                </div>

                <button className="w-full h-12 rounded-full bg-blue-600 hover:bg-blue-700 text-white">
                  Update Password
                </button>
              </>
            )}

            {/* BACK TO LOGIN */}
            <p className="text-base my-4">
              Remember your password?{" "}
              <Link className="text-blue-600 font-semibold" to="/login">
                log in
              </Link>
            </p>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;