

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Approval = () => {
  const [vendors, setVendors] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  // Fetch vendors on mount
  useEffect(() => {
    const fetchVendors = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(' https://query-q-backend.vercel.app/api/admin/vendors');
        setVendors(response.data);
      } catch (error) {
        console.error("Error fetching vendors:", error);
        toast.error("Failed to fetch vendors.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchVendors();
  }, []);

  // Handle Approve
  const handleApprove = async (id) => {
    setActionLoading(true);
    try {
      await axios.post(` https://query-q-backend.vercel.app/api/admin/approve-vendor/${id}`);
      toast.success('✅ Vendor approved successfully!');
      setSelectedVendor(prev => ({ ...prev, status: "approved" }));
    } catch (error) {
      console.error("Error approving vendor:", error);
      toast.error('❌ Failed to approve vendor.');
    } finally {
      setActionLoading(false);
    }
  };

  // Handle Reject
  const handleReject = async (id) => {
    setActionLoading(true);
    try {
      await axios.post(` https://query-q-backend.vercel.app/api/admin/reject-vendor/${id}`);
      toast.warning('⚠️ Vendor rejected.');
      setSelectedVendor(prev => ({ ...prev, status: "rejected" }));
    } catch (error) {
      console.error("Error rejecting vendor:", error);
      toast.error('❌ Failed to reject vendor.');
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-purple-600 mb-6 text-center">
        Vendor Approval List
      </h1>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />

      {/** Loader */}
      {isLoading && (
        <div className="flex justify-center items-center min-h-[300px]">
          <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/** Table View */}
      {!isLoading && !selectedVendor && (
        <div className="overflow-x-auto shadow-lg rounded-lg">
          <table className="w-full border-collapse bg-white shadow-md rounded-lg">
            <thead className="bg-purple-600 text-white">
              <tr>
                <th className="py-3 px-4 border">ID</th>
                <th className="py-3 px-4 border">Name</th>
                <th className="py-3 px-4 border">Enterprise Name</th>
                <th className="py-3 px-4 border">Email</th>
                <th className="py-3 px-4 border">Status</th>
              </tr>
            </thead>
            <tbody>
              {vendors.map((vendor, index) => (
                <tr 
                  key={vendor.id} 
                  className={`hover:bg-purple-100 cursor-pointer ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
                  onClick={() => setSelectedVendor(vendor)}
                >
                  <td className="py-3 px-4 border">{vendor.id}</td>
                  <td className="py-3 px-4 border">{vendor.name}</td>
                  <td className="py-3 px-4 border text-purple-600 hover:underline">
                    {vendor.enterprise_name}
                  </td>
                  <td className="py-3 px-4 border">{vendor.email}</td>
                  <td className={`py-3 px-4 border font-semibold 
                    ${vendor.status === "approved" ? "text-green-600" : vendor.status === "rejected" ? "text-red-600" : "text-gray-600"}`}>
                    {vendor.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/** Detailed View */}
      {selectedVendor && (
        <div className="mt-6 p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-purple-600 mb-4">Vendor Details</h2>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(selectedVendor).map(([key, value]) => (
              <p key={key} className="mb-2"><strong className="text-black">{key}:</strong> {value}</p>
            ))}
          </div>
          <div className="mt-6 flex space-x-4">
            <button 
              onClick={() => handleApprove(selectedVendor.id)}
              className={`px-5 py-2 text-white font-semibold rounded-lg shadow-md
                ${actionLoading ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"}`}
              disabled={actionLoading}
            >
              {actionLoading ? "Processing..." : "✅ Approve"}
            </button>
            <button 
              onClick={() => handleReject(selectedVendor.id)}
              className={`px-5 py-2 text-white font-semibold rounded-lg shadow-md
                ${actionLoading ? "bg-gray-400 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"}`}
              disabled={actionLoading}
            >
              {actionLoading ? "Processing..." : "❌ Reject"}
            </button>
            <button 
              onClick={() => setSelectedVendor(null)}
              className="px-5 py-2 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 shadow-md"
            >
              🔙 Back
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Approval;
