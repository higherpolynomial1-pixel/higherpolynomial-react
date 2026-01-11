import React from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import Navbar from '../pages/Navbar';
import  {  useState } from 'react';
import Header from './Header';

const AboutUs = () => {
  const navigate = useNavigate();
   const [isScrolled, setIsScrolled] = useState(false);

  const handleBookNow = () => {
    navigate('/dashboard');
  };

  const handlePartnerWithUs = () => {
    navigate('/professional');
  };

  return (
    <div>

<header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isScrolled ? 'bg-gray-900 shadow-2xl' : 'bg-transparent'
        }`}
      >
        <Header />
      </header>
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Hero Section */}
      <section className="py-24 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center opacity-20"></div>
        <div className="max-w-5xl mx-auto relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300">
            About QuirkyQ
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
            Revolutionizing wellness and beauty through seamless digital experiences. 
            Founded in 2021, we're redefining how people access self-care and healthcare services.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1">
              <h3 className="text-3xl font-bold mb-8 text-purple-300">Our Origin Story</h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                In early 2021, our founders—a team of healthcare professionals, beauty experts, 
                and tech enthusiasts—recognized a growing need in the post-pandemic world. People 
                were prioritizing self-care and preventive healthcare like never before, but the 
                booking systems remained stuck in the past.
              </p>
              <p className="text-gray-300 mb-6 leading-relaxed">
                What began as a weekend hackathon project quickly evolved into QuirkyQ when we 
                secured our first round of funding from visionary investors who believed in our 
                mission to democratize access to wellness services.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Within just six months of launch, we onboarded over 500 premium service providers 
                and served more than 10,000 customers across three major cities—a testament to the 
                overwhelming demand for our innovative approach.
              </p>
            </div>
            <div className="order-1 md:order-2 bg-gray-700 rounded-2xl p-1 shadow-2xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Team celebrating launch" 
                className="rounded-xl w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Vision */}
      <section className="py-20 px-6 bg-gray-800 bg-opacity-50">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-3xl font-bold mb-4 text-purple-300">Our Vision</h3>
          <p className="text-2xl text-gray-300 mb-16 max-w-4xl mx-auto leading-relaxed">
            To create a world where quality self-care and healthcare services are accessible 
            to everyone with just a few taps, eliminating the stress of appointment scheduling.
          </p>
          
          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                icon: "⚡",
                title: "Instant Access",
                description: "Real-time availability from hundreds of verified professionals at your fingertips."
              },
              {
                icon: "❤️",
                title: "Personalized Care",
                description: "AI-powered recommendations tailored to your unique needs and preferences."
              },
              {
                icon: "🌎",
                title: "Community Impact",
                description: "Supporting local businesses while making wellness services more affordable."
              }
            ].map((item, index) => (
              <div key={index} className="bg-gray-700 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="text-5xl mb-6">{item.icon}</div>
                <h4 className="text-xl font-semibold mb-4">{item.title}</h4>
                <p className="text-gray-300 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold mb-16 text-center text-purple-300">Our Journey So Far</h3>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="hidden md:block absolute left-1/2 h-full w-1 bg-purple-500 transform -translate-x-1/2"></div>
            
            {[
              {
                date: "Jan 2021",
                title: "Founded",
                description: "Launched with 3 team members",
                side: "left"
              },
              {
                date: "Dec 2024",
                title: "Initial Investment Secured",
                description: "Received backing from prominent health-tech investors to drive innovation and growth",
                side: "right"
              },
              {
                date: "Jan 2025",
                title: "Community Milestone",
                description: "Reached a significant milestone in our journey, growing our user base and impact",
                side: "left"
              },
              {
                date: "Present",
                title: "Expanding Nationwide",
                description: "Currently expanding in multiple cities with 200+ new partners",
                side: "right"
              }
            ].map((milestone, index) => (
              <div key={index} className={`mb-16 md:w-1/2 ${milestone.side === 'left' ? 'md:pr-16 md:text-right' : 'md:pl-16 md:text-left'} ${index % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'}`}>
                <div className="bg-gray-700 p-6 rounded-xl shadow-lg relative">
                  <h4 className="text-xl font-bold text-purple-300 mb-2">{milestone.title}</h4>
                  <p className="text-sm text-gray-400 mb-3">{milestone.date}</p>
                  <p className="text-gray-300 leading-relaxed">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-6 bg-gray-800 bg-opacity-50">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold mb-4 text-center text-purple-300">The Minds Behind QuirkyQ</h3>
          <p className="text-xl text-gray-300 mb-16 text-center max-w-3xl mx-auto leading-relaxed">
            Our diverse team brings together decades of experience in healthcare, technology, 
            and customer experience to build the future of wellness services.
          </p>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold mb-16 text-center text-purple-300">Our Core Values</h3>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className="flex items-start">
              <div className="bg-purple-500 bg-opacity-20 p-4 rounded-xl mr-6">
                <div className="text-2xl">🔍</div>
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-3">Transparency First</h4>
                <p className="text-gray-300 leading-relaxed">
                  We believe in clear pricing, honest reviews, and straightforward policies. 
                  No hidden fees, no surprise charges—just quality services at fair prices.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-purple-500 bg-opacity-20 p-4 rounded-xl mr-6">
                <div className="text-2xl">🤝</div>
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-3">Partnership Approach</h4>
                <p className="text-gray-300 leading-relaxed">
                  We carefully vet all service providers to ensure quality standards, then work 
                  collaboratively to help them grow their businesses while serving our customers.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-purple-500 bg-opacity-20 p-4 rounded-xl mr-6">
                <div className="text-2xl">🚀</div>
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-3">Continuous Innovation</h4>
                <p className="text-gray-300 leading-relaxed">
                  Our platform evolves weekly based on user feedback. We're never satisfied with 
                  "good enough" and constantly push to improve the experience.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-purple-500 bg-opacity-20 p-4 rounded-xl mr-6">
                <div className="text-2xl">🌱</div>
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-3">Sustainable Growth</h4>
                <p className="text-gray-300 leading-relaxed">
                  We measure success not just by revenue, but by the positive impact we create 
                  for customers, partners, and our team members.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-gradient-to-r from-purple-900 to-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl md:text-4xl font-bold mb-6">Join the Wellness Revolution</h3>
          <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
            Experience the QuirkyQ difference today. Book your first appointment and discover 
            why thousands choose us for their self-care and healthcare needs.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={handleBookNow}
              className="bg-white text-gray-900 hover:bg-gray-200 px-8 py-4 rounded-lg font-medium text-lg transition duration-300 shadow-lg"
            >
              Book Now
            </button>
            <button 
              onClick={handlePartnerWithUs}
              className="bg-transparent border-2 border-white hover:bg-white hover:bg-opacity-10 px-8 py-4 rounded-lg font-medium text-lg transition duration-300"
            >
              Partner With Us
            </button>
          </div>
        </div>
      </section>
    </div>
     <Footer/>
    </div>
  );
};

export default AboutUs;