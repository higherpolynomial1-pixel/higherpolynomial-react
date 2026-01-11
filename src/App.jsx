


// import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
// import React from "react";
// import { ToastContainer } from "react-toastify";
// import ProtectedRoute from "./auth/ProtectedRoute";

// import LandingPage from "./components/LandingPage";
// import Login from "./auth/Login";
// import VendorOnboard from "./components/VendorOnboard";
// import Signup from "./components/Signup";
// import Dashboard from "./pages/Dashboard";
// import Salon from "./pages/Salon";
// import Doctor from "./pages/Doctor";
// import { AuthProvider } from "./auth/AuthContext";
// import SalonDetails from "./pages/SalonDetails";
// import DocterDetails from "./pages/DocterDetails";
// import ContactUs from "./components/ContactUs";
// import Apporaval from "./components/Apporaval";
// import AdminLogin from "./auth/AdminLogin";
// import AdminDashboard from "./components/admin/AdminDashboard";
// import AdminService from "./components/admin/AdminService";
// import PrivacyPolicy from "./components/PrivacyPolicy";
// import About from "./components/About";
// import TermsAndConditions from "./components/TerrmAndCondition";
// import ContentPolicy from "./components/ContentPolicy";
// import CancellationAndRefund from "./components/CancellationAndRefund";
// import ShippingAndDelivery from "./components/ShippingAndDelivery";
// import AdminBooking from "./components/admin/AdminBooking";



// const App = () => {
//   return (
//     <div className="overflow-x-hidden">
//       <AuthProvider>
//         <BrowserRouter>
//           <ToastContainer autoClose={1800} />
//           <Routes>
//             <Route path="/" element={<Navigate to="/quirkyQ" replace />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/admin-login" element={<AdminLogin />} />
//             <Route path="/signup" element={<Signup />} />
//             <Route path="/professional" element={<VendorOnboard />} />
//             <Route path="/quirkyQ" element={<LandingPage />} />
//             <Route path="/contact-us" element={<ContactUs />} />
//             <Route path="/Approval" element={<Apporaval />} />

//             <Route path="/salon" element={<Salon />} />
//             <Route path="/salon/:id" element={<SalonDetails />} />
//             <Route path="/doctor" element={<Doctor />} />
//             <Route path="/doctors/:id" element={<DocterDetails />} />
//             <Route path="/Privacy-policy" element={<PrivacyPolicy />} />
//             <Route path="/TermsAndCondition" element={<TermsAndConditions />} />
//             <Route path="/Content-policy" element={<ContentPolicy />} />
//             <Route path="/CancellationAnd-Refund" element={<CancellationAndRefund/>} />
//             <Route path="/about" element={<About />} />
//             <Route path="/ShippingAndDelivery" element={<ShippingAndDelivery />} />


//             {/* ✅ Apply Protected Route to these pages */}
//             <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
//             <Route path="/admin-booking" element={<ProtectedRoute><AdminBooking /></ProtectedRoute>} />
// }
//             <Route path="/admin-dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
//             <Route path="/admin-service" element={<ProtectedRoute><AdminService /></ProtectedRoute>} />
//           </Routes>
//         </BrowserRouter>
//       </AuthProvider>
//     </div>
//   );
// };

// export default App;

import React from 'react'

const App = () => {
  return (
    <div>App</div>
  )
}

export default App

