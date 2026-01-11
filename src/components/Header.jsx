


import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-gray-800 via-purple-900 to-gray-800 shadow-xl fixed w-full z-50 top-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center group">
              <span className="ml-2 text-3xl font-extrabold text-white bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 group-hover:animate-pulse transition-all duration-300">
                QuirkyQ
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          
          <div className="hidden md:flex items-center space-x-6">

          <Link
              to="/about"
              className="text-gray-200 hover:text-white px-4 py-2 rounded-lg text-sm font-medium bg-gray-800/50 hover:bg-purple-700/50 transition-all duration-300 transform hover:scale-105"
            >
              About Us
            </Link>
            <Link
              to="/Contact-us"
              className="text-gray-200 hover:text-white px-4 py-2 rounded-lg text-sm font-medium bg-gray-800/50 hover:bg-purple-700/50 transition-all duration-300 transform hover:scale-105"
            >
              Contact Us
            </Link>
           
            <Link
              to="/login"
              className="text-gray-200 hover:text-white px-4 py-2 rounded-lg text-sm font-medium bg-gray-800/50 hover:bg-purple-700/50 transition-all duration-300 transform hover:scale-105"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full text-sm font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
            >
              Sign Up
            </Link>
            <Link
              to="/professional"
              className="text-purple-400 border-2 border-purple-400 px-6 py-2 rounded-full text-sm font-medium hover:bg-purple-400 hover:text-white transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
            >
              Join as Professional
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex md:hidden items-center space-x-4">
            <Link
              to="/login"
              className="text-gray-200 hover:text-white px-3 py-2 rounded-md text-sm font-medium bg-gray-800/50 hover:bg-purple-700/50 transition-all duration-300"
            >
              Login
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-200 hover:text-white p-2 rounded-full bg-gray-800/50 hover:bg-purple-700/50 focus:outline-none transition-all duration-300"
            >
              {isMobileMenuOpen ? (
                <FiX className="w-7 h-7" />
              ) : (
                <FiMenu className="w-7 h-7" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Items */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-gray-900/95 backdrop-blur-md px-4 py-6 rounded-b-xl shadow-lg animate-slide-down">
            <Link
              to="/Contact-us"
              className="block text-gray-200 hover:text-white px-4 py-3 rounded-lg text-base font-medium hover:bg-purple-700/50 transition-all duration-300"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact Us
            </Link>
            <Link
              to="/signup"
              className="block text-gray-200 hover:text-white px-4 py-3 rounded-lg text-base font-medium hover:bg-purple-700/50 transition-all duration-300"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Sign Up
            </Link>
            <Link
              to="/professional"
              className="block text-gray-200 hover:text-white px-4 py-3 rounded-lg text-base font-medium hover:bg-purple-700/50 transition-all duration-300"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Join as Professional
            </Link>
          </div>
        )}
      </div>

      {/* Optional Decorative Line */}
      <div className="h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 opacity-75"></div>
    </nav>
  );
};

export default Header;