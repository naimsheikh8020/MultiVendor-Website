import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { Eye, EyeOff } from "lucide-react";

import {
  useRequestReset,
  useConfirmReset,
  useResendOtp,
} from "../features/auth/hooks/usePasswordReset";
import { useCheckOtp } from "../features/auth/hooks/useCheckOtp";

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState<"email" | "otp" | "reset">("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  const { mutate: sendOtp, isPending: sendingOtp } = useRequestReset();
  const { mutate: confirmReset, isPending: resetting } = useConfirmReset();
  const { mutate: resend, isPending: resending } = useResendOtp();
  const { mutate: checkOtp, isPending: verifying } = useCheckOtp();

  // 🔥 SEND OTP
  const handleSendOtp = () => {
    if (!email) {
      setError("Please enter your email");
      return;
    }

    sendOtp(
      { email },
      {
        onSuccess: () => {
          setError("");
          setStep("otp");
        },
        onError: (err: any) => {
          setError(
            err?.response?.data?.detail ||
            "We couldn't send the OTP. Try again."
          );
        },
      }
    );
  };

  // 🔥 VERIFY OTP (frontend only length check)
  const handleVerifyOtp = () => {
    const otpValue = otp.join("");

    if (otpValue.length !== 4) {
      setError("Enter the full 4-digit code");
      return;
    }

    checkOtp(
      {
        email,
        otp: otpValue,
      },
      {
        onSuccess: () => {
          setError("");
          setStep("reset"); // ✅ only if backend says valid
        },
        onError: (err: any) => {
          setError(
            err?.response?.data?.detail ||
            "Invalid OTP. Please try again."
          );
        },
      }
    );
  };

  // 🔥 RESET PASSWORD
  const handleResetPassword = () => {
    if (!password || !confirmPassword) {
      setError("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    confirmReset(
      {
        email,
        otp: otp.join(""),
        new_password: password,
      },
      {
        onSuccess: () => {
          setError("");
          navigate("/login"); // ✅ redirect
        },
        onError: (err: any) => {
          setError(
            err?.response?.data?.detail ||
            "Reset failed. Check OTP or try again."
          );
        },
      }
    );
  };

  // 🔥 RESEND OTP
  const handleResend = () => {
    resend(
      { email },
      {
        onSuccess: () => setError(""),
        onError: () => setError("Failed to resend OTP"),
      }
    );
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">

      {/* LEFT */}
      <div className="hidden lg:flex items-center justify-center">
        <img src={assets.loginImg} className="w-full object-contain" />
      </div>

      {/* RIGHT */}
      <div className="flex items-center justify-center px-6">
        <div className="w-full max-w-md">

          <h2 className="text-2xl font-bold mb-4">
            Forgot Password
          </h2>

          {/* EMAIL STEP */}
          {step === "email" && (
            <>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
                className="w-full border border-gray-200 p-3 rounded mb-4 focus:ring-2 focus:ring-blue-500 outline-none transition"
              />

              <button
                onClick={handleSendOtp}
                className="w-full bg-blue-600 text-white py-3 rounded"
              >
                {sendingOtp ? "Sending..." : "Send OTP"}
              </button>
            </>
          )}

          {/* OTP STEP */}
          {step === "otp" && (
            <>
              <div className="flex gap-3 justify-center mb-4">
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

                      const newOtp = [...otp];
                      newOtp[index] = value;
                      setOtp(newOtp);

                      if (value && index < 3) {
                        inputsRef.current[index + 1]?.focus();
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Backspace") {
                        const newOtp = [...otp];

                        if (otp[index]) {
                          newOtp[index] = "";
                          setOtp(newOtp);
                        } else if (index > 0) {
                          inputsRef.current[index - 1]?.focus();
                        }
                      }
                    }}
                    className="w-12 h-12 text-center border border-gray-200 rounded focus:border-blue-500 outline-none transition"
                  />
                ))}
              </div>

              <button
                onClick={handleVerifyOtp}
                className="w-full bg-blue-600 text-white py-3 rounded mb-2"
              >
                {verifying ? "Verifying..." : "Verify OTP"}
              </button>

              <button
                onClick={handleResend}
                className="text-sm text-blue-600"
              >
                {resending ? "Resending..." : "Resend OTP"}
              </button>
            </>
          )}

          {/* RESET STEP */}
          {step === "reset" && (
            <>
              {/* PASSWORD */}
              <div className="relative mb-3">
                <input
                  type={showPass ? "text" : "password"}
                  placeholder="New Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-gray-200 p-3 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-3 text-gray-500"
                >
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {/* CONFIRM */}
              <div className="relative mb-4">
                <input
                  type={showConfirm ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full border border-gray-200 p-3 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-3 text-gray-500"
                >
                  {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              <button
                onClick={handleResetPassword}
                className="w-full bg-blue-600 text-white py-3 rounded"
              >
                {resetting ? "Updating..." : "Update Password"}
              </button>
            </>
          )}

          {/* ERROR */}
          {error && (
            <div className="mt-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">
              {error}
            </div>
          )}

          <p className="mt-4 text-sm">
            Remember password?{" "}
            <Link to="/login" className="text-blue-600">
              Login
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;