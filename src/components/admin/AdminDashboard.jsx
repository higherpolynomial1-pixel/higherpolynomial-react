
import React, { useEffect, useState, useContext } from "react";
import { FaChartPie, FaUsers, FaCog } from "react-icons/fa";
import AdminHeader from "./AdminHeader";
import axios from "axios";
import { AuthContext } from "../../auth/AuthContext";

const AdminDashboard = () => {
  const { userId } = useContext(AuthContext); // ✅ Get ID from AuthContext
  const [vendorData, setVendorData] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    contact_number: "",
    state: "",
    city: "",
    pincode: "",
    full_address: "",
    service_type: "",
    years_of_experience: "",
    personal_intro: "",
    exterior_image: "",
    interior_image: "",
    status: "",
  });

  useEffect(() => {
    const fetchVendorData = async () => {
      if (!userId) return; // ✅ Ensure ID is present
      try {
        const config = {
          method: 'get',
          maxBodyLength: Infinity,
          url: ` https://query-q-backend.vercel.app/api/vendors/${userId}`,
          headers: { 
            'Content-Type': 'application/json'
          }
        };

        const response = await axios.request(config);
        setVendorData(response.data); // ✅ Store the API response
        setFormData(response.data); // Initialize form data with fetched data
      } catch (error) {
        console.error("Error fetching vendor data:", error);
      }
    };

    fetchVendorData();
  }, [userId]); // ✅ Re-run if userId changes

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        method: 'put',
        maxBodyLength: Infinity,
        url: ` https://query-q-backend.vercel.app/api/admin/update-vendor/${userId}`,
        headers: { 
          'Content-Type': 'application/json'
        },
        data: JSON.stringify(formData),
      };

      const response = await axios.request(config);
      console.log("Vendor details updated successfully:", response.data);
      setVendorData(response.data.vendor); // Update the vendor data with the new data
      setEditMode(false); // Exit edit mode
    } catch (error) {
      console.error("Error updating vendor data:", error);
    }
  };

  return (
    <div>
      <header className={`fixed top-0 left-0 w-full z-50 transition-all ${isScrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
        <AdminHeader/>
      </header>

      <div className="min-h-screen mt-16 bg-gradient-to-r from-purple-50 to-purple-100 flex">
        <main className="flex-1 p-8">
          <h1 className="text-3xl font-bold text-purple-600 mb-6">
            Welcome, {vendorData?.name || "Admin"}!
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl shadow-md p-6 text-center">
              <FaUsers className="text-4xl text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold">Enterprise Name</h3>
              <p className="text-2xl font-bold text-gray-700">{vendorData?.enterprise_name || "Loading..."}</p>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-6 text-center">
              <FaChartPie className="text-4xl text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold">Contact Number</h3>
              <p className="text-2xl font-bold text-gray-700">{vendorData?.contact_number || "Loading..."}</p>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-6 text-center">
              <FaCog className="text-4xl text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold">Service Type</h3>
              <p className="text-2xl font-bold text-gray-700">{vendorData?.service_type || "Loading..."}</p>
            </div>
          </div>

          {/* Display Full Details */}
          <div className="mt-8 bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-purple-600 mb-4">User Details</h2>
            {vendorData && (
              <div className="space-y-4">
                <p><strong>Name:</strong> {vendorData.name}</p>
                <p><strong>Email:</strong> {vendorData.email}</p>
                <p><strong>Contact Number:</strong> {vendorData.contact_number}</p>
                <p><strong>State:</strong> {vendorData.state}</p>
                <p><strong>City:</strong> {vendorData.city}</p>
                <p><strong>Pincode:</strong> {vendorData.pincode}</p>
                <p><strong>Full Address:</strong> {vendorData.full_address}</p>
                <p><strong>Service Type:</strong> {vendorData.service_type}</p>
                <p><strong>Years of Experience:</strong> {vendorData.years_of_experience}</p>
                <p><strong>Personal Intro:</strong> {vendorData.personal_intro}</p>
                <p><strong>Status:</strong> {vendorData.status}</p>
                <button
                  onClick={() => setEditMode(!editMode)}
                  className="bg-purple-600 text-white px-4 py-2 rounded-md"
                >
                  {editMode ? "Cancel" : "Edit Details"}
                </button>
              </div>
            )}
          </div>

          {/* Edit Form */}
          {editMode && (
            <div className="mt-8 bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-purple-600 mb-4">Edit User Details</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Contact Number</label>
                  <input
                    type="text"
                    name="contact_number"
                    value={formData.contact_number}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">State</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Pincode</label>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Full Address</label>
                  <input
                    type="text"
                    name="full_address"
                    value={formData.full_address}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Service Type</label>
                  <input
                    type="text"
                    name="service_type"
                    value={formData.service_type}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Years of Experience</label>
                  <input
                    type="text"
                    name="years_of_experience"
                    value={formData.years_of_experience}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Personal Intro</label>
                  <textarea
                    name="personal_intro"
                    value={formData.personal_intro}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Exterior Image URL</label>
                  <input
                    type="text"
                    name="exterior_image"
                    value={formData.exterior_image}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Interior Image URL</label>
                  <input
                    type="text"
                    name="interior_image"
                    value={formData.interior_image}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  />
                </div>
               
                <button
                  type="submit"
                  className="bg-purple-600 text-white px-4 py-2 rounded-md"
                >
                  Update Details
                </button>
              </form>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;

