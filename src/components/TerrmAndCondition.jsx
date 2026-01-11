import React from 'react';
import Navbar from '../pages/Navbar';
import Footer from './Footer';
import Header from './Header';

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 pt-32">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
            QuirqyQ <span className="text-indigo-400">Terms & Conditions</span>
          </h1>
          <p className="text-lg text-gray-300">
            Effective Date: March 25, 2025
          </p>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-2xl shadow-xl p-8 md:p-10">
          <section className="mb-10">
            <p className="text-gray-300 leading-relaxed">
              These Terms and Conditions ("Agreement") govern your use of QuirqyQ, operated by Bookthrutech Services Private Limited. By accessing or using our platform, you agree to comply with these terms.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-indigo-300 mb-4">1. Services Provided</h2>
            <p className="text-gray-300 mb-4">
              QuirqyQ is a universal online appointment booking platform for:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-300">
              <li>Doctors (online and offline consultations)</li>
              <li>Salons (in-store and at-home services)</li>
              <li>Other service providers as listed on our platform</li>
            </ul>
            <p className="text-gray-300 mt-4">
              We only act as an intermediary and do not provide these services directly.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-indigo-300 mb-4">2. User Responsibilities</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-300">
              <li>Users must provide accurate and complete details during booking.</li>
              <li>Users agree to comply with service provider policies.</li>
              <li>Users are responsible for any actions taken using their accounts.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-indigo-300 mb-4">3. Payment & Billing</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-300">
              <li>Payments are processed via secure third-party payment gateways.</li>
              <li>Prices for services are displayed at the time of booking.</li>
              <li>QuirqyQ is not responsible for additional charges levied by service providers.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-indigo-300 mb-4">4. Appointment Cancellation & Refund Policy</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-300">
              <li>Users may cancel an appointment within 1 hour before for a full refund.</li>
              <li>Late cancellations or no-shows may not be eligible for a refund.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-indigo-300 mb-4">5. Liability & Disclaimers</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-300">
              <li>QuirqyQ is not liable for the quality of services provided by third parties.</li>
              <li>We do not guarantee appointment availability.</li>
              <li>We are not responsible for any loss or damage arising from the use of the platform.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-indigo-300 mb-4">6. Governing Law & Jurisdiction</h2>
            <p className="text-gray-300">
              This Agreement shall be governed by the laws of India, with disputes subject to Bharatpur, Rajasthan jurisdiction.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-indigo-300 mb-4">7. Contact Information</h2>
            <p className="text-gray-300 mb-4">
              For any queries, contact our Grievance Officer:
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

export default TermsAndConditions;