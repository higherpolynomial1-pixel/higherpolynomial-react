import React, { useState, useContext, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaUserCircle, FaSignOutAlt, FaHome, FaBook, FaEnvelope, FaShieldAlt, FaChevronDown, FaBars, FaTimes } from 'react-icons/fa';
import { AuthContext } from "../auth/AuthContext";

const Header = () => {
  const { user, logout, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/', icon: <FaHome /> },
    { name: 'Courses', path: '/courses', icon: <FaBook /> },
    { name: 'Contact Us', path: '/contact-us', icon: <FaEnvelope /> },
    { name: 'Privacy Policy', path: '/privacy', icon: <FaShieldAlt /> },
  ];

  const profileLinks = [
    { name: 'My Dashboard', path: '/dashboard' },
  ];

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100 fixed w-full z-50 top-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">

          {/* Left: Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center group">
              <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-200 group-hover:rotate-6 transition-transform text-white font-bold text-xl font-mono">
                HP
              </div>
              <span className="ml-3 text-2xl font-black text-gray-900 tracking-tight">
                Higher<span className="text-purple-600">Polynomia</span>
              </span>
            </Link>
          </div>

          {/* Center: Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${location.pathname === link.path
                    ? 'bg-purple-50 text-purple-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
              >
                <span className="text-xs opacity-70">{link.icon}</span>
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right: User Profile & Mobile Toggle */}
          <div className="flex items-center gap-4">

            {/* Desktop User Menu / Auth Buttons */}
            <div className="hidden md:flex items-center gap-3">
              {isAuthenticated ? (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center gap-3 p-1 pr-3 rounded-full hover:bg-gray-50 transition-colors group border border-transparent hover:border-gray-100"
                  >
                    <div className="relative">
                      <FaUserCircle className="h-10 w-10 text-gray-300 group-hover:text-purple-400 transition-colors" />
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="text-sm font-bold text-gray-900 line-clamp-1">{user?.name || 'User'}</span>
                      <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Student</span>
                    </div>
                    <FaChevronDown className={`text-xs text-gray-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Dropdown Menu */}
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-3 w-60 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 animate-in fade-in zoom-in duration-200 origin-top-right">
                      <div className="px-4 py-3 border-b border-gray-50">
                        <p className="text-xs text-gray-400 font-bold uppercase">Account</p>
                        <p className="text-sm font-bold text-gray-900 truncate">{user?.email}</p>
                      </div>
                      <div className="py-1">
                        {profileLinks.map(link => (
                          <Link
                            key={link.path}
                            to={link.path}
                            className="block px-4 py-2 text-sm text-gray-600 hover:bg-purple-50 hover:text-purple-700 font-medium"
                            onClick={() => setIsDropdownOpen(false)}
                          >
                            {link.name}
                          </Link>
                        ))}
                      </div>
                      <div className="border-t border-gray-50 pt-1 px-1">
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-3 w-full px-4 py-3 text-sm font-bold text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                        >
                          <FaSignOutAlt className="text-red-400" />
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <Link to="/login" className="text-sm font-bold text-gray-600 hover:text-gray-900 px-4 py-2 transition-colors">
                    Login
                  </Link>
                  <Link to="/signup" className="text-sm font-black bg-purple-600 text-white px-6 py-2.5 rounded-full hover:bg-purple-700 hover:shadow-lg hover:shadow-purple-500/30 transition-all">
                    Get Started
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-xl p-4 space-y-2 animate-in slide-in-from-top duration-300">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="flex items-center gap-3 p-3 rounded-xl text-gray-600 hover:bg-purple-50 hover:text-purple-700 font-bold transition-all"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.icon}
              {link.name}
            </Link>
          ))}
          {!isAuthenticated && (
            <>
              <div className="h-[1px] bg-gray-100 my-2"></div>
              <Link to="/login" className="block text-center p-3 font-bold text-gray-600" onClick={() => setIsMobileMenuOpen(false)}>Login</Link>
              <Link to="/signup" className="block text-center p-3 font-black bg-purple-600 text-white rounded-xl" onClick={() => setIsMobileMenuOpen(false)}>Get Started</Link>
            </>
          )}
          {isAuthenticated && (
            <>
              <div className="h-[1px] bg-gray-100 my-2"></div>
              <Link to="/dashboard" className="block text-center p-3 font-bold text-gray-600" onClick={() => setIsMobileMenuOpen(false)}>My Dashboard</Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 w-full p-3 text-red-500 font-bold hover:bg-red-50 rounded-xl"
              >
                <FaSignOutAlt />
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Header;