import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaLock, FaEnvelope, FaCity, FaPhone, FaArrowLeft } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify';

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        mobile_number: '',
    });
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const [isOtpSent, setIsOtpSent] = useState(false);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSendOtp = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post('http://localhost:3000/api/signup', formData);
            if (response.status === 200) {
                toast.success('OTP sent to your email!');
                setIsOtpSent(true);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to send OTP. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post('http://localhost:3000/api/verify-otp', {
                email: formData.email,
                otp: otp
            });

            if (response.status === 201) {
                toast.success('Signup successful! Please login.');
                setTimeout(() => navigate('/login'), 2000);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Invalid OTP or signup failed.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0f172a] relative overflow-hidden font-sans py-12 px-4">
            {/* Background Glow */}
            <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 blur-[120px] rounded-full"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full"></div>

            <div className="w-full max-w-lg relative z-10">
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-10 shadow-2xl">
                    {/* Header */}
                    <div className="text-center mb-10">
                        <div className="inline-flex w-16 h-16 bg-purple-600 rounded-2xl items-center justify-center shadow-lg shadow-purple-500/30 mb-4 -rotate-3">
                            <span className="text-white text-3xl font-black italic">Q</span>
                        </div>
                        <h1 className="text-3xl font-black text-white tracking-tight">
                            {isOtpSent ? "Email Verification" : "Create Account"}
                        </h1>
                        <p className="text-gray-400 mt-2 font-medium">
                            {isOtpSent ? `Enter the 6-digit code sent to ${formData.email}` : "Join EduLearn to start your learning journey"}
                        </p>
                    </div>

                    {!isOtpSent ? (
                        <form onSubmit={handleSendOtp} className="space-y-6">
                            <div className="space-y-4">
                                {/* Full Name */}
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-300 ml-1">Full Name</label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-purple-500 transition-colors">
                                            <FaUser />
                                        </div>
                                        <input
                                            name="name"
                                            type="text"
                                            required
                                            className="w-full pl-11 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all font-medium"
                                            placeholder="John Doe"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-300 ml-1">Email Address</label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-purple-500 transition-colors">
                                            <FaEnvelope />
                                        </div>
                                        <input
                                            name="email"
                                            type="email"
                                            required
                                            className="w-full pl-11 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all font-medium"
                                            placeholder="john@example.com"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>

                                {/* Mobile Number */}
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-300 ml-1">Mobile Number</label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-purple-500 transition-colors">
                                            <FaPhone />
                                        </div>
                                        <input
                                            name="mobile_number"
                                            type="tel"
                                            required
                                            className="w-full pl-11 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all font-medium"
                                            placeholder="Your 10-digit number"
                                            value={formData.mobile_number}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>

                                {/* Password */}
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-300 ml-1">Create Password</label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-purple-500 transition-colors">
                                            <FaLock />
                                        </div>
                                        <input
                                            name="password"
                                            type="password"
                                            required
                                            className="w-full pl-11 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all font-medium"
                                            placeholder="Min. 8 characters"
                                            value={formData.password}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-4 rounded-2xl shadow-xl shadow-purple-600/20 active:scale-95 transition-all flex items-center justify-center gap-2 group mt-4"
                            >
                                {loading ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                ) : (
                                    <>
                                        Sign Up
                                        <FaArrowLeft className="rotate-180 text-xs group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </form>
                    ) : (
                        <form onSubmit={handleVerifyOtp} className="space-y-8">
                            <div className="space-y-4">
                                <div className="space-y-2 text-center">
                                    <label className="text-sm font-bold text-gray-300">Enter Verification Code</label>
                                    <input
                                        type="text"
                                        required
                                        maxLength={6}
                                        className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white tracking-[0.5em] text-center text-2xl font-black focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                                        placeholder="000000"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <button
                                    type="button"
                                    onClick={() => setIsOtpSent(false)}
                                    className="flex-1 bg-white/5 hover:bg-white/10 text-white font-bold py-4 rounded-2xl border border-white/10 active:scale-95 transition-all"
                                >
                                    Back
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="flex-[2] bg-purple-600 hover:bg-purple-500 text-white font-bold py-4 rounded-2xl shadow-xl shadow-purple-600/20 active:scale-95 transition-all"
                                >
                                    {loading ? "Verifying..." : "Confirm & Sign Up"}
                                </button>
                            </div>
                        </form>
                    )}

                    <div className="mt-8 text-center">
                        <p className="text-gray-400 font-medium">
                            Already have an account?{" "}
                            <Link to="/login" className="text-purple-400 hover:text-purple-300 font-bold transition-colors underline-offset-4 hover:underline">
                                Sign In Instead
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
