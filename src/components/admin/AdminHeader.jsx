

// import React, { useContext } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { FaUserCircle } from 'react-icons/fa';
// import { AuthContext } from '../../auth/AuthContext';

// const AdminHeader = () => {
//   const { user, logout } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate('/admin-login');
//   };

//   // Extract first name and full name
//   const firstName = user?.name ? user.name.split(" ")[0] : "Guest";
//   const fullName = user?.name || "Guest";

//   return (
//     <nav className="bg-white shadow-lg">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between h-16">
//           <div className="flex items-center space-x-12">
//             <Link to="/admin-dashboard" className="flex items-center">
//               <span className="ml-2 text-2xl font-bold text-gray-900">QuirkyQ</span>
//             </Link>
//             {/* Service Section */}
//             <Link to="/admin-service" className="text-gray-800 font-medium  hover:text-purple-600">Service</Link>
//             <Link to="/admin-booking" className="text-gray-800 font-medium  hover:text-purple-600">My Booking</Link>
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

// export default AdminHeader;

import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { AuthContext } from '../../auth/AuthContext';

const AdminHeader = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear session storage
    sessionStorage.clear();
    
    // Call the logout function from AuthContext
    logout();
    
    // Navigate to login page
    navigate('/admin-login');
  };

  // Extract first name and full name
  const firstName = user?.name ? user.name.split(" ")[0] : "Guest";
  const fullName = user?.name || "Guest";

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-12">
            <Link to="/admin-dashboard" className="flex items-center">
              <span className="ml-2 text-2xl font-bold text-gray-900">QuirkyQ</span>
            </Link>
            {/* Service Section */}
            <Link to="/admin-service" className="text-gray-800 font-medium hover:text-purple-600">Service</Link>
            <Link to="/admin-booking" className="text-gray-800 font-medium hover:text-purple-600">My Booking</Link>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              {/* Show first name on small screens, full name on large screens */}
              <span className="text-gray-800 font-medium sm:hidden">{firstName}</span>
              <span className="text-gray-800 font-medium hidden sm:inline">{fullName}</span>
              <FaUserCircle className="h-8 w-8 text-gray-600" />
            </div>
            <button
              onClick={handleLogout}
              className="bg-purple-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-purple-700"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminHeader;