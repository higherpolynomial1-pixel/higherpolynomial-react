


import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import React from "react";
import { ToastContainer } from "react-toastify";
import Dashboard from "./pages/Dashboard";


import AdminDashboard from "./components/admin/AdminDashboard";
import UserCourseDetails from "./pages/UserCourseDetails";




const App = () => {
  return (
    <div className="overflow-x-hidden">

      <BrowserRouter>
        <ToastContainer autoClose={1800} />
        <Routes>
          <Route path="/" element={<Navigate to="/admin-dashboard" replace />} />

          <Route path="/admin-dashboard" element={<AdminDashboard />} />

          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/course/:id" element={<UserCourseDetails />} />

        </Routes>
      </BrowserRouter>

    </div>
  );
};

export default App;



