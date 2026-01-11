


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaArrowLeft, FaStar } from 'react-icons/fa';
import { HiLocationMarker } from 'react-icons/hi';
import Footer from '../components/Footer';
import Navbar from './Navbar';

const Salon = () => {
  const [location, setLocation] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [salons, setSalons] = useState([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const [loading, setLoading] = useState(true);
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
        const filteredSalons = response.data
          .filter((vendor) => vendor.service_type === 'Salon' && vendor.status === 'approved')
          .map((salon) => ({
            id: salon._id || salon.id, // Use _id if available, fallback to id
            name: salon.enterprise_name,
            image: salon.exterior_image || 'https://via.placeholder.com/300x200?text=Salon',
            rating: 4.5,
            contact: salon.contact_number,
            address: salon.full_address,
            email: salon.email,
            description: salon.personal_intro || 'Premium salon services',
          }));
        setSalons(filteredSalons);
      })
      .catch((error) => console.error('Error fetching salons:', error))
      .finally(() => setLoading(false));

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredSalons = salons.filter((salon) => {
    const matchesSearch = salon.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation = location ? salon.address.toLowerCase().includes(location.toLowerCase()) : true;
    return matchesSearch && matchesLocation;
  });

  const navigateToSalon = (id) => {
    if (!id) {
      console.error('Invalid salon ID');
      return;
    }
    navigate(`/salon/${id}`); // Changed to more standard URL pattern
  };

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
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 animate-fade-in">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
            Discover <span className="text-purple-400">Top Salons</span>
          </h1>
          <button
            onClick={() => navigate("/quirkyQ")}
            className="flex items-center bg-gray-700 hover:bg-gray-600 text-gray-200 px-4 py-2 rounded-full transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <FaArrowLeft className="mr-2" /> Back
          </button>
        </div>

        {/* Search Inputs */}
        <div className="flex flex-col md:flex-row gap-4 mb-10 animate-slide-up">
          <input
            type="text"
            placeholder="Search by location..."
            className="flex-1 p-3 bg-gray-700 text-gray-200 border border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <input
            type="text"
            placeholder="Search by salon name..."
            className="flex-1 p-3 bg-gray-700 text-gray-200 border border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Salon Cards Section */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-400 mx-auto"></div>
            <p className="text-lg text-gray-300 mt-4">Loading salons...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSalons.length > 0 ? (
              filteredSalons.map((salon) => (
                <div
                  key={salon.id}
                  className="bg-gradient-to-br from-gray-700 to-indigo-700 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group border-none h-full flex flex-col"
                  onClick={() => navigateToSalon(salon.id)}
                >
                  {/* Image with Overlay Effect */}
                  <div className="relative h-48 overflow-hidden rounded-t-2xl">
                    <img
                      src={salon.image}
                      alt={salon.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/300x200?text=Salon';
                      }}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <p className="text-white font-semibold bg-black bg-opacity-50 px-3 py-1 rounded-full">
                        View Details
                      </p>
                    </div>
                  </div>

                  {/* Card Content - Fixed Height */}
                  <div className="p-4 flex-1 flex flex-col">
                    <h3 className="text-lg font-semibold text-white mb-1">{salon.name}</h3>
                    
                    <div className="flex items-center mb-2">
                      <FaStar className="text-yellow-400 mr-1" />
                      <span className="text-gray-300">{salon.rating}</span>
                    </div>
                    
                    <div className="flex items-start mb-2">
                      <HiLocationMarker className="text-gray-400 mt-0.5 mr-1 flex-shrink-0" />
                      <span className="text-sm text-gray-300 line-clamp-1">{salon.address}</span>
                    </div>
                    
                    <p className="text-sm text-gray-200 line-clamp-2 mt-auto">{salon.description}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12 animate-fade-in">
                <p className="text-lg text-gray-300">
                  {salons.length > 0 
                    ? 'No salons match your search criteria'
                    : 'No approved salons available at the moment'}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Salon;