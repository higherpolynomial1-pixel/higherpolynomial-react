import React from 'react';
import Navbar from '../pages/Navbar';
import Footer from './Footer';
import Header from './Header';

const ContentPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 pt-32">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
            QuirqyQ <span className="text-indigo-400">Content Policy</span>
          </h1>
          <p className="text-lg text-gray-300">
            Effective Date: March 20, 2025
          </p>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-2xl shadow-xl p-8 md:p-10">
          <section className="mb-10">
            <p className="text-gray-300 leading-relaxed">
              QuirqyQ is committed to providing a safe and respectful platform for all users. This Content Policy governs user-generated content, including reviews, feedback, and service provider listings.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-indigo-300 mb-4">1. Acceptable Content</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-300">
              <li>Reviews and feedback should be honest, constructive, and respectful.</li>
              <li>Service descriptions must be accurate and not misleading.</li>
              <li>No content should violate legal or ethical guidelines.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-indigo-300 mb-4">2. Prohibited Content</h2>
            <p className="text-gray-300 mb-4">Users must not post:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-300">
              <li>False, misleading, or defamatory statements</li>
              <li>Hate speech, discrimination, or offensive material</li>
              <li>Fraudulent promotions, spam, or advertisements</li>
              <li>Content that infringes on intellectual property rights</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-indigo-300 mb-4">3. Moderation & Enforcement</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-300">
              <li>We reserve the right to edit or remove any content that violates these guidelines.</li>
              <li>Users who repeatedly violate this policy may face account suspension or termination.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-indigo-300 mb-4">4. Reporting Violations</h2>
            <p className="text-gray-300 mb-4">
              If you come across content that violates our policy, report it via:
            </p>
            <div className="bg-gray-700/50 rounded-lg p-6 border border-gray-600">
              <p className="font-medium text-white">Grievance Officer: Sahil Sharma</p>
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

export default ContentPolicy;