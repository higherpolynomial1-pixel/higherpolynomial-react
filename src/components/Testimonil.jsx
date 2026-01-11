

// import React, { useEffect, useRef, useState } from 'react';

// const testimonials = [
//   {
//     name: "Priya Sharma",
//     location: "Mumbai, Maharashtra",
//     image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
//     quote: "QuirkyQ made booking my salon appointments so easy! Highly recommended.",
//   },
//   {
//     name: "Rahul Patel",
//     location: "Ahmedabad, Gujarat",
//     image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
//     quote: "The doctor consultation feature saved me a lot of time. Amazing service!",
//   },
//   {
//     name: "Anjali Gupta",
//     location: "Delhi",
//     image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
//     quote: "I love how seamless the experience is. Great platform!",
//   },
//   {
//     name: "Vikram Singh",
//     location: "Jaipur, Rajasthan",
//     image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
//     quote: "Finally, a platform that understands my needs. Fantastic!",
//   },
//   {
//     name: "Sneha Iyer",
//     location: "Chennai, Tamil Nadu",
//     image: "https://images.unsplash.com/photo-1517841902196-19c6ed1e5939?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
//     quote: "Booking my spa day was a breeze with QuirkyQ.",
//   },
//   {
//     name: "Arjun Reddy",
//     location: "Hyderabad, Telangana",
//     image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
//     quote: "Top-notch service and user-friendly interface!",
//   },
//   {
//     name: "Neha Kapoor",
//     location: "Bengaluru, Karnataka",
//     image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
//     quote: "The best platform for salon and doctor bookings!",
//   },
//   {
//     name: "Rohan Mehra",
//     location: "Pune, Maharashtra",
//     image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
//     quote: "Quick, reliable, and efficient. Love it!",
//   },
//   {
//     name: "Kavita Desai",
//     location: "Kolkata, West Bengal",
//     image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
//     quote: "QuirkyQ is a game-changer for busy people like me.",
//   },
//   {
//     name: "Suresh Nair",
//     location: "Kochi, Kerala",
//     image: "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
//     quote: "Professional and hassle-free experience every time!",
//   },
// ];

// const Testimonials = () => {
//   const carouselRef = useRef(null);
//   const [isAutoScrolling, setIsAutoScrolling] = useState(true);

//   // Auto-scrolling effect
//   useEffect(() => {
//     const carousel = carouselRef.current;
//     let scrollAmount = 0;
//     const scrollSpeed = 1; // Adjust speed here
//     let scrollInterval;

//     if (isAutoScrolling) {
//       scrollInterval = setInterval(() => {
//         if (carousel) {
//           scrollAmount += scrollSpeed;
//           carousel.scrollLeft = scrollAmount;

//           // Reset to start when reaching the end
//           if (scrollAmount >= carousel.scrollWidth - carousel.clientWidth) {
//             scrollAmount = 0;
//             carousel.scrollLeft = 0;
//           }
//         }
//       }, 20); // Adjust interval for smoothness
//     }

//     return () => clearInterval(scrollInterval); // Cleanup on unmount or state change
//   }, [isAutoScrolling]);

//   // Manual scroll on mouse move
//   const handleMouseMove = (e) => {
//     const carousel = carouselRef.current;
//     if (!carousel) return;

//     setIsAutoScrolling(false); // Pause auto-scrolling on mouse interaction

//     const rect = carousel.getBoundingClientRect();
//     const mouseX = e.clientX - rect.left; // Mouse position relative to carousel
//     const carouselWidth = rect.width;
//     const scrollSpeedManual = 5; // Adjust manual scroll speed

//     if (mouseX < carouselWidth / 3) {
//       // Scroll left if mouse is in the left third
//       carousel.scrollLeft -= scrollSpeedManual;
//     } else if (mouseX > (carouselWidth * 2) / 3) {
//       // Scroll right if mouse is in the right third
//       carousel.scrollLeft += scrollSpeedManual;
//     }
//   };

//   const handleMouseLeave = () => {
//     setIsAutoScrolling(true); // Resume auto-scrolling when mouse leaves
//   };

//   return (
//     <>
//       <style jsx>{`
//         .hide-scrollbar::-webkit-scrollbar {
//           display: none;
//         }
//         .hide-scrollbar {
//           -ms-overflow-style: none;
//           scrollbar-width: none;
//         }
//       `}</style>
//       <section className="py-20 px-6 sm:px-10 lg:px-20 bg-gradient-to-b from-gray-800 to-gray-900">
//         <h2 className="text-5xl font-bold text-center mb-16 text-white">What Our Clients Say</h2>
//         <div
//           ref={carouselRef}
//           className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth gap-6 pb-4 hide-scrollbar"
//           onMouseMove={handleMouseMove}
//           onMouseLeave={handleMouseLeave}
//           style={{ scrollBehavior: 'smooth' }}
//         >
//           {testimonials.map((testimonial, index) => (
//             <div
//               key={index}
//               className="min-w-[300px] bg-gray-700 rounded-3xl p-6 shadow-lg hover:shadow-xl transform transition-all duration-500 snap-center"
//             >
//               <div className="flex items-center mb-4">
//                 <img
//                   src={testimonial.image}
//                   alt={testimonial.name}
//                   className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-purple-500"
//                   onError={(e) => {
//                     e.target.src = "https://via.placeholder.com/200"; // Fallback image
//                   }}
//                 />
//                 <div>
//                   <h3 className="text-xl font-semibold text-white">{testimonial.name}</h3>
//                   <p className="text-sm text-gray-300">{testimonial.location}</p>
//                 </div>
//               </div>
//               <p className="text-gray-200 italic">"{testimonial.quote}"</p>
//               <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-bl-3xl"></div>
//             </div>
//           ))}
//         </div>
//       </section>
//     </>
//   );
// };

// export default Testimonials;

import React, { useEffect, useRef, useState } from "react";

const testimonials = [
  {
    name: "Priya Sharma",
    location: "Mumbai, Maharashtra",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    quote: "QuirkyQ made booking my salon appointments so easy! Highly recommended.",
  },
  {
    name: "Rahul Patel",
    location: "Ahmedabad, Gujarat",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    quote: "The doctor consultation feature saved me a lot of time. Amazing service!",
  },
  {
    name: "Anjali Gupta",
    location: "Delhi",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    quote: "I love how seamless the experience is. Great platform!",
  },
];

const Testimonials = () => {
  const carouselRef = useRef(null);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);

  // Auto-scrolling effect
  useEffect(() => {
    const carousel = carouselRef.current;
    let scrollAmount = 0;
    const scrollSpeed = 1;
    let scrollInterval;

    if (isAutoScrolling) {
      scrollInterval = setInterval(() => {
        if (carousel) {
          scrollAmount += scrollSpeed;
          carousel.scrollLeft = scrollAmount;

          if (scrollAmount >= carousel.scrollWidth - carousel.clientWidth) {
            scrollAmount = 0;
            carousel.scrollLeft = 0;
          }
        }
      }, 20);
    }

    return () => clearInterval(scrollInterval);
  }, [isAutoScrolling]);

  // Handle mouse movement for manual scrolling
  const handleMouseMove = (e) => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    setIsAutoScrolling(false);

    const rect = carousel.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const carouselWidth = rect.width;
    const scrollSpeedManual = 5;

    if (mouseX < carouselWidth / 3) {
      carousel.scrollLeft -= scrollSpeedManual;
    } else if (mouseX > (carouselWidth * 2) / 3) {
      carousel.scrollLeft += scrollSpeedManual;
    }
  };

  const handleMouseLeave = () => {
    setIsAutoScrolling(true);
  };

  return (
    <section className="py-20 px-6 sm:px-10 lg:px-20 bg-gradient-to-b from-gray-800 to-gray-900">
      <h2 className="text-5xl font-bold text-center mb-16 text-white">What Our Clients Say</h2>
      <div
        ref={carouselRef}
        className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth gap-6 pb-4 hide-scrollbar"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ scrollBehavior: "smooth" }}
      >
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="min-w-[300px] bg-gray-700 rounded-3xl p-6 shadow-lg hover:shadow-xl transform transition-all duration-500 snap-center"
          >
            <div className="flex items-center mb-4">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-purple-500"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/200";
                }}
              />
              <div>
                <h3 className="text-xl font-semibold text-white">{testimonial.name}</h3>
                <p className="text-sm text-gray-300">{testimonial.location}</p>
              </div>
            </div>
            <p className="text-gray-200 italic">"{testimonial.quote}"</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
