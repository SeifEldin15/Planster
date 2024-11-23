import React from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';

const SearchSection = () => {
  const categories = [
    { name: 'Venue', active: true },
    { name: 'Photographer', active: false },
    { name: 'Chair Hire', active: false },
    { name: 'Decoration', active: false },
    { name: 'Officiant', active: false },
    { name: 'Transport', active: false },
  ];

  return (
    <div className="px-4 py-6 max-w-[85%] mx-auto">
      <h1 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Your Wedding</h1>
      
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-4">
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          {categories.map((category) => (
            <button
              key={category.name}
              className={`px-3 md:px-4 py-1.5 md:py-2 rounded-full text-sm ${
                category.active 
                  ? 'bg-indigo-500 text-white'
                  : 'bg-indigo-100 text-indigo-600 hover:bg-indigo-200'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
        <div className="relative w-full md:w-64 lg:w-80">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-4 py-2 pl-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
        </div>
      </div>
    </div>
  );
};

export default SearchSection; 