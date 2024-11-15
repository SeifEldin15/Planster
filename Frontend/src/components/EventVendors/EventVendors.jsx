import React from 'react';
import purplegradient from '../../assets/bar1.webp'
const EventVendors = () => {
  return (
    <div className="relative w-full h-[300px] rounded-xl overflow-hidden max-w-[1300px] mx-auto mb-16">
      {/* Background Image */}
      <img 
        src={purplegradient} 
        alt="Background" 
        className="absolute w-full h-full object-cover"
      />
      
      {/* Content Container */}
      <div className="relative z-10 h-full flex justify-between items-center px-8 md:px-16">
        {/* Left Side Content */}
        <div className="flex flex-col">
          <h1 className="text-white text-4xl md:text-5xl font-bold mb-2">
            Are you an event Vendor?
          </h1>
          <p className="text-white text-lg md:text-xl">
            we will multiply your bookings....
          </p>
        </div>

        {/* Right Side Content */}
        <div className="flex flex-col items-end">
          <p className="text-white text-sm md:text-base mb-4">
            Use us to market your business organically<br />
            we'll let you know how we perform.
          </p>
          <button className="bg-[#7C3AED] text-white px-6 py-2 rounded-full 
            hover:bg-[#6D28D9] transition-all duration-300 font-medium flex items-center gap-2 mr-[9rem]">
            Get Started 
            <span className="text-lg">→</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventVendors;
