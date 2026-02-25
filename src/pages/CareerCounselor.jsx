import React, { useState, useEffect } from 'react';
import { FaGraduationCap, FaUserTie, FaBriefcase, FaGlobe, FaArrowRight, FaCalendarAlt, FaClock, FaCheckCircle, FaUser, FaPhone, FaEnvelope, FaQrcode } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { ChevronRight, ChevronLeft, Calendar as CalendarIcon, Clock as ClockIcon } from 'lucide-react';

const API_BASE_URL = 'https://higherpolynomial-node.vercel.app/api';

const CareerCounselor = () => {
    const [bookingStep, setBookingStep] = useState(0); // 0: Landing, 1: Service, 2: Time, 3: Info, 4: Payment, 5: Success
    const [selectedService, setSelectedService] = useState(null);
    const [availableSlots, setAvailableSlots] = useState([]);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [loadingSlots, setLoadingSlots] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        email: '',
        currentClass: '',
        age: '',
        message: '',
        preferredDateTime: ''
    });

    const services = [
        { id: 1, name: "Basic Counseling", description: "Short introductory session for quick career queries." },
        { id: 2, name: "Standard Counseling", description: "Detailed discussion on career paths and options." },
        { id: 3, name: "Premium Counseling", description: "In-depth profiling and long-term career roadmap." },
        { id: 4, name: "Career Assessment Test", description: "Scientific assessment of skills and interests." },
    ];

    // Fetch slots whenever we're on step 2 AND a service is selected
    useEffect(() => {
        if (bookingStep === 2 && selectedService) {
            fetchAvailableSlots(selectedService.name);
        }
    }, [bookingStep, selectedService]);

    const fetchAvailableSlots = async (serviceName) => {
        setLoadingSlots(true);
        setAvailableSlots([]);
        try {
            const response = await fetch(`${API_BASE_URL}/counseling/slots/available?service_name=${encodeURIComponent(serviceName)}`);
            if (response.ok) {
                const data = await response.json();
                setAvailableSlots(Array.isArray(data) ? data : []);
            } else {
                toast.error("Failed to load available slots");
            }
        } catch (error) {
            console.error("Error fetching slots:", error);
            toast.error("Could not connect to server");
        } finally {
            setLoadingSlots(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleServiceSelect = (service) => {
        // Reset slot selection when a new service is chosen
        setSelectedSlot(null);
        setAvailableSlots([]);
        setSelectedService(service);
        setBookingStep(2);
    };

    const handleSlotSelect = (slot) => {
        setSelectedSlot(slot);
        setFormData({ ...formData, preferredDateTime: slot.start_time });
    };

    const handleBooking = async () => {
        try {
            const bookingPayload = {
                ...formData,
                slotId: selectedSlot.id,
                serviceName: selectedService.name,
                duration: "60 min", // Default duration or calculate from slot if available
                charges: selectedSlot.price,
                paymentMethod: formData.paymentMethod || 'UPI/QR'
            };

            const response = await fetch(`${API_BASE_URL}/counseling/book`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bookingPayload)
            });

            if (response.ok) {
                setBookingStep(5);
                toast.success("Booking confirmed!");
            } else {
                const errorData = await response.json();
                toast.error(errorData.error || "Booking failed. Please try again.");
            }
        } catch (err) {
            console.error(err);
            toast.error("Network error. Please try again.");
        }
    };

    const nextStep = () => setBookingStep(prev => prev + 1);
    const prevStep = () => setBookingStep(prev => prev - 1);

    const scrollToBooking = () => {
        setBookingStep(1);
        setTimeout(() => {
            document.getElementById('booking-section').scrollIntoView({ behavior: 'smooth' });
        }, 100);
    };

    return (
        <div className="bg-white pt-24 pb-20">
            {/* Landing UI (Step 0) */}
            {bookingStep === 0 && (
                <>
                    <section className="relative px-6 py-20 text-center bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-950 text-white rounded-[3rem] mx-4 sm:mx-8 mb-20 overflow-hidden shadow-2xl">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
                        <div className="relative z-10 flex flex-col items-center">
                            <span className="inline-block px-4 py-1.5 rounded-full bg-blue-500/20 text-blue-400 text-sm font-black uppercase tracking-widest mb-6 border border-blue-500/30">Expert Guidance</span>
                            <h1 className="text-5xl md:text-7xl font-black mb-8 leading-[1.1] tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400">Career Counseling <br />Services</h1>
                            <p className="text-xl md:text-2xl font-medium mb-12 opacity-80 max-w-2xl mx-auto leading-relaxed">
                                “Get expert guidance to choose the right career path with Vishak, IIT Delhi Alumnus.”
                            </p>
                            <button
                                onClick={scrollToBooking}
                                className="bg-blue-600 hover:bg-blue-500 text-white px-10 py-5 rounded-full font-black text-xl transition-all transform hover:scale-105 shadow-[0_20px_50px_rgba(59,130,246,0.3)] flex items-center gap-3 active:scale-95"
                            >
                                Book Counseling Session <FaArrowRight />
                            </button>
                        </div>
                    </section>

                    {/* Counselor Info */}
                    <section className="max-w-7xl mx-auto px-6 mb-24">
                        <div className="bg-white rounded-[3rem] p-10 md:p-16 flex flex-col md:flex-row gap-16 items-center border border-gray-100 shadow-[0_40px_100px_rgba(0,0,0,0.04)] relative">
                            <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-50 rounded-full blur-3xl opacity-50"></div>
                            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-[2.5rem] overflow-hidden bg-gray-100 flex-shrink-0 shadow-2xl ring-8 ring-blue-50/50">
                                <img
                                    src="/counselerImage.png"
                                    alt="Vishak"
                                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                                />
                            </div>
                            <div className="flex-1 space-y-8">
                                <div>
                                    <h2 className="text-5xl font-black text-gray-900 mb-3 tracking-tight">Vishak</h2>
                                    <p className="text-blue-600 font-black text-2xl">MSC (Mathematics) from IIT Delhi</p>
                                </div>
                                <div className="flex flex-wrap gap-4">
                                    <span className="bg-blue-50 text-blue-700 px-6 py-2.5 rounded-2xl text-sm font-black flex items-center gap-3 border border-blue-100/50">
                                        <FaClock className="text-blue-400" /> 5+ Years Experience
                                    </span>
                                    <span className="bg-green-50 text-green-700 px-6 py-2.5 rounded-2xl text-sm font-black flex items-center gap-3 border border-green-100/50">
                                        <FaCheckCircle className="text-green-400" /> IIT Alumnus
                                    </span>
                                </div>
                                <p className="text-gray-500 leading-relaxed text-xl font-medium">
                                    Specializing in helping Class 10/12 students and working professionals find their true calling through mathematical logic and psychological assessment.
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {["Stream Selection", "College Guidance", "Career Change", "Future Roadmaps"].map(spec => (
                                        <div key={spec} className="flex items-center gap-3 text-gray-700 font-bold">
                                            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                                                <FaCheckCircle className="text-blue-600 text-xs" />
                                            </div>
                                            {spec}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>
                </>
            )}

            {/* Multi-Step Booking Section */}
            <section id="booking-section" className="max-w-5xl mx-auto px-6 scroll-mt-28">
                {bookingStep > 0 && (
                    <div className="mb-12">
                        <div className="flex justify-between items-center mb-8">
                            <button
                                onClick={bookingStep === 1 ? () => setBookingStep(0) : prevStep}
                                className="flex items-center gap-2 text-gray-400 hover:text-gray-900 font-black transition-colors uppercase tracking-widest text-xs"
                            >
                                <ChevronLeft size={20} /> Back
                            </button>
                            <div className="flex gap-2">
                                {[1, 2, 3, 4].map(s => (
                                    <div
                                        key={s}
                                        className={`h-2 w-12 rounded-full transition-all duration-500 ${bookingStep >= s ? 'bg-blue-600' : 'bg-gray-100'}`}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Step titles */}
                        <div className="text-center mb-12">
                            {bookingStep === 1 && <h2 className="text-4xl font-black text-gray-900 uppercase">Choose Service</h2>}
                            {bookingStep === 2 && <h2 className="text-4xl font-black text-gray-900 uppercase">Select Available Slot</h2>}
                            {bookingStep === 3 && <h2 className="text-4xl font-black text-gray-900 uppercase">Your Information</h2>}
                            {bookingStep === 4 && <h2 className="text-4xl font-black text-gray-900 uppercase">Complete Payment</h2>}
                            <p className="text-gray-400 font-bold mt-2 uppercase tracking-wide">
                                {bookingStep === 1 && "What kind of counseling do you need?"}
                                {bookingStep === 2 && `Booking for: ${selectedService?.name}`}
                                {bookingStep === 3 && "Tell us a bit about yourself"}
                                {bookingStep === 4 && "Scan QR to pay and confirm"}
                            </p>
                        </div>
                    </div>
                )}

                <div className="bg-white rounded-[3rem] border border-gray-100 shadow-[0_40px_100px_rgba(0,0,0,0.06)] overflow-hidden">
                    {/* Step 1: Service Selection */}
                    {bookingStep === 1 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8 md:p-12">
                            {services.map(service => (
                                <button
                                    key={service.id}
                                    onClick={() => handleServiceSelect(service)}
                                    className="p-8 text-left bg-gray-50 hover:bg-white hover:ring-4 hover:ring-blue-100 border border-transparent hover:border-blue-500 rounded-[2rem] transition-all group flex flex-col justify-between"
                                >
                                    <div>
                                        <div className="text-blue-600 bg-blue-100 w-12 h-12 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                            {service.id === 4 ? <FaGraduationCap size={24} /> : <FaUserTie size={24} />}
                                        </div>
                                        <h3 className="text-2xl font-black text-gray-900 mb-2 truncate">{service.name}</h3>
                                        <p className="text-gray-500 font-medium mb-6 line-clamp-2">{service.description}</p>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Pricing starts with slot</span>
                                        <ChevronRight className="text-blue-500 group-hover:translate-x-2 transition-transform" />
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Step 2: Available Slots */}
                    {bookingStep === 2 && (
                        <div className="p-8 md:p-12 space-y-10">
                            {loadingSlots ? (
                                <div className="text-center py-20">
                                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                                    <p className="font-bold text-gray-500 uppercase">Loading available slots...</p>
                                </div>
                            ) : availableSlots.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {availableSlots.map(slot => (
                                        <button
                                            key={slot.id}
                                            onClick={() => handleSlotSelect(slot)}
                                            className={`p-6 rounded-3xl border-2 transition-all text-left flex items-center justify-between group ${selectedSlot?.id === slot.id ? 'bg-blue-600 border-blue-600 text-white shadow-xl shadow-blue-100' : 'bg-gray-50 border-gray-100 hover:border-blue-200'}`}
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className={`p-3 rounded-2xl ${selectedSlot?.id === slot.id ? 'bg-white/20' : 'bg-blue-100 text-blue-600'}`}>
                                                    <CalendarIcon size={20} />
                                                </div>
                                                <div>
                                                    <p className={`font-black uppercase text-xs tracking-widest mb-0.5 ${selectedSlot?.id === slot.id ? 'text-blue-100' : 'text-blue-600'}`}>
                                                        {new Date(slot.start_time).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
                                                    </p>
                                                    <p className="text-lg font-black tracking-tight">
                                                        {new Date(slot.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-xl font-black">₹{slot.price}</p>
                                                <p className={`text-[10px] font-black uppercase tracking-widest ${selectedSlot?.id === slot.id ? 'text-blue-200' : 'text-gray-400'}`}>per session</p>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-20 bg-gray-50 rounded-[2.5rem] border border-dashed border-gray-200">
                                    <ClockIcon size={48} className="text-gray-200 mx-auto mb-6" />
                                    <h3 className="text-2xl font-black text-gray-900 mb-2">No Available Slots</h3>
                                    <p className="text-gray-500 font-bold uppercase text-xs">Please check back later or contact us directly.</p>
                                </div>
                            )}

                            <button
                                onClick={nextStep}
                                disabled={!selectedSlot}
                                className="w-full bg-blue-600 disabled:bg-gray-200 disabled:text-gray-400 text-white font-black py-6 rounded-[2rem] text-xl shadow-xl hover:shadow-2xl transition-all"
                            >
                                Continue to Information
                            </button>
                        </div>
                    )}

                    {/* Step 3: Information */}
                    {bookingStep === 3 && (
                        <div className="p-8 md:p-12 space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-gray-400 uppercase ml-2">Full Name</label>
                                    <div className="relative">
                                        <FaUser className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300" />
                                        <input
                                            name="fullName" value={formData.fullName} onChange={handleChange}
                                            placeholder="Your Name"
                                            className="w-full pl-14 pr-8 py-5 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 outline-none font-bold"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-gray-400 uppercase ml-2">Phone</label>
                                    <div className="relative">
                                        <FaPhone className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300" />
                                        <input
                                            name="phone" value={formData.phone} onChange={handleChange}
                                            placeholder="Mobile Number"
                                            className="w-full pl-14 pr-8 py-5 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 outline-none font-bold"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-gray-400 uppercase ml-2">Email</label>
                                    <div className="relative">
                                        <FaEnvelope className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300" />
                                        <input
                                            name="email" value={formData.email} onChange={handleChange}
                                            placeholder="Email Address"
                                            className="w-full pl-14 pr-8 py-5 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 outline-none font-bold"
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-gray-400 uppercase ml-2">Class</label>
                                        <input
                                            name="currentClass" value={formData.currentClass} onChange={handleChange}
                                            placeholder="e.g. 12th"
                                            className="w-full px-8 py-5 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 outline-none font-bold"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-gray-400 uppercase ml-2">Age</label>
                                        <input
                                            name="age" value={formData.age} onChange={handleChange}
                                            type="number"
                                            placeholder="Age"
                                            className="w-full px-8 py-5 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 outline-none font-bold"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-black text-gray-400 uppercase ml-2">Message (Optional)</label>
                                <textarea
                                    name="message" value={formData.message} onChange={handleChange}
                                    rows="3"
                                    placeholder="Tell us about your concerns..."
                                    className="w-full px-8 py-5 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 outline-none font-bold resize-none"
                                />
                            </div>
                            <button
                                onClick={nextStep}
                                disabled={!formData.fullName || !formData.phone || !formData.email}
                                className="w-full bg-blue-600 disabled:bg-gray-200 text-white font-black py-6 rounded-[2rem] text-xl shadow-xl transition-all"
                            >
                                Proceed to Payment
                            </button>
                        </div>
                    )}

                    {/* Step 4: Payment */}
                    {bookingStep === 4 && (
                        <div className="p-8 md:p-12 space-y-10">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* UPI Option */}
                                <div className="p-8 bg-gray-50 rounded-[2rem] border-2 border-transparent hover:border-blue-500 transition-all text-center group cursor-pointer" onClick={() => setFormData({ ...formData, paymentMethod: 'UPI/QR' })}>
                                    <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                        <FaQrcode size={24} />
                                    </div>
                                    <h4 className="text-xl font-black mb-4">UPI / QR Code</h4>
                                    <img
                                        src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=upi://pay?pa=ankitpandey@upi&pn=HigherPolynomial&tn=Counseling&am=${selectedSlot?.price}`}
                                        alt="UPI QR Code"
                                        className="w-32 h-32 mx-auto rounded-lg mb-4"
                                    />
                                    <p className="text-xs font-bold text-gray-500">Scan via Any App</p>
                                </div>

                                {/* Card Option (Mock) */}
                                <div className="p-8 bg-gray-50 rounded-[2rem] border-2 border-transparent hover:border-blue-500 transition-all group flex flex-col justify-center cursor-pointer" onClick={() => setFormData({ ...formData, paymentMethod: 'Card' })}>
                                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-green-600 group-hover:text-white transition-colors">
                                        <FaBriefcase size={24} />
                                    </div>
                                    <h4 className="text-xl font-black text-center mb-6">Credit / Debit Card</h4>
                                    <div className="space-y-4">
                                        <div className="h-10 bg-gray-200 rounded-lg w-full"></div>
                                        <div className="flex gap-4">
                                            <div className="h-10 bg-gray-200 rounded-lg w-1/2"></div>
                                            <div className="h-10 bg-gray-200 rounded-lg w-1/2"></div>
                                        </div>
                                    </div>
                                    <p className="text-xs font-bold text-gray-500 text-center mt-6 uppercase tracking-widest">Card Support Coming Soon</p>
                                </div>
                            </div>

                            <div className="text-center">
                                <h4 className="text-3xl font-black text-gray-900 mb-4">Total Amount: ₹{selectedSlot?.price}</h4>
                                <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 text-blue-800 text-sm font-bold mb-8">
                                    Counselor will send you meeting link after payment verification. Session scheduled for {new Date(selectedSlot?.start_time).toLocaleString()}.
                                </div>
                                <button
                                    onClick={handleBooking}
                                    className="w-full bg-blue-600 text-white font-black py-6 rounded-[2rem] text-xl shadow-[0_20px_40px_rgba(59,130,246,0.3)] hover:bg-blue-500 transition-all flex items-center justify-center gap-3"
                                >
                                    Proceed & Book Now
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Step 5: Success */}
                    {bookingStep === 5 && (
                        <div className="p-16 text-center space-y-8">
                            <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-5xl mx-auto shadow-sm">
                                <FaCheckCircle />
                            </div>
                            <div className="space-y-4">
                                <h1 className="text-4xl font-black text-gray-900 uppercase">Booking Request Received!</h1>
                                <p className="text-gray-500 font-medium text-lg max-w-md mx-auto leading-relaxed">
                                    Thank you, <span className="text-gray-900 font-black">{formData.fullName}</span>. Counseling successfully booked for {new Date(selectedSlot?.start_time).toLocaleString()}. Counselor will send you meeting link shortly.
                                </p>
                            </div>
                            <button
                                onClick={() => setBookingStep(0)}
                                className="px-10 py-4 bg-gray-900 text-white rounded-full font-black uppercase tracking-widest text-sm hover:bg-black transition-colors"
                            >
                                Return to Page
                            </button>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default CareerCounselor;
