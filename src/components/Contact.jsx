

// import React, { useState, useEffect } from 'react';
// import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

// const ContactUs = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     message: '',
//   });
//   const [submitted, setSubmitted] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 50);
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Form submitted:', formData);
//     setSubmitted(true);
//     setFormData({ name: '', email: '', message: '' });
//     setTimeout(() => setSubmitted(false), 3000);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
//       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
//         <div className="text-center mb-12 animate-fade-in">
//           <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-5">
//             Contact <span className="text-purple-400">Us</span>
//           </h1>
//           <p className="text-base text-gray-300 max-w-2xl mx-auto">
//             We’re here to assist you with any questions or concerns. Reach out to us today!
//           </p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
//           {/* Contact Information */}
//           <div className="bg-gray-800 p-6 rounded-3xl shadow-lg">
//             <h2 className="text-2xl font-bold text-white mb-6 animate-fade-in">Get in Touch</h2>
//             <div className="space-y-6">
//               <div className="flex items-center text-gray-300 animate-slide-up">
//                 <FaPhoneAlt className="mr-3 text-purple-400" />
//                 <span>+91 123-456-7890</span>
//               </div>
//               <div className="flex items-center text-gray-300 animate-slide-up" style={{ animationDelay: '0.2s' }}>
//                 <FaEnvelope className="mr-3 text-purple-400" />
//                 <span>support@quirkyq.com</span>
//               </div>
//               <div className="flex items-center text-gray-300 animate-slide-up" style={{ animationDelay: '0.4s' }}>
//                 <FaMapMarkerAlt className="mr-3 text-purple-400" />
//                 <span>123 Wellness Street, Quirky City, India</span>
//               </div>
//             </div>
//           </div>

//           {/* Contact Form */}
//           <div className="bg-gray-800 p-6 rounded-3xl shadow-lg">
//             {submitted ? (
//               <div className="text-center animate-fade-in">
//                 <h2 className="text-xl font-bold text-white mb-4">Thank You!</h2>
//                 <p className="text-gray-300">Your message has been sent. We’ll get back to you soon!</p>
//               </div>
//             ) : (
//               <form onSubmit={handleSubmit}>
//                 <h2 className="text-2xl font-bold text-white mb-6 animate-fade-in">Send Us a Message</h2>
//                 <div className="space-y-6">
//                   <div className="animate-slide-up">
//                     <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
//                       Name
//                     </label>
//                     <input
//                       type="text"
//                       id="name"
//                       name="name"
//                       value={formData.name}
//                       onChange={handleChange}
//                       className="w-full p-3 bg-gray-700 text-gray-200 border border-gray-600 rounded-full focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all duration-300"
//                       placeholder="Your Name"
//                       required
//                     />
//                   </div>
//                   <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
//                     <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
//                       Email
//                     </label>
//                     <input
//                       type="email"
//                       id="email"
//                       name="email"
//                       value={formData.email}
//                       onChange={handleChange}
//                       className="w-full p-3 bg-gray-700 text-gray-200 border border-gray-600 rounded-full focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all duration-300"
//                       placeholder="Your Email"
//                       required
//                     />
//                   </div>
//                   <div className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
//                     <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
//                       Message
//                     </label>
//                     <textarea
//                       id="message"
//                       name="message"
//                       value={formData.message}
//                       onChange={handleChange}
//                       className="w-full p-3 bg-gray-700 text-gray-200 border border-gray-600 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all duration-300 resize-none"
//                       placeholder="Your Message"
//                       rows="5"
//                       required
//                     />
//                   </div>
//                   <button
//                     type="submit"
//                     className="w-full py-3 px-4 bg-purple-600 text-white rounded-full font-medium hover:bg-purple-700 transition-all duration-300 shadow-md hover:shadow-lg animate-fade-in"
//                   >
//                     Send Message
//                   </button>
//                 </div>
//               </form>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Google Map Embed */}
//       <div className="w-full h-96 bg-gray-900">
//         <iframe
//           src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.599318352856!2d72.82952851415586!3d19.12570198705914!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c9c676018b43%3A0x3b0b8b9b7a9c9f6e!2sMumbai%2C%20Maharashtra%2C%20India!5e0!3m2!1sen!2sus!4v1634567890123"
//           width="100%"
//           height="100%"
//           style={{ border: 0 }}
//           allowFullScreen=""
//           loading="lazy"
//           title="Our Location"
//         ></iframe>
//       </div>
//     </div>
//   );
// };

// export default ContactUs;

// import React, { useState, useEffect } from 'react';
// import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

// const ContactUs = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     message: '',
//     captcha: ''
//   });
//   const [submitted, setSubmitted] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [captchaText, setCaptchaText] = useState('');
//   const [captchaError, setCaptchaError] = useState('');

//   // Generate random captcha
//   useEffect(() => {
//     generateCaptcha();
//   }, []);

//   const generateCaptcha = () => {
//     const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
//     let captcha = '';
//     for (let i = 0; i < 6; i++) {
//       captcha += chars[Math.floor(Math.random() * chars.length)];
//     }
//     setCaptchaText(captcha);
//     setFormData(prev => ({ ...prev, captcha: '' })); // Clear previous captcha input
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
    
//     // Validate captcha
//     if (formData.captcha !== captchaText) {
//       setCaptchaError('Captcha does not match');
//       generateCaptcha();
//       return;
//     }
    
//     setCaptchaError('');
//     console.log('Form submitted:', formData);
//     setSubmitted(true);
//     setFormData({ name: '', email: '', message: '', captcha: '' });
//     generateCaptcha();
//     setTimeout(() => setSubmitted(false), 3000);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
//       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
//         <div className="text-center mb-12 animate-fade-in">
//           <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-5">
//             Contact <span className="text-purple-400">Us</span>
//           </h1>
//           <p className="text-base text-gray-300 max-w-2xl mx-auto">
//             We're here to assist you with any questions or concerns. Reach out to us today!
//           </p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
//           {/* Contact Information */}
//           <div className="bg-gray-800 p-6 rounded-3xl shadow-lg">
//             <h2 className="text-2xl font-bold text-white mb-6 animate-fade-in">Get in Touch</h2>
//             <div className="space-y-6">
//               <div className="flex items-center text-gray-300 animate-slide-up">
//                 <FaPhoneAlt className="mr-3 text-purple-400" />
//                 <span>+91 70143 62177</span>
//               </div>
//               <div className="flex items-center text-gray-300 animate-slide-up" style={{ animationDelay: '0.2s' }}>
//                 <FaEnvelope className="mr-3 text-purple-400" />
//                 <span>support@quirkyq.com</span>
//               </div>
//               <div className="flex items-center text-gray-300 animate-slide-up" style={{ animationDelay: '0.4s' }}>
//                 <FaMapMarkerAlt className="mr-3 text-purple-400" />
//                 <span>886, Shyam Nagar, Bharatpur Raj</span>
//               </div>
//             </div>
//           </div>

//           {/* Contact Form */}
//           <div className="bg-gray-800 p-6 rounded-3xl shadow-lg">
//             {submitted ? (
//               <div className="text-center animate-fade-in">
//                 <h2 className="text-xl font-bold text-white mb-4">Thank You!</h2>
//                 <p className="text-gray-300">Your message has been sent. We'll get back to you soon!</p>
//               </div>
//             ) : (
//               <form onSubmit={handleSubmit}>
//                 <h2 className="text-2xl font-bold text-white mb-6 animate-fade-in">Send Us a Message</h2>
//                 <div className="space-y-6">
//                   <div className="animate-slide-up">
//                     <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
//                       Name
//                     </label>
//                     <input
//                       type="text"
//                       id="name"
//                       name="name"
//                       value={formData.name}
//                       onChange={handleChange}
//                       className="w-full p-3 bg-gray-700 text-gray-200 border border-gray-600 rounded-full focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all duration-300"
//                       placeholder="Your Name"
//                       required
//                     />
//                   </div>
//                   <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
//                     <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
//                       Email
//                     </label>
//                     <input
//                       type="email"
//                       id="email"
//                       name="email"
//                       value={formData.email}
//                       onChange={handleChange}
//                       className="w-full p-3 bg-gray-700 text-gray-200 border border-gray-600 rounded-full focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all duration-300"
//                       placeholder="Your Email"
//                       required
//                     />
//                   </div>
//                   <div className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
//                     <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
//                       Message
//                     </label>
//                     <textarea
//                       id="message"
//                       name="message"
//                       value={formData.message}
//                       onChange={handleChange}
//                       className="w-full p-3 bg-gray-700 text-gray-200 border border-gray-600 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all duration-300 resize-none"
//                       placeholder="Your Message"
//                       rows="5"
//                       required
//                     />
//                   </div>
                  
//                   {/* Captcha Section */}
//                   <div className="animate-slide-up" style={{ animationDelay: '0.6s' }}>
//                     <div className="flex items-center mb-2">
//                       <label htmlFor="captcha" className="block text-sm font-medium text-gray-300">
//                         Captcha
//                       </label>
//                       <button 
//                         type="button" 
//                         onClick={generateCaptcha}
//                         className="ml-2 text-xs text-purple-400 hover:text-purple-300"
//                       >
//                         Refresh
//                       </button>
//                     </div>
//                     <div className="flex items-center space-x-3">
//                       <div className="flex-1 bg-gray-700 p-2 rounded-lg text-center font-mono text-lg tracking-widest">
//                         {captchaText}
//                       </div>
//                       <input
//                         type="text"
//                         id="captcha"
//                         name="captcha"
//                         value={formData.captcha}
//                         onChange={handleChange}
//                         className="flex-1 p-3 bg-gray-700 text-gray-200 border border-gray-600 rounded-full focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all duration-300"
//                         placeholder="Enter captcha"
//                         required
//                       />
//                     </div>
//                     {captchaError && (
//                       <p className="mt-1 text-sm text-red-400">{captchaError}</p>
//                     )}
//                   </div>
                  
//                   <button
//                     type="submit"
//                     className="w-full py-3 px-4 bg-purple-600 text-white rounded-full font-medium hover:bg-purple-700 transition-all duration-300 shadow-md hover:shadow-lg animate-fade-in"
//                   >
//                     Send Message
//                   </button>
//                 </div>
//               </form>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ContactUs;


import React, { useState, useEffect } from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    captcha: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [captchaText, setCaptchaText] = useState('');
  const [captchaError, setCaptchaError] = useState('');

  // Generate random captcha
  useEffect(() => {
    generateCaptcha();
  }, []);

  const generateCaptcha = () => {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let captcha = '';
    for (let i = 0; i < 6; i++) {
      captcha += chars[Math.floor(Math.random() * chars.length)];
    }
    setCaptchaText(captcha);
    setFormData(prev => ({ ...prev, captcha: '' }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (formData.captcha !== captchaText) {
      setCaptchaError('Captcha does not match');
      generateCaptcha();
      return;
    }
    
    setCaptchaError('');
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '', captcha: '' });
    generateCaptcha();
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
            Contact <span className="text-purple-400">Us</span>
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            We're here to assist you with any questions or concerns.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Information - Made more compact */}
          <div className="bg-gray-800 p-6 rounded-2xl shadow-lg">
            <h2 className="text-xl font-bold text-white mb-4">Our Details</h2>
            <div className="space-y-4">
              <div className="flex items-start text-gray-300">
                <FaPhoneAlt className="mt-1 mr-3 text-purple-400 flex-shrink-0" />
                <span>+91 70143 62177</span>
              </div>
              <div className="flex items-start text-gray-300">
                <FaEnvelope className="mt-1 mr-3 text-purple-400 flex-shrink-0" />
                <span>support@quirkyq.co.in</span>
              </div>
              <div className="flex items-start text-gray-300">
                <FaMapMarkerAlt className="mt-1 mr-3 text-purple-400 flex-shrink-0" />
                <span>886, Shyam Nagar, Bharatpur Raj.</span>
              </div>
            </div>

            {/* Added a small divider */}
            <div className="border-t border-gray-700 my-4"></div>

            {/* Business Hours */}
            <div className="mt-4">
              <h3 className="text-lg font-medium text-white mb-2">Business Hours</h3>
              <p className="text-gray-300">Monday - Sunday: 8AM - 10PM</p>
             
            </div>
          </div>

          {/* Contact Form - Made more compact */}
          <div className="bg-gray-800 p-6 rounded-2xl shadow-lg">
            {submitted ? (
              <div className="text-center py-8">
                <h2 className="text-xl font-bold text-white mb-2">Thank You!</h2>
                <p className="text-gray-300">Your message has been sent successfully.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h2 className="text-xl font-bold text-white mb-4">Send a Message</h2>
                <div className="space-y-4">
                  <div>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full p-3 bg-gray-700 text-gray-200 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
                      placeholder="Your Name"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full p-3 bg-gray-700 text-gray-200 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
                      placeholder="Your Email"
                      required
                    />
                  </div>
                  <div>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full p-3 bg-gray-700 text-gray-200 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none resize-none"
                      placeholder="Your Message"
                      rows="4"
                      required
                    />
                  </div>
                  
                  {/* Compact Captcha Section */}
                  <div className="mb-2">
                    <div className="flex justify-between items-center mb-1">
                      <label htmlFor="captcha" className="text-sm text-gray-300">
                        Enter Captcha
                      </label>
                      <button 
                        type="button" 
                        onClick={generateCaptcha}
                        className="text-xs text-purple-400 hover:text-purple-300"
                      >
                        Refresh
                      </button>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-700 p-2 rounded-lg text-center font-mono tracking-wider">
                        {captchaText}
                      </div>
                      <input
                        type="text"
                        id="captcha"
                        name="captcha"
                        value={formData.captcha}
                        onChange={handleChange}
                        className="flex-1 p-2 bg-gray-700 text-gray-200 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
                        placeholder="Type here"
                        required
                      />
                    </div>
                    {captchaError && (
                      <p className="mt-1 text-xs text-red-400">{captchaError}</p>
                    )}
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full py-3 px-4 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors duration-300"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
