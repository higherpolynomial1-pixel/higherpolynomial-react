


import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaLock, FaEye, FaEyeSlash, FaEnvelope, FaArrowLeft, FaPhone } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../auth/AuthContext";

const Login = () => {
  const [loginIdentifier, setLoginIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isResetOtpSent, setIsResetOtpSent] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!loginIdentifier || !password) {
      toast.error("Please enter both email/mobile and password", { position: "top-right" });
      setLoading(false);
      return;
    }

    // Determine if the identifier is an email or mobile number
    const isEmail = loginIdentifier.includes('@');
    const loginData = isEmail 
      ? { email: loginIdentifier, password }
      : { mobile_number: loginIdentifier, password };

    try {
      const response = await axios.post(
        " https://query-q-backend.vercel.app/api/users/login",
        loginData,
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.data.message === "Login successful") {
        toast.success("Login successful! Redirecting to dashboard...", { position: "top-right" });
        login(response.data.user);
        setTimeout(() => {
          navigate("/dashboard");
          setLoading(false);
        }, 1000);
      } else if (response.data.message === "Invalid email or password") {
        toast.error("Invalid credentials", { position: "top-right" });
        setLoading(false);
      } else {
        toast.error("Login failed. Please try again.", { position: "top-right" });
        setLoading(false);
      }
    } catch (error) {
      if (error.response?.data?.message === "Invalid email or password") {
        toast.error("Invalid credentials", { position: "top-right" });
      } else {
        toast.error("An error occurred during login. Please try again.", { position: "top-right" });
      }
      setLoading(false);
    }
  };

  // Send OTP for Forgot Password
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!loginIdentifier) {
      toast.error("Please enter your email or mobile number", { position: "top-right" });
      setLoading(false);
      return;
    }

    // Determine if the identifier is an email or mobile number
    const isEmail = loginIdentifier.includes('@');
    const forgotData = isEmail 
      ? { email: loginIdentifier }
      : { mobile_number: loginIdentifier };

    try {
      const response = await axios.post(
        " https://query-q-backend.vercel.app/api/users/forgot-password",
        forgotData,
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.data.message === "OTP sent successfully!") {
        toast.success("OTP sent successfully!", { position: "top-right" });
        setIsResetOtpSent(true);
      } else {
        toast.error(response.data.message || "Failed to send OTP. Please try again.", { position: "top-right" });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send OTP. Server error.", { position: "top-right" });
    } finally {
      setLoading(false);
    }
  };

  // Reset Password with OTP
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!otp || !newPassword) {
      toast.error("Please enter both OTP and new password", { position: "top-right" });
      setLoading(false);
      return;
    }

    // Determine if the identifier is an email or mobile number
    const isEmail = loginIdentifier.includes('@');
    const resetData = isEmail 
      ? { email: loginIdentifier, otp, newPassword }
      : { mobile_number: loginIdentifier, otp, newPassword };

    try {
      const response = await axios.post(
        " https://query-q-backend.vercel.app/api/users/reset-password",
        resetData,
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.data.message === "Password reset successfully!") {
        toast.success("Password reset successfully! Returning to login...", { position: "top-right" });
        setTimeout(() => {
          setIsForgotPassword(false);
          setIsResetOtpSent(false);
          setOtp("");
          setNewPassword("");
          setLoading(false);
        }, 1000);
      } else {
        toast.error(response.data.message || "Password reset failed. Please try again.", { position: "top-right" });
        setLoading(false);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid OTP or reset failed. Please try again.", { position: "top-right" });
      setLoading(false);
    }
  };

  // Back button handler
  const handleBack = () => {
    setIsForgotPassword(false);
    setIsResetOtpSent(false);
    setOtp("");
    setNewPassword("");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800 px-4">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-2xl shadow-2xl transform transition-all duration-500 hover:shadow-purple-500/50 animate-fade-in">
        <Link to="/quirkyQ">
          <h2 className="text-4xl font-extrabold text-center text-white mb-8">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
              {isForgotPassword ? "Reset Password" : "Login to QuirkyQ"}
            </span>
          </h2>
        </Link>

        {!isForgotPassword ? (
          // Login Form
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="relative group">
              <label className="block text-gray-300 font-medium mb-2 transition-all duration-300 group-focus-within:text-purple-400">
                Email or Mobile Number
              </label>
              <div className="flex items-center border border-gray-600 rounded-full overflow-hidden bg-gray-700 group-focus-within:border-purple-500 transition-all duration-300">
                <span className="px-4 text-gray-400 group-focus-within:text-purple-400">
                  {loginIdentifier.includes('@') ? <FaEnvelope /> : <FaPhone />}
                </span>
                <input
                  type="text"
                  className="w-full p-3 bg-transparent text-gray-200 focus:outline-none placeholder-gray-500"
                  placeholder="Enter your email or mobile number"
                  value={loginIdentifier}
                  onChange={(e) => setLoginIdentifier(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="relative group">
              <label className="block text-gray-300 font-medium mb-2 transition-all duration-300 group-focus-within:text-purple-400">
                Password
              </label>
              <div className="flex items-center border border-gray-600 rounded-full overflow-hidden bg-gray-700 group-focus-within:border-purple-500 transition-all duration-300">
                <span className="px-4 text-gray-400 group-focus-within:text-purple-400">
                  <FaLock />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full p-3 bg-transparent text-gray-200 focus:outline-none placeholder-gray-500"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="px-4 text-gray-400 hover:text-purple-400 transition-colors duration-300"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-full text-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-lg transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center space-x-2">
                  <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                  </svg>
                  <span>Logging in...</span>
                </span>
              ) : (
                "Login"
              )}
            </button>

            <p className="text-center text-gray-400 mt-4">
              Forgot Password?{" "}
              <button
                type="button"
                onClick={() => setIsForgotPassword(true)}
                className="text-purple-400 hover:text-purple-300 transition-colors duration-300"
              >
                Reset here
              </button>
            </p>
          </form>
        ) : !isResetOtpSent ? (
          // Forgot Password Email/Mobile Form
          <form onSubmit={handleForgotPassword} className="space-y-6">
            <div className="relative group">
              <label className="block text-gray-300 font-medium mb-2 transition-all duration-300 group-focus-within:text-purple-400">
                Email or Mobile Number
              </label>
              <div className="flex items-center border border-gray-600 rounded-full overflow-hidden bg-gray-700 group-focus-within:border-purple-500 transition-all duration-300">
                <span className="px-4 text-gray-400 group-focus-within:text-purple-400">
                  {loginIdentifier.includes('@') ? <FaEnvelope /> : <FaPhone />}
                </span>
                <input
                  type="text"
                  className="w-full p-3 bg-transparent text-gray-200 focus:outline-none placeholder-gray-500"
                  placeholder="Enter your email or mobile number"
                  value={loginIdentifier}
                  onChange={(e) => setLoginIdentifier(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                type="button"
                onClick={handleBack}
                className="w-1/2 bg-gray-600 text-white py-3 rounded-full text-lg font-semibold hover:bg-gray-700 transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-lg transform hover:scale-105"
              >
                <FaArrowLeft className="mr-2" />
                Back
              </button>
              <button
                type="submit"
                className="w-1/2 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-full text-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-lg transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center space-x-2">
                    <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                    </svg>
                    <span>Sending OTP...</span>
                  </span>
                ) : (
                  "Send OTP"
                )}
              </button>
            </div>
          </form>
        ) : (
          // Reset Password Form
          <form onSubmit={handleResetPassword} className="space-y-6">
            <div className="relative group">
              <label className="block text-gray-300 font-medium mb-2 transition-all duration-300 group-focus-within:text-purple-400">
                Enter OTP
              </label>
              <div className="flex items-center border border-gray-600 rounded-full overflow-hidden bg-gray-700 group-focus-within:border-purple-500 transition-all duration-300">
                <span className="px-4 text-gray-400 group-focus-within:text-purple-400">
                  <FaLock />
                </span>
                <input
                  type="text"
                  className="w-full p-3 bg-transparent text-gray-200 focus:outline-none placeholder-gray-500"
                  placeholder="Enter 6-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  maxLength={6}
                  required
                />
              </div>
            </div>

            <div className="relative group">
              <label className="block text-gray-300 font-medium mb-2 transition-all duration-300 group-focus-within:text-purple-400">
                New Password
              </label>
              <div className="flex items-center border border-gray-600 rounded-full overflow-hidden bg-gray-700 group-focus-within:border-purple-500 transition-all duration-300">
                <span className="px-4 text-gray-400 group-focus-within:text-purple-400">
                  <FaLock />
                </span>
                <input
                  type={showNewPassword ? "text" : "password"}
                  className="w-full p-3 bg-transparent text-gray-200 focus:outline-none placeholder-gray-500"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="px-4 text-gray-400 hover:text-purple-400 transition-colors duration-300"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                type="button"
                onClick={handleBack}
                className="w-1/2 bg-gray-600 text-white py-3 rounded-full text-lg font-semibold hover:bg-gray-700 transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-lg transform hover:scale-105"
              >
                <FaArrowLeft className="mr-2" />
                Back
              </button>
              <button
                type="submit"
                className="w-1/2 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-full text-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-lg transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center space-x-2">
                    <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                    </svg>
                    <span>Resetting...</span>
                  </span>
                ) : (
                  "Reset Password"
                )}
              </button>
            </div>
          </form>
        )}

        {/* Sign Up Link */}
        {!isForgotPassword && (
          <p className="text-center text-gray-400 mt-6">
            Don't have an account?{" "}
            <Link to="/signup" className="text-purple-400 hover:text-purple-300 transition-colors duration-300 font-medium">
              Sign Up
            </Link>
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;