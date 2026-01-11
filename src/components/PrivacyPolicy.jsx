import React from 'react';
import Navbar from '../pages/Navbar';
import Footer from './Footer';
import Header from './Header';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 pt-32">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
            QuirqyQ <span className="text-indigo-400">Privacy Policy</span>
          </h1>
          <p className="text-lg text-gray-300">
            Last Updated: March 24, 2025
          </p>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-2xl shadow-xl p-8 md:p-10">
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-indigo-300 mb-4">Introduction</h2>
            <p className="text-gray-300 leading-relaxed">
              Bookthrutech Services Private Limited ("QuirqyQ," "we," "us," or "our") operates the universal online appointment booking platform QuirqyQ, enabling users to book appointments for doctors, salons, and other services at stores or at home. We are committed to protecting your privacy and ensuring the security of your personal data.
            </p>
            <p className="text-gray-300 leading-relaxed mt-4">
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform. By accessing or using QuirqyQ, you consent to the practices described in this policy.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-indigo-300 mb-4">Information We Collect</h2>
            <p className="text-gray-300 mb-4">We may collect the following types of information:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-300">
              <li><span className="font-medium">Personal Information:</span> Name, email, phone number, address, payment details, and appointment preferences.</li>
              <li><span className="font-medium">Service Provider Information:</span> Business details, license information, service descriptions, and availability.</li>
              <li><span className="font-medium">Usage Data:</span> IP address, device type, browser, pages visited, and booking history.</li>
              <li><span className="font-medium">Location Data:</span> For facilitating at-home services.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-indigo-300 mb-4">How We Use Your Information</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-300">
              <li>To facilitate appointment bookings and payments.</li>
              <li>To improve platform functionality and user experience.</li>
              <li>To send service-related notifications, offers, and updates.</li>
              <li>To comply with legal obligations and prevent fraud.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-indigo-300 mb-4">Data Sharing & Disclosure</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-300">
              <li><span className="font-medium">Service Providers:</span> We share necessary details with doctors, salons, or other service providers to fulfill bookings.</li>
              <li><span className="font-medium">Payment Processors:</span> Secure third-party gateways handle transactions.</li>
              <li><span className="font-medium">Legal Compliance:</span> Data may be disclosed if required by law.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-indigo-300 mb-4">Data Security</h2>
            <p className="text-gray-300 leading-relaxed">
              We implement industry-standard encryption (SSL/TLS) and access controls to protect your data. However, no online transmission is 100% secure.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-indigo-300 mb-4">Your Rights</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-300">
              <li>Access, correct, or delete your personal data.</li>
              <li>Opt out of marketing communications.</li>
              <li>Withdraw consent (may affect service availability).</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-indigo-300 mb-4">Cookies & Tracking</h2>
            <p className="text-gray-300 leading-relaxed">
              We use cookies to enhance user experience. You can disable them via browser settings.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-indigo-300 mb-4">Third-Party Links</h2>
            <p className="text-gray-300 leading-relaxed">
              Our platform may link to external sites. We are not responsible for their privacy practices.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-indigo-300 mb-4">Changes to This Policy</h2>
            <p className="text-gray-300 leading-relaxed">
              We may update this policy periodically. Continued use of QuirqyQ constitutes acceptance of changes.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-indigo-300 mb-4">Cancellation & Refund Policy</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-300">
              <li>Cancellations must be made at least 24 hours before the appointment time.</li>
              <li>Refunds will be processed within 5-7 business days.</li>
              <li>No-shows may be subject to full charges.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-indigo-300 mb-4">Grievance Officer</h2>
            <div className="bg-gray-700/50 rounded-lg p-6 border border-gray-600">
              <p className="font-medium text-white">Sahil Sharma</p>
              <p className="text-gray-300 mt-2">Email: <a href="mailto:contact@quirkyq.co.in" className="text-indigo-400 hover:underline">contact@quirkyq.co.in</a></p>
              <p className="text-gray-300">Phone: <a href="tel:+917014362177" className="text-indigo-400 hover:underline">+91 7014362177</a></p>
              <p className="text-gray-300 mt-2">Registered Address: 886, Shyam Nagar Colony, Bharatpur, Rajasthan</p>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;