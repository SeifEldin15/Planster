import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
const Wedding = () => {
  const services = [
    { id: 1, name: 'Venue' },
    { id: 2, name: 'Catering' },
    { id: 3, name: 'Chair Hire' },
    { id: 4, name: 'Photographer' },
    { id: 5, name: 'Decoration' },
    { id: 6, name: 'Officiant' },
    { id: 7, name: 'Transport' },
    { id: 8, name: 'Makeup' },
    { id: 9, name: 'Activities' },
  ];

  return (
    <>
    <Navbar />
    <div className="max-w-[1300px] mx-auto py-8 bg-white">
      <div className="flex items-center gap-4 mb-8">
        <h1 className="text-3xl font-normal text-black">Wedding</h1>
        <div className="bg-indigo-50 rounded-full px-4 py-1.5 text-sm text-indigo-600">
          There are 1082 results for your location
        </div>
      </div>

      <p className="text-gray-500 mb-6">Let's see what you need...</p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-3 mb-8">
        {services.map((service) => (
          <button
            key={service.id}
            className="bg-indigo-50 text-indigo-600 px-6 py-2 rounded-full text-sm hover:bg-indigo-100 transition-colors text-center"
          >
            {service.name}
          </button>
        ))}
      </div>

      <button className="bg-indigo-50 text-indigo-600 px-6 py-2 rounded-full text-sm hover:bg-indigo-100 transition-colors flex items-center gap-2">
        Next
        <svg 
          className="w-4 h-4" 
          fill="none" 
          strokeWidth="2"
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            d="M17 8l4 4m0 0l-4 4m4-4H3"
          />
        </svg>
      </button>
    </div>
    </>
  );
};

export default Wedding;