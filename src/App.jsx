


import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Auth
import { AuthProvider } from "./auth/AuthContext";
import ProtectedRoute from "./auth/ProtectedRoute";
import Login from "./auth/Login";
import Signup from "./auth/Signup";

// Components & Layout
import Layout from "./components/Layout";
import AdminDashboard from "./components/admin/AdminDashboard";

// Pages
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import UserCourseDetails from "./pages/UserCourseDetails";
import ContactUs from "./pages/ContactUs";
import PrivacyPolicy from "./pages/PrivacyPolicy";

const App = () => {
  return (
    <div className="overflow-x-hidden font-sans">
      <AuthProvider>
        <BrowserRouter>
          <ToastContainer autoClose={1800} />
          <Routes>
            {/* 1. Public Entry Routes */}
            <Route path="/" element={<Layout><LandingPage /></Layout>} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* 2. Public Content Routes (No Auth Required for browsing) */}
            <Route path="/courses" element={<Layout><Dashboard /></Layout>} />
            <Route path="/course/:id" element={<Layout><UserCourseDetails /></Layout>} />
            <Route path="/contact-us" element={<Layout><ContactUs /></Layout>} />
            <Route path="/privacy" element={<Layout><PrivacyPolicy /></Layout>} />

            {/* 3. Protected User Routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Layout><Dashboard /></Layout>
              </ProtectedRoute>
            } />

            {/* 4. Admin Admin Route */}
            <Route path="/admin-dashboard" element={<AdminDashboard />} />

            {/* Default Catch-all */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
};

export default App;



