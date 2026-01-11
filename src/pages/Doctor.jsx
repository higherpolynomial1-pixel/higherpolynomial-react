


// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { FaArrowLeft, FaStar, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';
// import axios from 'axios';
// import Footer from '../components/Footer';
// import Navbar from './Navbar';

// const Doctor = () => {
//   const [location, setLocation] = useState('');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [doctors, setDoctors] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     axios
//       .get(' https://query-q-backend.vercel.app/api/admin/vendors', {
//         headers: { 'Content-Type': 'application/json' },
//       })
//       .then((response) => {
//         const filteredDoctors = response.data
//           .filter((vendor) => vendor.service_type === 'Doctor' && vendor.status === 'approved') // Only approved doctors
//           .map((doctor) => ({
//             id: doctor.id,
//             name: doctor.enterprise_name,
//             image: doctor.exterior_image,
//             rating: 4.7, 
//             contact: doctor.contact_number,
//             address: doctor.full_address,
//             description: doctor.personal_intro,
//           }));
//         setDoctors(filteredDoctors);
//       })
//       .catch((error) => console.error('Error fetching doctors:', error))
//       .finally(() => setLoading(false));
//   }, []);

//   const filteredDoctors = doctors.filter(
//     (doctor) =>
//       doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
//       doctor.address.toLowerCase().includes(location.toLowerCase())
//   );

//   return (
//     <div>
//       <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
//         <Navbar />
//       </header>
//       <div className="max-w-6xl mx-auto px-4 py-6 mt-16">
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-3xl font-bold">Find the Perfect Doctor</h1>
//           <button
//             onClick={() => navigate('/dashboard')}
//             className="flex items-center bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-md transition"
//           >
//             <FaArrowLeft className="mr-2" /> Back
//           </button>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//           <input
//             type="text"
//             placeholder="Enter your location"
//             className="p-2 border border-gray-300 rounded-md"
//             value={location}
//             onChange={(e) => setLocation(e.target.value)}
//           />
//           <input
//             type="text"
//             placeholder="Search doctors..."
//             className="p-2 border border-gray-300 rounded-md"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//         </div>

//         {loading ? (
//           <p className="text-center text-lg">Loading doctors...</p>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//             {filteredDoctors.length > 0 ? (
//               filteredDoctors.map((doctor) => (
//                 <div
//                   key={doctor.id}
//                   className="bg-white p-4 rounded-2xl shadow-md hover:shadow-lg transition-shadow cursor-pointer"
//                   onClick={() => navigate(`/doctors/${doctor.id}`)}
//                 >
//                   <img
//                     src={doctor.image}
//                     alt={doctor.name}
//                     className="w-full h-40 object-cover rounded-2xl"
//                   />
//                   <h3 className="text-xl font-semibold mt-3">{doctor.name}</h3>
//                   <div className="flex items-center text-yellow-500 mt-1">
//                     <FaStar className="mr-1" />
//                     <span>{doctor.rating} ★</span>
//                   </div>
//                   <div className="flex items-center text-gray-600 mt-2">
//                     <FaPhoneAlt className="mr-2" />
//                     <span>{doctor.contact}</span>
//                   </div>
//                   <div className="flex items-center text-gray-600 mt-2">
//                     <FaMapMarkerAlt className="mr-2" />
//                     <span>{doctor.address}</span>
//                   </div>
//                   <p className="text-sm text-gray-800 mt-2">
//                     {doctor.description}
//                   </p>
//                 </div>
//               ))
//             ) : (
//               <p className="text-center text-lg">No approved doctors found.</p>
//             )}
//           </div>
//         )}
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default Doctor;


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaStar, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';
import axios from 'axios';
import Footer from '../components/Footer';
import Navbar from './Navbar';

const Doctor = () => {
  const [location, setLocation] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);

    axios
      .get(' https://query-q-backend.vercel.app/api/admin/vendors', {
        headers: { 'Content-Type': 'application/json' },
      })
      .then((response) => {
        const filteredDoctors = response.data
          .filter((vendor) => vendor.service_type === 'Doctor' && vendor.status === 'approved')
          .map((doctor) => ({
            id: doctor.id,
            name: doctor.enterprise_name,
            image: doctor.exterior_image,
            rating: 4.7,
            contact: doctor.contact_number,
            address: doctor.full_address,
            description: doctor.personal_intro,
          }));
        setDoctors(filteredDoctors);
      })
      .catch((error) => console.error('Error fetching doctors:', error))
      .finally(() => setLoading(false));

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredDoctors = doctors.filter(
    (doctor) =>
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      doctor.address.toLowerCase().includes(location.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isScrolled ? 'bg-gray-900 shadow-2xl' : 'bg-transparent'
        }`}
      >
        <Navbar />
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <div className="flex justify-between items-center mb-8 animate-fade-in">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
            Find Your <span className="text-purple-400">Perfect Doctor</span>
          </h1>
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center bg-gray-700 hover:bg-gray-600 text-gray-200 px-4 py-2 rounded-full transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <FaArrowLeft className="mr-2" /> Back
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 animate-slide-up">
          <input
            type="text"
            placeholder="Enter your location"
            className="p-3 bg-gray-700 text-gray-200 border border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <input
            type="text"
            placeholder="Search doctors..."
            className="p-3 bg-gray-700 text-gray-200 border border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {loading ? (
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-400 mx-auto"></div>
            <p className="text-lg text-gray-300 mt-4">Loading doctors...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {filteredDoctors.length > 0 ? (
              filteredDoctors.map((doctor) => (
                <div
                  key={doctor.id}
                  className="bg-gradient-to-br from-gray-700 to-indigo-700 p-5 rounded-3xl shadow-lg hover:shadow-xl hover:bg-gray-600 transition-all duration-300 cursor-pointer transform hover:scale-105"
                  onClick={() => navigate(`/doctors/${doctor.id}`)}
                >
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-full h-48 object-cover rounded-2xl mb-4 transform hover:scale-110 transition-transform duration-500"
                  />
                  <h3 className="text-xl font-semibold text-white mb-2">{doctor.name}</h3>
                  <div className="flex items-center text-yellow-400 mt-1">
                    <FaStar className="mr-1" />
                    <span>{doctor.rating} ★</span>
                  </div>
                  <div className="flex items-center text-gray-300 mt-2">
                    <FaPhoneAlt className="mr-2" />
                    <span>{doctor.contact}</span>
                  </div>
                  <div className="flex items-center text-gray-300 mt-2">
                    <FaMapMarkerAlt className="mr-2" />
                    <span className="line-clamp-1">{doctor.address}</span>
                  </div>
                  <p className="text-sm text-gray-200 mt-3 line-clamp-2">{doctor.description}</p>
                </div>
              ))
            ) : (
              <p className="text-center text-lg text-gray-300 col-span-full animate-fade-in">
                No approved doctors found.
              </p>
            )}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Doctor;