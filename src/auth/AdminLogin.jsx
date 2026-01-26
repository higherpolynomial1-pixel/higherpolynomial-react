


import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaLock, FaEye, FaEyeSlash, FaEnvelope, FaPhone } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../auth/AuthContext";

const AdminLogin = () => {
  const [loginIdentifier, setLoginIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);

  //   if (!loginIdentifier || !password) {
  //     toast.error("Please enter both email/contact number and password", { position: "top-right" });
  //     setLoading(false);
  //     return;
  //   }

  //   // Determine if the identifier is an email or contact number
  //   const isEmail = loginIdentifier.includes('@');
  //   const loginData = isEmail 
  //     ? { email: loginIdentifier, password }
  //     : { contact_number: loginIdentifier, password };

  //   try {
  //     const response = await axios.post(
  //       " https://query-q-backend.vercel.app/api/admin/login",
  //       loginData,
  //       { headers: { "Content-Type": "application/json" } }
  //     );

  //     if (response.data.message === "Login successful.") {
  //       toast.success("Login successful! Redirecting...", { position: "top-right" });
        
  //       // Save admin data to AuthContext
  //       login(response.data.vendor);

  //       setTimeout(() => {
  //         navigate("/admin-dashboard");
  //       }, 1000);
  //     } else {
  //       toast.error(response.data.message || "Something went wrong", { position: "top-right" });
  //     }
  //   } catch (error) {
  //     toast.error(error.response?.data?.message || "Invalid credentials", { position: "top-right" });
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    if (!loginIdentifier || !password) {
      toast.error("Please enter both email/contact number and password", { position: "top-right" });
      setLoading(false);
      return;
    }
  
    // Determine if the identifier is an email or contact number
    const isEmail = loginIdentifier.includes('@');
    const loginData = isEmail 
      ? { email: loginIdentifier, password }
      : { contact_number: loginIdentifier, password };
  
    try {
      const response = await axios.post(
        " https://query-q-backend.vercel.app/api/admin/login",
        loginData,
        { headers: { "Content-Type": "application/json" } }
      );
  
      if (response.data.message === "Login successful.") {
        toast.success("Login successful! Redirecting...", { position: "top-right" });
        
        // Save admin data to AuthContext
        login(response.data.vendor);
  
        // Store service_type and id in sessionStorage
        sessionStorage.setItem('serviceType', response.data.vendor.service_type);
        sessionStorage.setItem('vendorId', response.data.vendor.id);
  
        setTimeout(() => {
          navigate("/admin-dashboard");
        }, 1000);
      } else {
        toast.error(response.data.message || "Something went wrong", { position: "top-right" });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid credentials", { position: "top-right" });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-50 to-purple-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-xl transform transition-all duration-300 hover:shadow-2xl">
        <Link to="/Higher Polynomial">
          <h2 className="text-3xl font-bold text-center text-purple-600 mb-6">
            Admin Login to Higher Polynomial
          </h2>
        </Link>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="relative group">
            <label className="block text-gray-700 font-medium mb-2 transition-all duration-300 group-focus-within:text-purple-600">
              Email or Contact Number
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white group-focus-within:border-purple-500 transition-all duration-300">
              <span className="px-3 text-gray-500 group-focus-within:text-purple-500">
                {loginIdentifier.includes('@') ? <FaEnvelope /> : <FaPhone />}
              </span>
              <input
                type="text"
                className="w-full p-3 focus:outline-none placeholder-gray-400"
                placeholder="Enter email or contact number"
                value={loginIdentifier}
                onChange={(e) => setLoginIdentifier(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="relative group">
            <label className="block text-gray-700 font-medium mb-2 transition-all duration-300 group-focus-within:text-purple-600">
              Password
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white group-focus-within:border-purple-500 transition-all duration-300">
              <span className="px-3 text-gray-500 group-focus-within:text-purple-500">
                <FaLock />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                className="w-full p-3 focus:outline-none placeholder-gray-400"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="px-3 text-gray-500 hover:text-purple-500 transition-colors duration-300"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-lg text-lg font-medium hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Don't have an account?{" "}
          <Link 
            to="/professional" 
            className="text-purple-600 hover:text-purple-800 font-medium transition-colors duration-300"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;