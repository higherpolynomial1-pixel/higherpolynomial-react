

// import React, { useContext, useState, useEffect } from 'react';
// import AdminHeader from './AdminHeader';
// import { AuthContext } from '../../auth/AuthContext';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const AdminService = () => {
//   const { email } = useContext(AuthContext);
//   const [services, setServices] = useState([]);
//   const [newServices, setNewServices] = useState([{ service_name: '', service_price: '' }]);
//   const [subcategory, setSubcategory] = useState(''); // ✅ State for subcategory input
//   const [loading, setLoading] = useState(true);
//   const [showModal, setShowModal] = useState(false);
//   const [serviceToDelete, setServiceToDelete] = useState(null);

//   useEffect(() => {
//     if (!email) return;

//     axios
//       .post(' https://query-q-backend.vercel.app/api/getVendorServicesByEmail', { email })
//       .then((response) => {
//         setServices(response.data.services || []);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error('Error fetching existing services:', error);
//         setLoading(false);
//       });
//   }, [email]);

//   const handleChange = (index, event) => {
//     const { name, value } = event.target;
//     const updatedServices = [...newServices];
//     updatedServices[index][name] = value;
//     setNewServices(updatedServices);
//   };

//   const addService = () => {
//     setNewServices([...newServices, { service_name: '', service_price: '' }]);
//   };

//   const removeService = (index) => {
//     const updatedServices = newServices.filter((_, i) => i !== index);
//     setNewServices(updatedServices);
//   };

//   const handleSubmit = async () => {
//     if (!email) {
//       toast.error('Email is missing. Please login again.');
//       return;
//     }

//     const data = {
//       vendor_id: 15, // Hardcoded as in original code
//       email,
//       services: newServices
//         .filter((service) => service.service_name && service.service_price)
//         .map((service) => ({
//           service_name: service.service_name,
//           service_price: parseFloat(service.service_price) || 0,
//         })),
//     };

//     try {
//       const response = await axios.post(' https://query-q-backend.vercel.app/api/addVendorServices', data, {
//         headers: { 'Content-Type': 'application/json' },
//       });
//       toast.success(response.data.message);
//       setServices([...services, ...data.services]);
//       setNewServices([{ service_name: '', service_price: '' }]);
//     } catch (error) {
//       console.error('Error adding services:', error);
//       toast.error('Error adding services');
//     }
//   };

//   // ✅ Handler for adding subcategory
//   const handleAddSubcategory = async () => {
//     if (!email) {
//       toast.error('Email is missing. Please login again.');
//       return;
//     }

//     if (!subcategory) {
//       toast.error('Please enter a subcategory name.');
//       return;
//     }

//     const data = {
//       vendor_id: 6, // Hardcoded as per provided API
//       email,
//       subcategory,
//     };

//     try {
//       const response = await axios.post(' https://query-q-backend.vercel.app/api/addSubcategory', data, {
//         headers: { 'Content-Type': 'application/json' },
//         maxBodyLength: Infinity,
//       });
//       toast.success(response.data.message || 'Subcategory added successfully');
//       setSubcategory(''); // Reset input field
//     } catch (error) {
//       console.error('Error adding subcategory:', error);
//       toast.error('Error adding subcategory');
//     }
//   };

//   const confirmDelete = (serviceName) => {
//     setServiceToDelete(serviceName);
//     setShowModal(true);
//   };

//   const handleDelete = async () => {
//     if (!email) {
//       toast.error('Email is missing. Please login again.');
//       setShowModal(false);
//       return;
//     }

//     try {
//       const data = { email, service_name: serviceToDelete };
//       const response = await axios.post(' https://query-q-backend.vercel.app/api/deleteVendorServices', data, {
//         headers: { 'Content-Type': 'application/json' },
//       });
//       toast.success(response.data.message);
//       setServices(services.filter((service) => service.service_name !== serviceToDelete));
//     } catch (error) {
//       console.error('Error deleting service:', error);
//       toast.error('Error deleting service');
//     } finally {
//       setShowModal(false);
//       setServiceToDelete(null);
//     }
//   };

//   const closeModal = () => {
//     setShowModal(false);
//     setServiceToDelete(null);
//   };

//   return (
//     <div className="min-h-screen bg-gray-900 text-white">
//       <AdminHeader />
//       <div className="p-6 max-w-4xl mx-auto">
//         <h2 className="text-3xl font-bold mb-6 text-purple-400">Admin Service Dashboard</h2>

//         {loading ? (
//           <p className="text-gray-300 animate-pulse">Loading services...</p>
//         ) : (
//           <>
//             {/* Existing Services */}
//             <div className="mb-8">
//               <h3 className="text-xl font-semibold mb-4 text-purple-300">Existing Services</h3>
//               {services.length > 0 ? (
//                 <ul className="space-y-4">
//                   {services.map((service, index) => (
//                     <li
//                       key={index}
//                       className="flex justify-between items-center bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
//                     >
//                       <span className="text-gray-100">
//                         <strong>{service.service_name}</strong> - ₹{service.service_price}
//                       </span>
//                       <button
//                         onClick={() => confirmDelete(service.service_name)}
//                         className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
//                       >
//                         Delete
//                       </button>
//                     </li>
//                   ))}
//                 </ul>
//               ) : (
//                 <p className="text-gray-400">No existing services found.</p>
//               )}
//             </div>

//             {/* Add New Services */}
//             <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-8">
//               <h3 className="text-xl font-semibold mb-4 text-purple-300">Add New Services</h3>
//               {newServices.map((service, index) => (
//                 <div key={index} className="flex space-x-4 mb-4">
//                   <input
//                     type="text"
//                     name="service_name"
//                     value={service.service_name}
//                     onChange={(e) => handleChange(index, e)}
//                     placeholder="Service Name"
//                     className="w-1/2 p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-purple-500 transition-colors"
//                   />
//                   <input
//                     type="number"
//                     name="service_price"
//                     value={service.service_price}
//                     onChange={(e) => handleChange(index, e)}
//                     placeholder="Price"
//                     className="w-1/4 p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-purple-500 transition-colors"
//                   />
//                   {newServices.length > 1 && (
//                     <button
//                       onClick={() => removeService(index)}
//                       className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
//                     >
//                       Remove
//                     </button>
//                   )}
//                 </div>
//               ))}
//               <div className="flex space-x-4">
//                 <button
//                   onClick={addService}
//                   className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors"
//                 >
//                   Add Another Service
//                 </button>
//                 <button
//                   onClick={handleSubmit}
//                   className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors"
//                 >
//                   Submit
//                 </button>
//               </div>
//             </div>

//             {/* ✅ Add Subcategory Section */}
//             <div className="bg-gray-800 p-6 rounded-lg shadow-md">
//               <h3 className="text-xl font-semibold mb-4 text-purple-300">Add Subcategory</h3>
//               <div className="flex space-x-4 mb-4">
//                 <input
//                   type="text"
//                   value={subcategory}
//                   onChange={(e) => setSubcategory(e.target.value)}
//                   placeholder="Subcategory Name (e.g., Hair Care)"
//                   className="w-1/2 p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-purple-500 transition-colors"
//                 />
//                 <button
//                   onClick={handleAddSubcategory}
//                   className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors"
//                 >
//                   Add Subcategory
//                 </button>
//               </div>
//             </div>
//           </>
//         )}

//         {/* Confirmation Modal */}
//         {showModal && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//             <div className="bg-gray-800 p-6 rounded-lg shadow-xl w-96 transform transition-all scale-100 animate-fade-in">
//               <h3 className="text-xl font-bold text-purple-400 mb-4">Confirm Deletion</h3>
//               <p className="text-gray-200 mb-6">
//                 Are you sure you want to delete <span className="font-semibold text-purple-300">"{serviceToDelete}"</span>? This action is permanent!
//               </p>
//               <div className="flex justify-end space-x-4">
//                 <button
//                   onClick={closeModal}
//                   className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleDelete}
//                   className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminService;

import React, { useContext, useState, useEffect } from 'react';
import AdminHeader from './AdminHeader';
import { AuthContext } from '../../auth/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminService = () => {
  const { email } = useContext(AuthContext);
  const [services, setServices] = useState([]);
  const [newServices, setNewServices] = useState([{ service_name: '', service_price: '' }]);
  const [subcategory, setSubcategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState(null);
  
  // Slot management states
  const [slots, setSlots] = useState([]);
  const [newSlot, setNewSlot] = useState({
    date: '',
    time: ''
  });
  const [loadingSlots, setLoadingSlots] = useState(false);

  useEffect(() => {
    if (!email) return;

    // Fetch services
    axios
      .post(' https://query-q-backend.vercel.app/api/getVendorServicesByEmail', { email })
      .then((response) => {
        setServices(response.data.services || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching existing services:', error);
        setLoading(false);
      });

    // Fetch slots
    fetchSlots();
  }, [email]);

  const fetchSlots = () => {
    if (!email) return;
    
    setLoadingSlots(true);
    axios
      .get(` https://query-q-backend.vercel.app/api/slots/${email}`)
      .then((response) => {
        setSlots(response.data.slots || []);
        setLoadingSlots(false);
      })
      .catch((error) => {
        console.error('Error fetching slots:', error);
        setLoadingSlots(false);
        toast.error('Error fetching slots');
      });
  };

  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const updatedServices = [...newServices];
    updatedServices[index][name] = value;
    setNewServices(updatedServices);
  };

  const handleSlotChange = (e) => {
    const { name, value } = e.target;
    setNewSlot(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addService = () => {
    setNewServices([...newServices, { service_name: '', service_price: '' }]);
  };

  const removeService = (index) => {
    const updatedServices = newServices.filter((_, i) => i !== index);
    setNewServices(updatedServices);
  };

  const handleSubmit = async () => {
    if (!email) {
      toast.error('Email is missing. Please login again.');
      return;
    }

    const data = {
      vendor_id: 15,
      email,
      services: newServices
        .filter((service) => service.service_name && service.service_price)
        .map((service) => ({
          service_name: service.service_name,
          service_price: parseFloat(service.service_price) || 0,
        })),
    };

    try {
      const response = await axios.post(' https://query-q-backend.vercel.app/api/addVendorServices', data, {
        headers: { 'Content-Type': 'application/json' },
      });
      toast.success(response.data.message);
      setServices([...services, ...data.services]);
      setNewServices([{ service_name: '', service_price: '' }]);
    } catch (error) {
      console.error('Error adding services:', error);
      toast.error('Error adding services');
    }
  };

  const handleAddSlot = async () => {
    if (!email) {
      toast.error('Email is missing. Please login again.');
      return;
    }

    if (!newSlot.date || !newSlot.time) {
      toast.error('Please fill in both date and time');
      return;
    }

    try {
      const data = {
        email,
        date: newSlot.date,
        time: newSlot.time
      };

      const response = await axios.post(' https://query-q-backend.vercel.app/api/create-slot', data, {
        headers: { 'Content-Type': 'application/json' },
      });

      toast.success(response.data.message);
      setNewSlot({ date: '', time: '' });
      fetchSlots(); // Refresh the slots list
    } catch (error) {
      console.error('Error creating slot:', error);
      toast.error('Error creating slot');
    }
  };

  const handleDeleteSlot = async (slotId) => {
    if (!email) {
      toast.error('Email is missing. Please login again.');
      return;
    }

    try {
      const response = await axios.delete(` https://query-q-backend.vercel.app/api/slots/${slotId}`, {
        headers: { 'Content-Type': 'application/json' },
      });
      toast.success(response.data.message);
      fetchSlots(); // Refresh the slots list
    } catch (error) {
      console.error('Error deleting slot:', error);
      toast.error('Error deleting slot');
    }
  };

  const handleAddSubcategory = async () => {
    if (!email) {
      toast.error('Email is missing. Please login again.');
      return;
    }

    if (!subcategory) {
      toast.error('Please enter a subcategory name.');
      return;
    }

    const data = {
      vendor_id: 6,
      email,
      subcategory,
    };

    try {
      const response = await axios.post(' https://query-q-backend.vercel.app/api/addSubcategory', data, {
        headers: { 'Content-Type': 'application/json' },
        maxBodyLength: Infinity,
      });
      toast.success(response.data.message || 'Subcategory added successfully');
      setSubcategory('');
    } catch (error) {
      console.error('Error adding subcategory:', error);
      toast.error('Error adding subcategory');
    }
  };

  const confirmDelete = (serviceName) => {
    setServiceToDelete(serviceName);
    setShowModal(true);
  };

  const handleDelete = async () => {
    if (!email) {
      toast.error('Email is missing. Please login again.');
      setShowModal(false);
      return;
    }

    try {
      const data = { email, service_name: serviceToDelete };
      const response = await axios.post(' https://query-q-backend.vercel.app/api/deleteVendorServices', data, {
        headers: { 'Content-Type': 'application/json' },
      });
      toast.success(response.data.message);
      setServices(services.filter((service) => service.service_name !== serviceToDelete));
    } catch (error) {
      console.error('Error deleting service:', error);
      toast.error('Error deleting service');
    } finally {
      setShowModal(false);
      setServiceToDelete(null);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setServiceToDelete(null);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <AdminHeader />
      <div className="p-6 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-purple-400">Admin Service Dashboard</h2>

        {loading ? (
          <p className="text-gray-300 animate-pulse">Loading services...</p>
        ) : (
          <>
            {/* Existing Services */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4 text-purple-300">Existing Services</h3>
              {services.length > 0 ? (
                <ul className="space-y-4">
                  {services.map((service, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                    >
                      <span className="text-gray-100">
                        <strong>{service.service_name}</strong> - ₹{service.service_price}
                      </span>
                      <button
                        onClick={() => confirmDelete(service.service_name)}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
                      >
                        Delete
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-400">No existing services found.</p>
              )}
            </div>

            {/* Add New Services */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-8">
              <h3 className="text-xl font-semibold mb-4 text-purple-300">Add New Services</h3>
              {newServices.map((service, index) => (
                <div key={index} className="flex space-x-4 mb-4">
                  <input
                    type="text"
                    name="service_name"
                    value={service.service_name}
                    onChange={(e) => handleChange(index, e)}
                    placeholder="Service Name"
                    className="w-1/2 p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-purple-500 transition-colors"
                  />
                  <input
                    type="number"
                    name="service_price"
                    value={service.service_price}
                    onChange={(e) => handleChange(index, e)}
                    placeholder="Price"
                    className="w-1/4 p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-purple-500 transition-colors"
                  />
                  {newServices.length > 1 && (
                    <button
                      onClick={() => removeService(index)}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <div className="flex space-x-4">
                <button
                  onClick={addService}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  Add Another Service
                </button>
                <button
                  onClick={handleSubmit}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  Submit
                </button>
              </div>
            </div>

            {/* Add Subcategory Section */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-8">
              <h3 className="text-xl font-semibold mb-4 text-purple-300">Add Subcategory</h3>
              <div className="flex space-x-4 mb-4">
                <input
                  type="text"
                  value={subcategory}
                  onChange={(e) => setSubcategory(e.target.value)}
                  placeholder="Subcategory Name (e.g., Hair Care)"
                  className="w-1/2 p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-purple-500 transition-colors"
                />
                <button
                  onClick={handleAddSubcategory}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  Add Subcategory
                </button>
              </div>
            </div>

            {/* Slot Management Section */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-8">
              <h3 className="text-xl font-semibold mb-4 text-purple-300">Manage Time Slots</h3>
              
              {/* Add New Slot */}
              <div className="mb-6">
                <h4 className="text-lg font-medium mb-3 text-purple-200">Add New Slot</h4>
                <div className="flex space-x-4 mb-4">
                  <input
                    type="date"
                    name="date"
                    value={newSlot.date}
                    onChange={handleSlotChange}
                    className="p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-purple-500 transition-colors"
                  />
                  <input
                    type="time"
                    name="time"
                    value={newSlot.time}
                    onChange={handleSlotChange}
                    className="p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-purple-500 transition-colors"
                  />
                  <button
                    onClick={handleAddSlot}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
                  >
                    Add Slot
                  </button>
                </div>
              </div>
              
              {/* Existing Slots */}
              <div>
                <h4 className="text-lg font-medium mb-3 text-purple-200">Available Slots</h4>
                {loadingSlots ? (
                  <p className="text-gray-300 animate-pulse">Loading slots...</p>
                ) : slots.length > 0 ? (
                  <ul className="space-y-3">
                    {slots.map((slot) => (
                      <li key={slot.id} className="flex justify-between items-center bg-gray-700 p-3 rounded-lg">
                        <span className="text-gray-100">
                          {new Date(slot.date).toLocaleDateString()} at {slot.time}
                        </span>
                        <button
                          onClick={() => handleDeleteSlot(slot.id)}
                          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg transition-colors"
                        >
                          Delete
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-400">No available slots found.</p>
                )}
              </div>
            </div>
          </>
        )}

        {/* Confirmation Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-800 p-6 rounded-lg shadow-xl w-96 transform transition-all scale-100 animate-fade-in">
              <h3 className="text-xl font-bold text-purple-400 mb-4">Confirm Deletion</h3>
              <p className="text-gray-200 mb-6">
                Are you sure you want to delete <span className="font-semibold text-purple-300">"{serviceToDelete}"</span>? This action is permanent!
              </p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={closeModal}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminService;