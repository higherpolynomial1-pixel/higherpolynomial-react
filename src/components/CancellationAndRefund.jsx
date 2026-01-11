



import React from 'react';
import Navbar from '../pages/Navbar';
import Footer from './Footer';
import Header from './Header';

const CancellationAndRefund = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 pt-32">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
            QuirqyQ <span className="text-indigo-400">Refund & Cancellation Policy</span>
          </h1>
          <p className="text-lg text-gray-300">
            Effective Date: March 23, 2025
          </p>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-2xl shadow-xl p-8 md:p-10">
          <section className="mb-10">
            <p className="text-gray-300 leading-relaxed">
              We understand that plans change, and we strive to provide a flexible cancellation and refund policy.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-indigo-300 mb-4">1. Cancellation Policy</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-300">
              <li>Users can cancel an appointment at least 1 hour before the scheduled time for a full refund.</li>
              <li>Cancellations made within 1 hour of the appointment may not be eligible for a refund.</li>
              <li>Service providers may have individual cancellation policies that apply in addition to ours.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-indigo-300 mb-4">2. Refund Process</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-300">
              <li>Refunds will be processed within 5-7 business days after approval.</li>
              <li>Refunds will be issued to the original payment method.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-indigo-300 mb-4">3. No-Show Policy</h2>
            <p className="text-gray-300">
              If a user does not show up for an appointment, no refund will be provided.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-indigo-300 mb-4">4. Service Provider Cancellations</h2>
            <p className="text-gray-300">
              If a service provider cancels the appointment, the user will receive a full refund or an option to reschedule.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-indigo-300 mb-4">5. How to Request a Refund</h2>
            <p className="text-gray-300">
              To request a refund, contact our customer support with booking details.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-indigo-300 mb-4">6. Contact Information</h2>
            <p className="text-gray-300 mb-4">
              For cancellations and refunds, reach out to:
            </p>
            <div className="bg-gray-700/50 rounded-lg p-6 border border-gray-600">
              <p className="font-medium text-white">Sahil Sharma</p>
              <p className="text-gray-300 mt-2">Phone: <a href="tel:+917014362177" className="text-indigo-400 hover:underline">+91 7014362177</a></p>
              <p className="text-gray-300">Email: <a href="mailto:contact@quirkyq.co.in" className="text-indigo-400 hover:underline">contact@quirkyq.co.in</a></p>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CancellationAndRefund;