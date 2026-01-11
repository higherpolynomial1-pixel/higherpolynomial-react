


// import React, { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import axios from 'axios';
// import { Link, useNavigate } from 'react-router-dom';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { FaUser, FaBuilding, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCity, FaLocationArrow, FaBriefcase, FaFileImage, FaEye, FaEyeSlash } from 'react-icons/fa';

// const Onboarding = () => {
//   const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm();
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [registrationSuccess, setRegistrationSuccess] = useState(false);
//   const navigate = useNavigate();

//   // Watch pincode field for changes
//   const pincode = watch('pincode');

//   // Fetch address data based on pincode
//   const fetchAddressData = async (pincode) => {
//     if (!pincode || pincode.length !== 6) return; // Only fetch when pincode is 6 digits

//     try {
//       const config = {
//         method: 'get',
//         maxBodyLength: Infinity,
//         url: ` https://query-q-backend.vercel.app/api/address?pincode=${pincode}`,
//         headers: { 'Content-Type': 'application/json' },
//       };

//       const response = await axios.request(config);
//       const data = response.data[0]; // Assuming the first result is the relevant one
//       if (data && data.display_name) {
//         // Parse display_name: "231303, Mirzapur, Uttar Pradesh, India"
//         const addressParts = data.display_name.split(', ');
//         const city = addressParts[1]; // Mirzapur
//         const state = addressParts[2]; // Uttar Pradesh

//         setValue('city', city, { shouldValidate: true });
//         setValue('state', state, { shouldValidate: true });
//       }
//     } catch (error) {
//       console.error('Error fetching address:', error);
//       toast.error('Failed to fetch address data', { position: 'top-right' });
//     }
//   };

//   // Effect to fetch address when pincode changes
//   React.useEffect(() => {
//     if (pincode && pincode.length === 6) {
//       fetchAddressData(pincode);
//     }
//   }, [pincode]);

//   const onSubmit = async (data) => {
//     setLoading(true);
//     const formData = {
//       name: data.name,
//       enterprise_name: data.enterprise_name,
//       email: data.email,
//       contact_number: `+91${data.contact_number}`,
//       state: data.state,
//       city: data.city,
//       pincode: data.pincode,
//       full_address: data.full_address,
//       service_type: data.service_type,
//       years_of_experience: data.years_of_experience,
//       personal_intro: data.personal_intro,
//       password: data.password,
//       exterior_image: data.exterior_image,
//       interior_image: data.interior_image,
//     };

//     try {
//       const response = await axios.post(' https://query-q-backend.vercel.app/api/register', formData, {
//         headers: { 'Content-Type': 'application/json' },
//       });
//       toast.success('Registration successful!');
//       setRegistrationSuccess(true);
//       reset();
//       setTimeout(() => {
//         navigate('/quirkyQ');
//       }, 10000);
//       console.log(response.data);
//     } catch (error) {
//       toast.error('Registration failed!');
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const blockInvalidChars = (e) => {
//     if (!/[A-Za-z\s]/.test(e.key)) {
//       e.preventDefault();
//     }
//   };

//   const blockSpace = (e) => {
//     if (e.key === ' ') {
//       e.preventDefault();
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800 py-12 px-4">
//       <div className="max-w-4xl mx-auto bg-gray-800 p-8 rounded-2xl shadow-2xl transform transition-all duration-500 hover:shadow-purple-500/50 animate-fade-in">
//         <ToastContainer position="top-right" autoClose={3000} />
//         <Link to="/quirkyQ">
//           <h2 className="text-4xl font-extrabold text-center text-white mb-8">
//             <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
//               Professional Onboarding
//             </span>
//           </h2>
//         </Link>

//         {/* Success Message Modal */}
//         {registrationSuccess && (
//           <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
//             <div className="bg-gray-900 p-8 rounded-xl shadow-2xl w-96 text-center transform transition-all scale-100 animate-bounce-in">
//               <h3 className="text-2xl font-bold text-purple-400 mb-4">Registration Successful!</h3>
//               <p className="text-gray-300 mb-6">
//                 Thank you for registering! Please wait for admin approval within 24 hours. Redirecting in 10 seconds...
//               </p>
//               <div className="w-12 h-12 mx-auto border-4 border-purple-600 border-t-transparent rounded-full animate-spin" />
//             </div>
//           </div>
//         )}

//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {/* Full Name */}
//             <div className="relative group">
//               <label className="flex items-center space-x-2 text-gray-300 font-medium mb-2 transition-all duration-300 group-focus-within:text-purple-400">
//                 <FaUser /> <span>Full Name</span>
//               </label>
//               <input
//                 {...register('name', {
//                   required: 'Full Name is required',
//                   pattern: { value: /^[A-Za-z\s]+$/, message: 'Only letters and spaces are allowed' },
//                   minLength: { value: 2, message: 'Must be at least 2 characters' },
//                 })}
//                 className="w-full p-3 bg-gray-700 text-gray-200 border border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
//                 onKeyPress={blockInvalidChars}
//               />
//               {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>}
//             </div>

//             {/* Enterprise Name */}
//             <div className="relative group">
//               <label className="flex items-center space-x-2 text-gray-300 font-medium mb-2 transition-all duration-300 group-focus-within:text-purple-400">
//                 <FaBuilding /> <span>Enterprise Name</span>
//               </label>
//               <input
//                 {...register('enterprise_name', {
//                   required: 'Enterprise Name is required',
//                   pattern: { value: /^[A-Za-z\s]+$/, message: 'Only letters and spaces are allowed' },
//                   minLength: { value: 2, message: 'Must be at least 2 characters' },
//                 })}
//                 className="w-full p-3 bg-gray-700 text-gray-200 border border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
//                 onKeyPress={blockInvalidChars}
//               />
//               {errors.enterprise_name && <p className="text-red-400 text-sm mt-1">{errors.enterprise_name.message}</p>}
//             </div>

//             {/* Email */}
//             <div className="relative group">
//               <label className="flex items-center space-x-2 text-gray-300 font-medium mb-2 transition-all duration-300 group-focus-within:text-purple-400">
//                 <FaEnvelope /> <span>Email</span>
//               </label>
//               <input
//                 {...register('email', {
//                   required: 'Email is required',
//                   pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: 'Enter a valid email' },
//                 })}
//                 className="w-full p-3 bg-gray-700 text-gray-200 border border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
//               />
//               {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
//             </div>

//             {/* Contact Number */}
//             <div className="relative group">
//               <label className="flex items-center space-x-2 text-gray-300 font-medium mb-2 transition-all duration-300 group-focus-within:text-purple-400">
//                 <FaPhone /> <span>Contact Number</span>
//               </label>
//               <div className="flex">
//                 <span className="inline-flex items-center px-4 bg-gray-600 text-gray-200 border border-r-0 border-gray-600 rounded-l-full">+91</span>
//                 <input
//                   {...register('contact_number', {
//                     required: 'Contact Number is required',
//                     pattern: { value: /^[0-9]{10}$/, message: 'Must be exactly 10 digits' },
//                   })}
//                   className="w-full p-3 bg-gray-700 text-gray-200 border border-gray-600 rounded-r-full focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
//                   maxLength={10}
//                   type="tel"
//                   onKeyPress={(e) => { if (!/[0-9]/.test(e.key)) e.preventDefault(); }}
//                 />
//               </div>
//               {errors.contact_number && <p className="text-red-400 text-sm mt-1">{errors.contact_number.message}</p>}
//             </div>

//             {/* Pincode */}
//             <div className="relative group">
//               <label className="flex items-center space-x-2 text-gray-300 font-medium mb-2 transition-all duration-300 group-focus-within:text-purple-400">
//                 <FaLocationArrow /> <span>Pincode</span>
//               </label>
//               <input
//                 {...register('pincode', {
//                   required: 'Pincode is required',
//                   pattern: { value: /^[0-9]{6}$/, message: 'Must be exactly 6 digits' },
//                 })}
//                 className="w-full p-3 bg-gray-700 text-gray-200 border border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
//                 maxLength={6}
//                 type="tel"
//                 onKeyPress={(e) => { if (!/[0-9]/.test(e.key)) e.preventDefault(); }}
//               />
//               {errors.pincode && <p className="text-red-400 text-sm mt-1">{errors.pincode.message}</p>}
//             </div>

//             {/* State */}
//             <div className="relative group">
//               <label className="flex items-center space-x-2 text-gray-300 font-medium mb-2 transition-all duration-300 group-focus-within:text-purple-400">
//                 <FaMapMarkerAlt /> <span>State</span>
//               </label>
//               <input
//                 {...register('state', {
//                   required: 'State is required',
//                   pattern: { value: /^[A-Za-z\s]+$/, message: 'Only letters and spaces are allowed' },
//                   minLength: { value: 2, message: 'Must be at least 2 characters' },
//                 })}
//                 className="w-full p-3 bg-gray-700 text-gray-200 border border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
//               />
//               {errors.state && <p className="text-red-400 text-sm mt-1">{errors.state.message}</p>}
//             </div>

//             {/* City */}
//             <div className="relative group">
//               <label className="flex items-center space-x-2 text-gray-300 font-medium mb-2 transition-all duration-300 group-focus-within:text-purple-400">
//                 <FaCity /> <span>City</span>
//               </label>
//               <input
//                 {...register('city', {
//                   required: 'City is required',
//                   pattern: { value: /^[A-Za-z\s]+$/, message: 'Only letters and spaces are allowed' },
//                   minLength: { value: 2, message: 'Must be at least 2 characters' },
//                 })}
//                 className="w-full p-3 bg-gray-700 text-gray-200 border border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
//               />
//               {errors.city && <p className="text-red-400 text-sm mt-1">{errors.city.message}</p>}
//             </div>

//             {/* Full Address */}
//             <div className="relative group">
//               <label className="flex items-center space-x-2 text-gray-300 font-medium mb-2 transition-all duration-300 group-focus-within:text-purple-400">
//                 <FaBuilding /> <span>Full Address</span>
//               </label>
//               <input
//                 {...register('full_address', {
//                   required: 'Full Address is required',
//                   minLength: { value: 10, message: 'Must be at least 10 characters' },
//                   maxLength: { value: 100, message: 'Must not exceed 100 characters' },
//                 })}
//                 className="w-full p-3 bg-gray-700 text-gray-200 border border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
//               />
//               {errors.full_address && <p className="text-red-400 text-sm mt-1">{errors.full_address.message}</p>}
//             </div>

//             {/* Service Type */}
//             <div className="relative group">
//               <label className="flex items-center space-x-2 text-gray-300 font-medium mb-2 transition-all duration-300 group-focus-within:text-purple-400">
//                 <FaBriefcase /> <span>Service Type</span>
//               </label>
//               <select
//                 {...register('service_type', { required: 'Service Type is required' })}
//                 className="w-full p-3 bg-gray-700 text-gray-200 border border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
//               >
//                 <option value="">Select Service Type</option>
//                 <option value="Salon">Salon</option>
//                 <option value="Doctor">Doctor</option>
//               </select>
//               {errors.service_type && <p className="text-red-400 text-sm mt-1">{errors.service_type.message}</p>}
//             </div>

//             {/* Years of Experience */}
//             <div className="relative group">
//               <label className="flex items-center space-x-2 text-gray-300 font-medium mb-2 transition-all duration-300 group-focus-within:text-purple-400">
//                 <FaMapMarkerAlt /> <span>Years of Experience</span>
//               </label>
//               <input
//                 {...register('years_of_experience', {
//                   required: 'Years of Experience is required',
//                   pattern: { value: /^[0-9]+$/, message: 'Must be a whole number' },
//                   min: { value: 0, message: 'Cannot be negative' },
//                   max: { value: 50, message: 'Must not exceed 50 years' },
//                 })}
//                 className="w-full p-3 bg-gray-700 text-gray-200 border border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
//                 type="number"
//                 min="0"
//                 max="50"
//                 onKeyPress={(e) => { if (!/[0-9]/.test(e.key)) e.preventDefault(); }}
//               />
//               {errors.years_of_experience && <p className="text-red-400 text-sm mt-1">{errors.years_of_experience.message}</p>}
//             </div>
//           </div>

//           {/* Personal Introduction */}
//           <div className="relative group">
//             <label className="flex items-center space-x-2 text-gray-300 font-medium mb-2 transition-all duration-300 group-focus-within:text-purple-400">
//               <FaBuilding /> <span>Personal Introduction</span>
//             </label>
//             <textarea
//               {...register('personal_intro', {
//                 required: 'Personal Introduction is required',
//                 minLength: { value: 20, message: 'Must be at least 20 characters' },
//                 maxLength: { value: 500, message: 'Must not exceed 500 characters' },
//               })}
//               className="w-full p-3 bg-gray-700 text-gray-200 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 resize-y"
//             />
//             {errors.personal_intro && <p className="text-red-400 text-sm mt-1">{errors.personal_intro.message}</p>}
//           </div>

//           {/* Password */}
//           <div className="relative group">
//             <label className="flex items-center space-x-2 text-gray-300 font-medium mb-2 transition-all duration-300 group-focus-within:text-purple-400">
//               <FaLocationArrow /> <span>Password</span>
//             </label>
//             <div className="relative">
//               <input
//                 type={showPassword ? 'text' : 'password'}
//                 {...register('password', {
//                   required: 'Password is required',
//                   minLength: { value: 8, message: 'Must be at least 8 characters' },
//                   pattern: { value: /^[A-Za-z\d@$!%*?&]+$/, message: 'No spaces allowed; use letters, numbers, or special characters' },
//                 })}
//                 className="w-full p-3 bg-gray-700 text-gray-200 border border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
//                 onKeyPress={blockSpace}
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-purple-400 transition-colors duration-300"
//               >
//                 {showPassword ? <FaEyeSlash /> : <FaEye />}
//               </button>
//             </div>
//             {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>}
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {/* Exterior Image */}
//             <div className="relative group">
//               <label className="flex items-center space-x-2 text-gray-300 font-medium mb-2 transition-all duration-300 group-focus-within:text-purple-400">
//                 <FaFileImage /> <span>Exterior Image URL</span>
//               </label>
//               <input
//                 {...register('exterior_image', { required: 'Exterior Image URL is required' })}
//                 className="w-full p-3 bg-gray-700 text-gray-200 border border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
//                 placeholder="https://example.com/exterior.jpg"
//               />
//               {errors.exterior_image && <p className="text-red-400 text-sm mt-1">{errors.exterior_image.message}</p>}
//             </div>

//             {/* Interior Image */}
//             <div className="relative group">
//               <label className="flex items-center space-x-2 text-gray-300 font-medium mb-2 transition-all duration-300 group-focus-within:text-purple-400">
//                 <FaFileImage /> <span>Interior Image URL</span>
//               </label>
//               <input
//                 {...register('interior_image', { required: 'Interior Image URL is required' })}
//                 className="w-full p-3 bg-gray-700 text-gray-200 border border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
//                 placeholder="https://example.com/interior.jpg"
//               />
//               {errors.interior_image && <p className="text-red-400 text-sm mt-1">{errors.interior_image.message}</p>}
//             </div>
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-full text-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-lg transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
//             disabled={loading || registrationSuccess}
//           >
//             {loading ? (
//               <span className="flex items-center space-x-2">
//                 <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
//                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
//                 </svg>
//                 <span>Submitting...</span>
//               </span>
//             ) : (
//               "Submit"
//             )}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Onboarding;

// import React, { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import axios from 'axios';
// import { Link, useNavigate } from 'react-router-dom';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { FaUser, FaBuilding, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCity, FaLocationArrow, FaBriefcase, FaFileImage, FaEye, FaEyeSlash } from 'react-icons/fa';

// const Onboarding = () => {
//   const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm();
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showOTPModal, setShowOTPModal] = useState(false);
//   const [otp, setOtp] = useState('');
//   const [registrationData, setRegistrationData] = useState(null);
//   const navigate = useNavigate();

//   const pincode = watch('pincode');

//   const fetchAddressData = async (pincode) => {
//     if (!pincode || pincode.length !== 6) return;
//     try {
//       const response = await axios.get(` https://query-q-backend.vercel.app/api/address?pincode=${pincode}`, {
//         headers: { 'Content-Type': 'application/json' },
//       });
//       const data = response.data[0];
//       if (data && data.display_name) {
//         const addressParts = data.display_name.split(', ');
//         const city = addressParts[1];
//         const state = addressParts[2];
//         setValue('city', city, { shouldValidate: true });
//         setValue('state', state, { shouldValidate: true });
//       }
//     } catch (error) {
//       console.error('Error fetching address:', error);
//       toast.error('Failed to fetch address data');
//     }
//   };

//   React.useEffect(() => {
//     if (pincode && pincode.length === 6) {
//       fetchAddressData(pincode);
//     }
//   }, [pincode]);

//   const onSubmit = async (data) => {
//     setLoading(true);
//     const formData = {
//       name: data.name,
//       enterprise_name: data.enterprise_name,
//       email: data.email,
//       contact_number: data.contact_number,
//       state: data.state,
//       city: data.city,
//       pincode: data.pincode,
//       full_address: data.full_address,
//       service_type: data.service_type,
//       years_of_experience: data.years_of_experience,
//       personal_intro: data.personal_intro,
//       password: data.password,
//       exterior_image: data.exterior_image,
//       interior_image: data.interior_image,
//     };

//     try {
//       const response = await axios.post(' https://query-q-backend.vercel.app/api/vendor/register', formData, {
//         headers: { 'Content-Type': 'application/json' },
//       });
//       toast.success('OTP sent to your email!');
//       setRegistrationData({ email: data.email });
//       setShowOTPModal(true);
//       console.log(response.data);
//     } catch (error) {
//       toast.error('Registration failed: ' + (error.response?.data?.message || 'Unknown error'));
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleOTPSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
    
//     try {
//       const response = await axios.post(' https://query-q-backend.vercel.app/api/vendor/verify-otp', {
//         email: registrationData.email,
//         otp: otp
//       }, {
//         headers: { 'Content-Type': 'application/json' },
//       });
      
//       toast.success('Registration successful! OTP verified.');
//       reset();
//       setShowOTPModal(false);
//       setTimeout(() => {
//         navigate('/quirkyQ');
//       }, 3000);
//       console.log(response.data);
//     } catch (error) {
//       toast.error('OTP verification failed: ' + (error.response?.data?.message || 'Invalid OTP'));
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const blockInvalidChars = (e) => {
//     if (!/[A-Za-z\s]/.test(e.key)) e.preventDefault();
//   };

//   const blockSpace = (e) => {
//     if (e.key === ' ') e.preventDefault();
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800 py-12 px-4">
//       <div className="max-w-4xl mx-auto bg-gray-800 p-8 rounded-2xl shadow-2xl transform transition-all duration-500 hover:shadow-purple-500/50 animate-fade-in">
//         <ToastContainer position="top-right" autoClose={3000} />
//         <Link to="/quirkyQ">
//           <h2 className="text-4xl font-extrabold text-center text-white mb-8">
//             <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
//               Professional Onboarding
//             </span>
//           </h2>
//         </Link>

//         {showOTPModal && (
//           <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
//             <div className="bg-gray-900 p-8 rounded-xl shadow-2xl w-96 text-center">
//               <h3 className="text-2xl font-bold text-purple-400 mb-4">Verify OTP</h3>
//               <p className="text-gray-300 mb-6">Enter the OTP sent to {registrationData.email}</p>
//               <form onSubmit={handleOTPSubmit}>
//                 <input
//                   type="text"
//                   value={otp}
//                   onChange={(e) => setOtp(e.target.value)}
//                   className="w-full p-3 mb-4 bg-gray-700 text-gray-200 border border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500"
//                   placeholder="Enter 6-digit OTP"
//                   maxLength={6}
//                   required
//                 />
//                 <button
//                   type="submit"
//                   className="w-full bg-purple-600 text-white py-2 rounded-full hover:bg-purple-700 transition-all duration-300 disabled:opacity-50"
//                   disabled={loading}
//                 >
//                   {loading ? 'Verifying...' : 'Verify OTP'}
//                 </button>
//               </form>
//             </div>
//           </div>
//         )}

//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div className="relative group">
//               <label className="flex items-center space-x-2 text-gray-300 font-medium mb-2 transition-all duration-300 group-focus-within:text-purple-400">
//                 <FaUser /> <span>Full Name</span>
//               </label>
//               <input
//                 {...register('name', {
//                   required: 'Full Name is required',
//                   pattern: { value: /^[A-Za-z\s]+$/, message: 'Only letters and spaces are allowed' },
//                   minLength: { value: 2, message: 'Must be at least 2 characters' },
//                 })}
//                 className="w-full p-3 bg-gray-700 text-gray-200 border border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
//                 onKeyPress={blockInvalidChars}
//               />
//               {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>}
//             </div>

//             <div className="relative group">
//               <label className="flex items-center space-x-2 text-gray-300 font-medium mb-2 transition-all duration-300 group-focus-within:text-purple-400">
//                 <FaBuilding /> <span>Enterprise Name</span>
//               </label>
//               <input
//                 {...register('enterprise_name', {
//                   required: 'Enterprise Name is required',
//                   pattern: { value: /^[A-Za-z\s]+$/, message: 'Only letters and spaces are allowed' },
//                   minLength: { value: 2, message: 'Must be at least 2 characters' },
//                 })}
//                 className="w-full p-3 bg-gray-700 text-gray-200 border border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
//                 onKeyPress={blockInvalidChars}
//               />
//               {errors.enterprise_name && <p className="text-red-400 text-sm mt-1">{errors.enterprise_name.message}</p>}
//             </div>

//             <div className="relative group">
//               <label className="flex items-center space-x-2 text-gray-300 font-medium mb-2 transition-all duration-300 group-focus-within:text-purple-400">
//                 <FaEnvelope /> <span>Email</span>
//               </label>
//               <input
//                 {...register('email', {
//                   required: 'Email is required',
//                   pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: 'Enter a valid email' },
//                 })}
//                 className="w-full p-3 bg-gray-700 text-gray-200 border border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
//               />
//               {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
//             </div>

//             <div className="relative group">
//               <label className="flex items-center space-x-2 text-gray-300 font-medium mb-2 transition-all duration-300 group-focus-within:text-purple-400">
//                 <FaPhone /> <span>Contact Number</span>
//               </label>
//               <div className="flex">
//                 <span className="inline-flex items-center px-4 bg-gray-600 text-gray-200 border border-r-0 border-gray-600 rounded-l-full">+91</span>
//                 <input
//                   {...register('contact_number', {
//                     required: 'Contact Number is required',
//                     pattern: { value: /^[0-9]{10}$/, message: 'Must be exactly 10 digits' },
//                   })}
//                   className="w-full p-3 bg-gray-700 text-gray-200 border border-gray-600 rounded-r-full focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
//                   maxLength={10}
//                   type="tel"
//                   onKeyPress={(e) => { if (!/[0-9]/.test(e.key)) e.preventDefault(); }}
//                 />
//               </div>
//               {errors.contact_number && <p className="text-red-400 text-sm mt-1">{errors.contact_number.message}</p>}
//             </div>

//             <div className="relative group">
//               <label className="flex items-center space-x-2 text-gray-300 font-medium mb-2 transition-all duration-300 group-focus-within:text-purple-400">
//                 <FaLocationArrow /> <span>Pincode</span>
//               </label>
//               <input
//                 {...register('pincode', {
//                   required: 'Pincode is required',
//                   pattern: { value: /^[0-9]{6}$/, message: 'Must be exactly 6 digits' },
//                 })}
//                 className="w-full p-3 bg-gray-700 text-gray-200 border border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
//                 maxLength={6}
//                 type="tel"
//                 onKeyPress={(e) => { if (!/[0-9]/.test(e.key)) e.preventDefault(); }}
//               />
//               {errors.pincode && <p className="text-red-400 text-sm mt-1">{errors.pincode.message}</p>}
//             </div>

//             <div className="relative group">
//               <label className="flex items-center space-x-2 text-gray-300 font-medium mb-2 transition-all duration-300 group-focus-within:text-purple-400">
//                 <FaMapMarkerAlt /> <span>State</span>
//               </label>
//               <input
//                 {...register('state', {
//                   required: 'State is required',
//                   pattern: { value: /^[A-Za-z\s]+$/, message: 'Only letters and spaces are allowed' },
//                   minLength: { value: 2, message: 'Must be at least 2 characters' },
//                 })}
//                 className="w-full p-3 bg-gray-700 text-gray-200 border border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
//               />
//               {errors.state && <p className="text-red-400 text-sm mt-1">{errors.state.message}</p>}
//             </div>

//             <div className="relative group">
//               <label className="flex items-center space-x-2 text-gray-300 font-medium mb-2 transition-all duration-300 group-focus-within:text-purple-400">
//                 <FaCity /> <span>City</span>
//               </label>
//               <input
//                 {...register('city', {
//                   required: 'City is required',
//                   pattern: { value: /^[A-Za-z\s]+$/, message: 'Only letters and spaces are allowed' },
//                   minLength: { value: 2, message: 'Must be at least 2 characters' },
//                 })}
//                 className="w-full p-3 bg-gray-700 text-gray-200 border border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
//               />
//               {errors.city && <p className="text-red-400 text-sm mt-1">{errors.city.message}</p>}
//             </div>

//             <div className="relative group">
//               <label className="flex items-center space-x-2 text-gray-300 font-medium mb-2 transition-all duration-300 group-focus-within:text-purple-400">
//                 <FaBuilding /> <span>Full Address</span>
//               </label>
//               <input
//                 {...register('full_address', {
//                   required: 'Full Address is required',
//                   minLength: { value: 10, message: 'Must be at least 10 characters' },
//                   maxLength: { value: 100, message: 'Must not exceed 100 characters' },
//                 })}
//                 className="w-full p-3 bg-gray-700 text-gray-200 border border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
//               />
//               {errors.full_address && <p className="text-red-400 text-sm mt-1">{errors.full_address.message}</p>}
//             </div>

//             <div className="relative group">
//               <label className="flex items-center space-x-2 text-gray-300 font-medium mb-2 transition-all duration-300 group-focus-within:text-purple-400">
//                 <FaBriefcase /> <span>Service Type</span>
//               </label>
//               <select
//                 {...register('service_type', { required: 'Service Type is required' })}
//                 className="w-full p-3 bg-gray-700 text-gray-200 border border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
//               >
//                 <option value="">Select Service Type</option>
//                 <option value="Salon">Salon</option>
//                 <option value="Doctor">Doctor</option>
//               </select>
//               {errors.service_type && <p className="text-red-400 text-sm mt-1">{errors.service_type.message}</p>}
//             </div>

//             <div className="relative group">
//               <label className="flex items-center space-x-2 text-gray-300 font-medium mb-2 transition-all duration-300 group-focus-within:text-purple-400">
//                 <FaMapMarkerAlt /> <span>Years of Experience</span>
//               </label>
//               <input
//                 {...register('years_of_experience', {
//                   required: 'Years of Experience is required',
//                   pattern: { value: /^[0-9]+$/, message: 'Must be a whole number' },
//                   min: { value: 0, message: 'Cannot be negative' },
//                   max: { value: 50, message: 'Must not exceed 50 years' },
//                 })}
//                 className="w-full p-3 bg-gray-700 text-gray-200 border border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
//                 type="number"
//                 min="0"
//                 max="50"
//                 onKeyPress={(e) => { if (!/[0-9]/.test(e.key)) e.preventDefault(); }}
//               />
//               {errors.years_of_experience && <p className="text-red-400 text-sm mt-1">{errors.years_of_experience.message}</p>}
//             </div>
//           </div>

//           <div className="relative group">
//             <label className="flex items-center space-x-2 text-gray-300 font-medium mb-2 transition-all duration-300 group-focus-within:text-purple-400">
//               <FaBuilding /> <span>Personal Introduction</span>
//             </label>
//             <textarea
//               {...register('personal_intro', {
//                 required: 'Personal Introduction is required',
//                 minLength: { value: 20, message: 'Must be at least 20 characters' },
//                 maxLength: { value: 500, message: 'Must not exceed 500 characters' },
//               })}
//               className="w-full p-3 bg-gray-700 text-gray-200 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 resize-y"
//             />
//             {errors.personal_intro && <p className="text-red-400 text-sm mt-1">{errors.personal_intro.message}</p>}
//           </div>

//           <div className="relative group">
//             <label className="flex items-center space-x-2 text-gray-300 font-medium mb-2 transition-all duration-300 group-focus-within:text-purple-400">
//               <FaLocationArrow /> <span>Password</span>
//             </label>
//             <div className="relative">
//               <input
//                 type={showPassword ? 'text' : 'password'}
//                 {...register('password', {
//                   required: 'Password is required',
//                   minLength: { value: 8, message: 'Must be at least 8 characters' },
//                   pattern: { value: /^[A-Za-z\d@$!%*?&]+$/, message: 'No spaces allowed; use letters, numbers, or special characters' },
//                 })}
//                 className="w-full p-3 bg-gray-700 text-gray-200 border border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
//                 onKeyPress={blockSpace}
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-purple-400 transition-colors duration-300"
//               >
//                 {showPassword ? <FaEyeSlash /> : <FaEye />}
//               </button>
//             </div>
//             {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>}
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div className="relative group">
//               <label className="flex items-center space-x-2 text-gray-300 font-medium mb-2 transition-all duration-300 group-focus-within:text-purple-400">
//                 <FaFileImage /> <span>Exterior Image URL</span>
//               </label>
//               <input
//                 {...register('exterior_image', { required: 'Exterior Image URL is required' })}
//                 className="w-full p-3 bg-gray-700 text-gray-200 border border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
//                 placeholder="https://example.com/exterior.jpg"
//               />
//               {errors.exterior_image && <p className="text-red-400 text-sm mt-1">{errors.exterior_image.message}</p>}
//             </div>

//             <div className="relative group">
//               <label className="flex items-center space-x-2 text-gray-300 font-medium mb-2 transition-all duration-300 group-focus-within:text-purple-400">
//                 <FaFileImage /> <span>Interior Image URL</span>
//               </label>
//               <input
//                 {...register('interior_image', { required: 'Interior Image URL is required' })}
//                 className="w-full p-3 bg-gray-700 text-gray-200 border border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
//                 placeholder="https://example.com/interior.jpg"
//               />
//               {errors.interior_image && <p className="text-red-400 text-sm mt-1">{errors.interior_image.message}</p>}
//             </div>
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-full text-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-lg transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
//             disabled={loading}
//           >
//             {loading ? (
//               <span className="flex items-center space-x-2">
//                 <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
//                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
//                 </svg>
//                 <span>Submitting...</span>
//               </span>
//             ) : (
//               "Send OTP"
//             )}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Onboarding;

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaUser, FaBuilding, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCity, FaLocationArrow, FaBriefcase, FaFileImage, FaEye, FaEyeSlash, FaArrowLeft } from 'react-icons/fa';

const Onboarding = () => {
  const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [otp, setOtp] = useState('');
  const [registrationData, setRegistrationData] = useState(null);
  const navigate = useNavigate();

  const pincode = watch('pincode');

  const fetchAddressData = async (pincode) => {
    if (!pincode || pincode.length !== 6) return;
    try {
      const response = await axios.get(` https://query-q-backend.vercel.app/api/address?pincode=${pincode}`, {
        headers: { 'Content-Type': 'application/json' },
      });
      const data = response.data[0];
      if (data && data.display_name) {
        const addressParts = data.display_name.split(', ');
        const city = addressParts[1];
        const state = addressParts[2];
        setValue('city', city, { shouldValidate: true });
        setValue('state', state, { shouldValidate: true });
      }
    } catch (error) {
      console.error('Error fetching address:', error);
      toast.error('Failed to fetch address data');
    }
  };

  React.useEffect(() => {
    if (pincode && pincode.length === 6) {
      fetchAddressData(pincode);
    }
  }, [pincode]);

  const onSubmit = async (data) => {
    setLoading(true);
    const formData = {
      name: data.name,
      enterprise_name: data.enterprise_name,
      email: data.email,
      contact_number: data.contact_number,
      state: data.state,
      city: data.city,
      pincode: data.pincode,
      full_address: data.full_address,
      service_type: data.service_type,
      years_of_experience: data.years_of_experience,
      personal_intro: data.personal_intro,
      password: data.password,
      exterior_image: data.exterior_image,
      interior_image: data.interior_image,
    };

    try {
      const response = await axios.post(' https://query-q-backend.vercel.app/api/vendor/register', formData, {
        headers: { 'Content-Type': 'application/json' },
      });
      toast.success('OTP sent to your email!');
      setRegistrationData({ email: data.email });
      setShowOTPModal(true);
      console.log(response.data);
    } catch (error) {
      toast.error('Registration failed: ' + (error.response?.data?.message || 'Unknown error'));
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleOTPSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await axios.post(' https://query-q-backend.vercel.app/api/vendor/verify-otp', {
        email: registrationData.email,
        otp: otp
      }, {
        headers: { 'Content-Type': 'application/json' },
      });
      
      toast.success('Registration successful! OTP verified.');
      reset();
      setShowOTPModal(false);
      setTimeout(() => {
        navigate('/quirkyQ');
      }, 3000);
      console.log(response.data);
    } catch (error) {
      toast.error('OTP verification failed: ' + (error.response?.data?.message || 'Invalid OTP'));
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleBackToForm = () => {
    setShowOTPModal(false);
    setOtp('');
    toast.info('Returned to registration form');
  };

  const blockInvalidChars = (e) => {
    if (!/[A-Za-z\s]/.test(e.key)) e.preventDefault();
  };

  const blockSpace = (e) => {
    if (e.key === ' ') e.preventDefault();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-gray-800 p-8 rounded-2xl shadow-2xl transform transition-all duration-500 hover:shadow-purple-500/50 animate-fade-in">
        <ToastContainer position="top-right" autoClose={3000} />
        <Link to="/quirkyQ">
          <h2 className="text-4xl font-extrabold text-center text-white mb-8">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
              Professional Onboarding
            </span>
          </h2>
        </Link>

        {showOTPModal && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
            <div className="bg-gray-900 p-8 rounded-xl shadow-2xl w-96 text-center">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold text-purple-400">Verify OTP</h3>
                <button
                  onClick={handleBackToForm}
                  className="text-gray-400 hover:text-purple-400 transition-colors duration-300"
                >
                  <FaArrowLeft size={20} />
                </button>
              </div>
              <p className="text-gray-300 mb-6">Enter the OTP sent to {registrationData.email}</p>
              <form onSubmit={handleOTPSubmit}>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full p-3 mb-4 bg-gray-700 text-gray-200 border border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter 6-digit OTP"
                  maxLength={6}
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-purple-600 text-white py-2 rounded-full hover:bg-purple-700 transition-all duration-300 disabled:opacity-50"
                  disabled={loading}
                >
                  {loading ? 'Verifying...' : 'Verify OTP'}
                </button>
              </form>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative group">
              <label className="flex items-center space-x-2 text-gray-300 font-medium mb-2 transition-all duration-300 group-focus-within:text-purple-400">
                <FaUser /> <span>Full Name</span>
              </label>
              <input
                {...register('name', {
                  required: 'Full Name is required',
                  pattern: { value: /^[A-Za-z\s]+$/, message: 'Only letters and spaces are allowed' },
                  minLength: { value: 2, message: 'Must be at least 2 characters' },
                })}
                className="w-full p-3 bg-gray-700 text-gray-200 border border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                onKeyPress={blockInvalidChars}
              />
              {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>}
            </div>

            <div className="relative group">
              <label className="flex items-center space-x-2 text-gray-300 font-medium mb-2 transition-all duration-300 group-focus-within:text-purple-400">
                <FaBuilding /> <span>Enterprise Name</span>
              </label>
              <input
                {...register('enterprise_name', {
                  required: 'Enterprise Name is required',
                  pattern: { value: /^[A-Za-z\s]+$/, message: 'Only letters and spaces are allowed' },
                  minLength: { value: 2, message: 'Must be at least 2 characters' },
                })}
                className="w-full p-3 bg-gray-700 text-gray-200 border border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                onKeyPress={blockInvalidChars}
              />
              {errors.enterprise_name && <p className="text-red-400 text-sm mt-1">{errors.enterprise_name.message}</p>}
            </div>

            <div className="relative group">
              <label className="flex items-center space-x-2 text-gray-300 font-medium mb-2 transition-all duration-300 group-focus-within:text-purple-400">
                <FaEnvelope /> <span>Email</span>
              </label>
              <input
                {...register('email', {
                  required: 'Email is required',
                  pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: 'Enter a valid email' },
                })}
                className="w-full p-3 bg-gray-700 text-gray-200 border border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
              />
              {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
            </div>

            <div className="relative group">
              <label className="flex items-center space-x-2 text-gray-300 font-medium mb-2 transition-all duration-300 group-focus-within:text-purple-400">
                <FaPhone /> <span>Contact Number</span>
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-4 bg-gray-600 text-gray-200 border border-r-0 border-gray-600 rounded-l-full">+91</span>
                <input
                  {...register('contact_number', {
                    required: 'Contact Number is required',
                    pattern: { value: /^[0-9]{10}$/, message: 'Must be exactly 10 digits' },
                  })}
                  className="w-full p-3 bg-gray-700 text-gray-200 border border-gray-600 rounded-r-full focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                  maxLength={10}
                  type="tel"
                  onKeyPress={(e) => { if (!/[0-9]/.test(e.key)) e.preventDefault(); }}
                />
              </div>
              {errors.contact_number && <p className="text-red-400 text-sm mt-1">{errors.contact_number.message}</p>}
            </div>

            <div className="relative group">
              <label className="flex items-center space-x-2 text-gray-300 font-medium mb-2 transition-all duration-300 group-focus-within:text-purple-400">
                <FaLocationArrow /> <span>Pincode</span>
              </label>
              <input
                {...register('pincode', {
                  required: 'Pincode is required',
                  pattern: { value: /^[0-9]{6}$/, message: 'Must be exactly 6 digits' },
                })}
                className="w-full p-3 bg-gray-700 text-gray-200 border border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                maxLength={6}
                type="tel"
                onKeyPress={(e) => { if (!/[0-9]/.test(e.key)) e.preventDefault(); }}
              />
              {errors.pincode && <p className="text-red-400 text-sm mt-1">{errors.pincode.message}</p>}
            </div>

            <div className="relative group">
              <label className="flex items-center space-x-2 text-gray-300 font-medium mb-2 transition-all duration-300 group-focus-within:text-purple-400">
                <FaMapMarkerAlt /> <span>State</span>
              </label>
              <input
                {...register('state', {
                  required: 'State is required',
                  pattern: { value: /^[A-Za-z\s]+$/, message: 'Only letters and spaces are allowed' },
                  minLength: { value: 2, message: 'Must be at least 2 characters' },
                })}
                className="w-full p-3 bg-gray-700 text-gray-200 border border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
              />
              {errors.state && <p className="text-red-400 text-sm mt-1">{errors.state.message}</p>}
            </div>

            <div className="relative group">
              <label className="flex items-center space-x-2 text-gray-300 font-medium mb-2 transition-all duration-300 group-focus-within:text-purple-400">
                <FaCity /> <span>City</span>
              </label>
              <input
                {...register('city', {
                  required: 'City is required',
                  pattern: { value: /^[A-Za-z\s]+$/, message: 'Only letters and spaces are allowed' },
                  minLength: { value: 2, message: 'Must be at least 2 characters' },
                })}
                className="w-full p-3 bg-gray-700 text-gray-200 border border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
              />
              {errors.city && <p className="text-red-400 text-sm mt-1">{errors.city.message}</p>}
            </div>

            <div className="relative group">
              <label className="flex items-center space-x-2 text-gray-300 font-medium mb-2 transition-all duration-300 group-focus-within:text-purple-400">
                <FaBuilding /> <span>Full Address</span>
              </label>
              <input
                {...register('full_address', {
                  required: 'Full Address is required',
                  minLength: { value: 10, message: 'Must be at least 10 characters' },
                  maxLength: { value: 100, message: 'Must not exceed 100 characters' },
                })}
                className="w-full p-3 bg-gray-700 text-gray-200 border border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
              />
              {errors.full_address && <p className="text-red-400 text-sm mt-1">{errors.full_address.message}</p>}
            </div>

            <div className="relative group">
              <label className="flex items-center space-x-2 text-gray-300 font-medium mb-2 transition-all duration-300 group-focus-within:text-purple-400">
                <FaBriefcase /> <span>Service Type</span>
              </label>
              <select
                {...register('service_type', { required: 'Service Type is required' })}
                className="w-full p-3 bg-gray-700 text-gray-200 border border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
              >
                <option value="">Select Service Type</option>
                <option value="Salon">Salon</option>
                <option value="Doctor">Doctor</option>
              </select>
              {errors.service_type && <p className="text-red-400 text-sm mt-1">{errors.service_type.message}</p>}
            </div>

            <div className="relative group">
              <label className="flex items-center space-x-2 text-gray-300 font-medium mb-2 transition-all duration-300 group-focus-within:text-purple-400">
                <FaMapMarkerAlt /> <span>Years of Experience</span>
              </label>
              <input
                {...register('years_of_experience', {
                  required: 'Years of Experience is required',
                  pattern: { value: /^[0-9]+$/, message: 'Must be a whole number' },
                  min: { value: 0, message: 'Cannot be negative' },
                  max: { value: 50, message: 'Must not exceed 50 years' },
                })}
                className="w-full p-3 bg-gray-700 text-gray-200 border border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                type="number"
                min="0"
                max="50"
                onKeyPress={(e) => { if (!/[0-9]/.test(e.key)) e.preventDefault(); }}
              />
              {errors.years_of_experience && <p className="text-red-400 text-sm mt-1">{errors.years_of_experience.message}</p>}
            </div>
          </div>

          <div className="relative group">
            <label className="flex items-center space-x-2 text-gray-300 font-medium mb-2 transition-all duration-300 group-focus-within:text-purple-400">
              <FaBuilding /> <span>Personal Introduction</span>
            </label>
            <textarea
              {...register('personal_intro', {
                required: 'Personal Introduction is required',
                minLength: { value: 20, message: 'Must be at least 20 characters' },
                maxLength: { value: 500, message: 'Must not exceed 500 characters' },
              })}
              className="w-full p-3 bg-gray-700 text-gray-200 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 resize-y"
            />
            {errors.personal_intro && <p className="text-red-400 text-sm mt-1">{errors.personal_intro.message}</p>}
          </div>

          <div className="relative group">
            <label className="flex items-center space-x-2 text-gray-300 font-medium mb-2 transition-all duration-300 group-focus-within:text-purple-400">
              <FaLocationArrow /> <span>Password</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                {...register('password', {
                  required: 'Password is required',
                  minLength: { value: 8, message: 'Must be at least 8 characters' },
                  pattern: { value: /^[A-Za-z\d@$!%*?&]+$/, message: 'No spaces allowed; use letters, numbers, or special characters' },
                })}
                className="w-full p-3 bg-gray-700 text-gray-200 border border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                onKeyPress={blockSpace}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-purple-400 transition-colors duration-300"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative group">
              <label className="flex items-center space-x-2 text-gray-300 font-medium mb-2 transition-all duration-300 group-focus-within:text-purple-400">
                <FaFileImage /> <span>Exterior Image URL</span>
              </label>
              <input
                {...register('exterior_image', { required: 'Exterior Image URL is required' })}
                className="w-full p-3 bg-gray-700 text-gray-200 border border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                placeholder="https://example.com/exterior.jpg"
              />
              {errors.exterior_image && <p className="text-red-400 text-sm mt-1">{errors.exterior_image.message}</p>}
            </div>

            <div className="relative group">
              <label className="flex items-center space-x-2 text-gray-300 font-medium mb-2 transition-all duration-300 group-focus-within:text-purple-400">
                <FaFileImage /> <span>Interior Image URL</span>
              </label>
              <input
                {...register('interior_image', { required: 'Interior Image URL is required' })}
                className="w-full p-3 bg-gray-700 text-gray-200 border border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                placeholder="https://example.com/interior.jpg"
              />
              {errors.interior_image && <p className="text-red-400 text-sm mt-1">{errors.interior_image.message}</p>}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-full text-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-lg transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center space-x-2">
                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                </svg>
                <span>Submitting...</span>
              </span>
            ) : (
              "Send OTP"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Onboarding;