import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './Footer';
import Header from './Header';



const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Message sent successfully!', { position: toast.POSITION.TOP_RIGHT });
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="bg-white min-h-screen">
      <Header />
      <div className="max-w-7xl mx-auto my-12 p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Map Section */}
        <div className="w-full h-[500px] rounded-xl overflow-hidden shadow-xl">
          <iframe
            className="w-full h-full border-none"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345093705!2d144.9559238153183!3d-37.81720997975195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d5df0f28f7b%3A0x5045675218ce7e33!2sMelbourne%2C%20Victoria%2C%20Australia!5e0!3m2!1sen!2sin!4v1647851593658!5m2!1sen!2sin"
            allowFullScreen=""
            loading="lazy"
            title="Google Map"
          ></iframe>
        </div>
        {/* Contact Form */}
        <div className="bg-white p-10 shadow-xl rounded-xl">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-6">Contact Us</h2>
          <p className="text-center text-gray-600 mb-6">We'd love to hear from you!</p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium">Name</label>
              <input 
                type="text" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                className="w-full mt-2 p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-700"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Email</label>
              <input 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                className="w-full mt-2 p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-700"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Message</label>
              <textarea 
                name="message" 
                value={formData.message} 
                onChange={handleChange} 
                rows="4" 
                className="w-full mt-2 p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-700"
                required
              ></textarea>
            </div>
            <button 
              type="submit" 
              className="w-full bg-gray-900 text-white py-4 rounded-lg font-medium hover:bg-gray-700 transition"
            >
              Submit
            </button>
          </form>

        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactUs;
