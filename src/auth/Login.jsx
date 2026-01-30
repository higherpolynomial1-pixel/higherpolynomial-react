

import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaLock, FaEye, FaEyeSlash, FaEnvelope, FaArrowLeft, FaPhone } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../auth/AuthContext";

const Login = () => {
  const [emailInput, setEmailInput] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("https://higherpolynomial-node.vercel.app/api/login", {
        email: emailInput,
        password
      });

      if (response.status === 200) {
        toast.success("Welcome back!");
        login(response.data.user, response.data.token);
        setTimeout(() => navigate("/dashboard"), 1000);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("https://higherpolynomial-node.vercel.app/api/forgot-password", { email: emailInput });
      toast.success("OTP sent to your email!");
      setIsOtpSent(true);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send OTP.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("https://higherpolynomial-node.vercel.app/api/reset-password", {
        email: emailInput,
        otp,
        newPassword
      });
      toast.success("Password reset successful! Please login.");
      setIsForgotPassword(false);
      setIsOtpSent(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Reset failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a] relative overflow-hidden font-sans">
      {/* Abstract Background Shapes */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-gradient-to-br from-blue-600/20 to-blue-700/20 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full"></div>

      <div className="w-full max-w-md px-6 py-12 relative z-10">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 shadow-2xl">
          {/* Logo/Header */}
          <div className="text-center mb-10">
            <div className="inline-flex w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl items-center justify-center shadow-lg shadow-blue-500/30 mb-4 rotate-3">
              <span className="text-white text-3xl font-black italic">Q</span>
            </div>
            <h1 className="text-3xl font-black text-white tracking-tight">
              {isForgotPassword ? "Secure Access" : "Welcome Back"}
            </h1>
            <p className="text-gray-400 mt-2 font-medium">
              {isForgotPassword ? "Verify your identity to proceed" : "Enter your credentials to continue"}
            </p>
          </div>

          {!isForgotPassword ? (
            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-300 ml-1">Email Address</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-blue-500 transition-colors">
                    <FaEnvelope />
                  </div>
                  <input
                    type="email"
                    required
                    className="w-full pl-11 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all font-medium"
                    placeholder="name@company.com"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center px-1">
                  <label className="text-sm font-bold text-gray-300">Password</label>
                  <button
                    type="button"
                    onClick={() => setIsForgotPassword(true)}
                    className="text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    Forgot?
                  </button>
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-blue-500 transition-colors">
                    <FaLock />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    className="w-full pl-11 pr-12 py-3.5 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all font-medium"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-white transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 rounded-2xl shadow-xl shadow-blue-600/20 active:scale-95 transition-all flex items-center justify-center gap-2 group"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    Sign In
                    <div className="w-5 h-5 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                      <FaArrowLeft className="rotate-180 text-xs" />
                    </div>
                  </>
                )}
              </button>
            </form>
          ) : (
            <form onSubmit={isOtpSent ? handleResetPassword : handleForgotPassword} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-300 ml-1">Email Address</label>
                <input
                  type="email"
                  required
                  disabled={isOtpSent}
                  className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-medium disabled:opacity-50"
                  placeholder="Verify your email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                />
              </div>

              {isOtpSent && (
                <>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-300 ml-1">6-Digit OTP</label>
                    <input
                      type="text"
                      required
                      maxLength={6}
                      className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-2xl text-white tracking-[0.5em] text-center font-black focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                      placeholder="000000"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-300 ml-1">New Password</label>
                    <input
                      type="password"
                      required
                      className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                      placeholder="Min. 8 characters"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </div>
                </>
              )}

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setIsForgotPassword(false)}
                  className="flex-1 bg-white/5 hover:bg-white/10 text-white font-bold py-4 rounded-2xl border border-white/10 active:scale-95 transition-all text-sm"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-[2] bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 rounded-2xl shadow-xl shadow-blue-600/20 active:scale-95 transition-all"
                >
                  {loading ? "Processing..." : (isOtpSent ? "Reset Password" : "Send OTP")}
                </button>
              </div>
            </form>
          )}

          <div className="mt-8 text-center">
            <p className="text-gray-400 font-medium">
              New to EduLearn?{" "}
              <Link to="/signup" className="text-blue-400 hover:text-blue-300 font-bold transition-colors underline-offset-4 hover:underline">
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;