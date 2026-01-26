import React from 'react';

const PrivacyPolicy = () => {
    return (
        <div className="max-w-4xl mx-auto p-8">
            <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 prose prose-purple">
                <p className="text-gray-600 mb-4">Last Updated: January 26, 2026</p>
                <h2 className="text-xl font-bold mt-6 mb-3">1. Information We Collect</h2>
                <p className="text-gray-600 mb-4">We collect information you provide directly to us when you create an account, such as your name, email address, and mobile number.</p>
                <h2 className="text-xl font-bold mt-6 mb-3">2. How We Use Your Information</h2>
                <p className="text-gray-600 mb-4">We use the information we collect to provide, maintain, and improve our services, and to process your registration and course progress.</p>
                <h2 className="text-xl font-bold mt-6 mb-3">3. Data Security</h2>
                <p className="text-gray-600 mb-4">We take reasonable measures to help protect information about you from loss, theft, misuse, and unauthorized access.</p>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
