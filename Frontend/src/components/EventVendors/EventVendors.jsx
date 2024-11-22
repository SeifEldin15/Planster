import React from 'react';
import purplegradient from '../../assets/bar1.webp'
const EventVendors = () => {
  return (
    <div className="relative w-full h-[300px]  overflow-hidden max-w-[1300px] mx-auto mb-16">
      <img 
        src={purplegradient} 
        alt="Background" 
        className="absolute w-full h-full object-cover px-6 md:px-0 lg:px-0 rounded-xl"
      />
      
      <div className="relative z-10 lg:h-full min-h-full md:min-h-0 flex flex-col lg:flex-row justify-center md:justify-between items-center px-8 md:px-16">
        <div className="flex flex-col mb-2 md:mb-0">
          <h1 className="text-white text-2xl md:text-4xl lg:text-5xl font-bold mb-1">
            Are you an event Vendor?
          </h1>
          <p className="text-white text-lg md:text-xl mb-2 flex justify-center md:justify-start lg:justify-start">
            we will multiply your bookings....
          </p>
        </div>

        <div className="flex flex-col items-center md:items-end">
          <p className="text-white text-sm md:text-base mb-2 ">
            Use us to market your business organically<br />
            we'll let you know how we perform.
          </p>
          <button className="bg-[var(--tertiary-color)] text-white px-6 py-2 rounded-full 
            hover:bg-[var(--hover-color)] transition-all duration-300 font-medium flex items-center gap-2 md:mr-[9rem]">
            Get Started 
            <span className="text-lg">→</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventVendors;
