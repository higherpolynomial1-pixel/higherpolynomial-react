import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-[#0f172a] text-white pt-20 pb-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Branding Section */}
                    <div className="space-y-6">
                        <Link to="/" className="flex items-center group">
                            <img
                                src="/logo.png"
                                alt="HigherPolynomial"
                                className="h-10 w-auto object-contain brightness-0 invert"
                            />
                            <span className="ml-3 text-xl font-black tracking-tight">
                                Higher<span className="text-blue-400">Polynomial</span>
                            </span>
                        </Link>
                        <p className="text-gray-400 text-sm font-medium leading-relaxed">
                            Knowledge, Elevated. We provide structured learning paths to help you master complex topics and build your future.
                        </p>
                        <div className="flex items-center gap-4">
                            {[FaFacebook, FaTwitter, FaLinkedin, FaInstagram].map((Icon, idx) => (
                                <a key={idx} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-blue-600 transition-all group">
                                    <Icon className="text-gray-400 group-hover:text-white transition-colors" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-bold mb-6">Quick Links</h4>
                        <ul className="space-y-4">
                            {['Home', 'Courses', 'About Us', 'Contact Us'].map((item) => (
                                <li key={item}>
                                    <Link to={`/${item.toLowerCase().replace(' ', '-')}`} className="text-gray-400 hover:text-blue-400 font-medium transition-colors">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="text-lg font-bold mb-6">Support</h4>
                        <ul className="space-y-4">
                            {['Privacy Policy', 'Terms of Service', 'Refund Policy', 'FAQ'].map((item) => (
                                <li key={item}>
                                    <Link to={`/${item.toLowerCase().replace(' ', '-')}`} className="text-gray-400 hover:text-blue-400 font-medium transition-colors">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-bold mb-6">Contact Us</h4>
                        <ul className="space-y-4">
                            <li className="flex gap-3 text-gray-400">
                                <FaMapMarkerAlt className="text-blue-400 mt-1 shrink-0" />
                                <span className="text-sm">123 Learning Street, Tech City, TC 45678</span>
                            </li>
                            <li className="flex items-center gap-3 text-gray-400">
                                <FaPhone className="text-blue-400 shrink-0" />
                                <span className="text-sm">+1 (234) 567-890</span>
                            </li>
                            <li className="flex items-center gap-3 text-gray-400">
                                <FaEnvelope className="text-blue-400 shrink-0" />
                                <span className="text-sm">contact@higherpolynomial.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-500 text-sm font-bold uppercase tracking-widest font-mono">
                        &copy; {currentYear} HigherPolynomia — Knowledge, Elevated.
                    </p>
                    <div className="flex gap-6 text-xs text-gray-500 font-bold">
                        <a href="#" className="hover:text-white transition-colors">PRIVACY</a>
                        <a href="#" className="hover:text-white transition-colors">TERMS</a>
                        <a href="#" className="hover:text-white transition-colors">SITEMAP</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
