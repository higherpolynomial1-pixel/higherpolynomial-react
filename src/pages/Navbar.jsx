

// import React, { useContext } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { FaUserCircle } from 'react-icons/fa';
// import { AuthContext } from "../auth/AuthContext";

// const Navbar = () => {
//   const { user, logout } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate('/quirkyQ');
//   };

//   // Extract first name and full name
//   const firstName = user?.name ? user.name.split(" ")[0] : "Guest";
//   const fullName = user?.name || "Guest";

//   return (
//     <nav className="bg-white shadow-lg">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between h-16">
//           <div className="flex items-center">
//             <Link to="/dashboard" className="flex items-center">
//               <span className="ml-2 text-2xl font-bold text-gray-900">QuirkyQ</span>
//             </Link>
//           </div>
//           <div className="flex items-center space-x-4">
//             <div className="flex items-center space-x-2">
//               {/* Show first name on small screens, full name on large screens */}
//               <span className="text-gray-800 font-medium sm:hidden">{firstName}</span>
//               <span className="text-gray-800 font-medium hidden sm:inline">{fullName}</span>
//               <FaUserCircle className="h-8 w-8 text-gray-600" />
//             </div>
//             <button
//               onClick={handleLogout}
//               className="bg-purple-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-purple-700"
//             >
//               Logout
//             </button>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import { AuthContext } from "../auth/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/quirkyQ');
  };

  // Extract first name and full name
  const firstName = user?.name ? user.name.split(" ")[0] : "Guest";
  const fullName = user?.name || "Guest";

  return (
    <nav className="bg-gradient-to-r from-gray-800 via-purple-900 to-gray-800 shadow-2xl fixed w-full z-50 top-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/dashboard" className="flex items-center group">
              <span className="ml-2 text-3xl font-extrabold text-white bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 group-hover:animate-pulse transition-all duration-300">
                QuirkyQ
              </span>
            </Link>
          </div>

          {/* User Info and Logout */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-3 group">
              <FaUserCircle className="h-10 w-10 text-purple-400 group-hover:text-purple-300 transition-colors duration-300 transform group-hover:scale-110" />
              <div className="flex flex-col">
                <span className="text-gray-200 font-semibold sm:hidden text-sm group-hover:text-white transition-colors duration-300">
                  {firstName}
                </span>
                <span className="text-gray-200 font-semibold hidden sm:inline text-lg group-hover:text-white transition-colors duration-300">
                  {fullName}
                </span>
                <span className="text-xs text-gray-400 hidden sm:block">Welcome back!</span>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-5 py-2 rounded-full text-sm font-medium flex items-center space-x-2 hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
            >
              <FaSignOutAlt className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
      {/* Decorative Bottom Line */}
      <div className="h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 opacity-75"></div>
    </nav>
  );
};

export default Navbar;