import React from 'react';
import Footer from './Footer';
import Header from './Header';

const ShippingAndDelivery = () => {
  return (
 <div className='py-16'>
      <Header/>
       <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-purple-400 mb-4">Shipping and Delivery Policy</h1>
      <p className="mb-4">Welcome to <strong>QuirkyQ</strong>, your one-stop solution for Salon and Doctor bookings. We value your trust and strive to provide a seamless experience, including clear and transparent shipping and delivery policies.</p>
      
      <h2 className="text-2xl font-semibold text-gray-300 mt-6">Verification Process</h2>
      <p className="mb-4">To ensure the safety and security of our users, all bookings and service requests undergo a verification process. This includes verifying customer details and service provider credentials.</p>
      
      <h2 className="text-2xl font-semibold text-gray-300 mt-6">Shipping of Products</h2>
      <p className="mb-4">For customers purchasing products through QuirkyQ, we ensure timely dispatch and delivery. Shipping times vary depending on location and selected delivery method. Tracking information will be provided once your order is shipped.</p>
      
      <h2 className="text-2xl font-semibold text-gray-300 mt-6">Service Delivery</h2>
      <p className="mb-4">All salon and doctor appointment bookings are confirmed via email and SMS. Service providers will adhere to the scheduled time, and customers are advised to arrive on time for their appointments to avoid rescheduling issues.</p>
      
      <h2 className="text-2xl font-semibold text-gray-300 mt-6">Legal Compliance</h2>
      <p className="mb-4">Our shipping and service delivery policies comply with local regulations. If you have any legal inquiries, our dedicated legal team is available to assist with any concerns regarding compliance, disputes, or service guarantees.</p>
      
      <h2 className="text-2xl font-semibold text-gray-300 mt-6">Contact Us</h2>
      <p>If you have any questions or require further clarification regarding our Shipping and Delivery policies, please contact our support team at <strong>support@quirkyq.com</strong>.</p>
    </div>
    <Footer/>
 </div>
  );
};

export default ShippingAndDelivery;
